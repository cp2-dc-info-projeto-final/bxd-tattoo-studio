const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config(); // Importa as variáveis de ambiente

const app = express();
const db = new sqlite3.Database('./users.db'); // Conecta ao banco de dados SQLite

app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Permite requisições de outros domínios
app.use(express.json()); // Use express.json() em vez de body-parser
app.use(cookieParser());

// Função para verificar as credenciais do usuário utilizando bcrypt.compare
const verificarCredenciais = (email, senha, callback) => {
  db.get('SELECT * FROM usuario WHERE email = ?', [email], (err, row) => {
    if (err) return callback(err);
    if (!row) return callback(null, null); // Usuário não encontrado

    bcrypt.compare(senha, row.senha, (err, isMatch) => {
      if (err) return callback(err);
      if (isMatch) {
        return callback(null, row); // Credenciais corretas
      } else {
        return callback(null, null); // Senha incorreta
      }
    });
  });
};

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  verificarCredenciais(email, senha, (err, usuario) => {
    if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
    if (!usuario) return res.status(401).json({ message: 'Credenciais inválidas.' });

    const token = jwt.sign({ id: usuario.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Configure o cookie com o token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS em produção
      sameSite: 'Strict', // Ou 'Lax'
      maxAge: 3600000, // 1 hora
    });
    return res.status(200).json({ message: 'Login bem-sucedido!', token }); // Incluindo token na resposta
  });
});

// Endpoint para verificar o usuário logado
app.get('/api/usuarios/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Não autorizado.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido.' });
    db.get('SELECT * FROM usuario WHERE id_usuario = ?', [decoded.id], (err, usuario) => {
      if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
      res.json(usuario);
    });
  });
});

// Função para verificar as credenciais do administrador
const verificarCredenciaisADM = (user, senha, callback) => {
  db.all('SELECT * FROM adm', [], (err, rows) => {
    if (err) return callback(err);

    // Itera sobre cada linha para encontrar o usuário
    const usuarioCorrespondente = rows.find(row => {
      return bcrypt.compareSync(user, row.user); // Comparação do user criptografado
    });

    if (!usuarioCorrespondente) {
      return callback(null, null); // Administrador não encontrado
    }

    // Comparação da senha criptografada com a senha fornecida
    bcrypt.compare(senha, usuarioCorrespondente.senha, (err, isPasswordMatch) => {
      if (err) return callback(err);
      if (isPasswordMatch) {
        return callback(null, usuarioCorrespondente); // Credenciais corretas
      } else {
        return callback(null, null); // Senha incorreta
      }
    });
  });
};

// Rota de login ADM
app.post('/api/login/adm', (req, res) => {
  const { user, senha } = req.body;

  verificarCredenciaisADM(user, senha, (err, adm) => {
    if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
    if (!adm) return res.status(401).json({ message: 'Credenciais inválidas.' });

    // Criação do token JWT se as credenciais forem válidas
    const token = jwt.sign({ id: adm.id_adm }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Configuração do cookie com o token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Usar secure se em produção
      sameSite: 'Strict', // Proteger contra CSRF
      maxAge: 3600000, // 1 hora
    });

    // Resposta ao cliente indicando sucesso no login
    return res.status(200).json({ message: 'Login bem-sucedido!', token });
  });
});

// Endpoint para verificar o adm logado
app.get('/api/adms/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Não autorizado.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido.' });

    db.get('SELECT * FROM adm WHERE id_adm = ?', [decoded.id], (err, adm) => {
      if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
      if (!adm) return res.status(404).json({ message: 'Administrador não encontrado.' });
      res.json(adm);
    });
  });
});

// Rota para cadastrar um novo usuário
app.post('/usuarios/novo', (req, res) => {
  const { nome, email, idade, senha } = req.body;

  // Verifique se o email já está cadastrado
  db.get('SELECT * FROM usuario WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao verificar email.' });
    }
    if (row) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Hash da senha antes de salvar no banco de dados
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao gerar hash da senha.' });
      }

      // Inserir o novo usuário com a senha criptografada
      db.run('INSERT INTO usuario (nome, email, idade, senha) VALUES (?, ?, ?, ?)', [nome, email, idade, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
        return res.status(201).json({ id: this.lastID, message: 'Usuário cadastrado com sucesso!' });
      });
    });
  });
});

// Rota de cadastro de novo administrador
app.post('/adm/novo', async (req, res) => {
  const { nome, user, senha, conf_senha } = req.body;

  // Verifica se a senha e a confirmação da senha são iguais
  if (senha !== conf_senha) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }

  // Verifica se o usuário já existe no banco de dados
  db.all('SELECT user FROM adm', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });


    // Verifica se algum usuário criptografado corresponde ao user fornecido
    const userExists = rows.some(row => {
      return bcrypt.compareSync(user, row.user); // Compare com a string criptografada
    });

    if (userExists) {
      return res.status(409).json({ message: 'Usuário já existe.' }); // Usuário já cadastrado
    }

    // Criptografa a senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Erro ao criptografar a senha.' });

      // Criptografa o usuário
      bcrypt.hash(user, 10, (err, hashedUser) => {
        if (err) return res.status(500).json({ message: 'Erro ao criptografar o usuário.' });

        // Insere o novo administrador no banco de dados
        db.run('INSERT INTO adm (nome, user, senha) VALUES (?, ?, ?)', [nome, hashedUser, hashedPassword], function(err) {
          if (err) return res.status(500).json({ message: 'Erro ao cadastrar administrador.' });

          return res.status(201).json({ message: 'Administrador cadastrado com sucesso!', id_adm: this.lastID });
        });
      });
    });
  });
});


// Rota de logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.status(200).json({ message: 'Logout realizado com sucesso!' });
});

// Rota para listar todos os usuários (protegida por autenticação)
app.get('/usuarios', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Não autorizado.' });

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(401).json({ message: 'Token inválido.' });

    db.all('SELECT id_usuario, nome, email, idade FROM usuario', [], (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erro ao listar usuários.' });
      res.json({ usuarios: rows });
    });
  });
});

// Rota para editar um usuário
app.put('/usuarios/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  const { nome, email, idade, senha } = req.body;

  const usuarioAtualizado = { nome, email, idade };

  // Se a senha foi fornecida, atualizar a senha após criptografá-la
  if (senha) {
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao gerar hash da senha.' });
      }
      usuarioAtualizado.senha = hashedPassword;

      // Atualiza o usuário no banco de dados
      db.run('UPDATE usuario SET nome = ?, email = ?, idade = ?, senha = ? WHERE id_usuario = ?',
        [usuarioAtualizado.nome, usuarioAtualizado.email, usuarioAtualizado.idade, usuarioAtualizado.senha, id_usuario],
        function (err) {
          if (err) return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
          res.json({ message: 'Usuário atualizado com sucesso!' });
        });
    });
  } else {
    // Se não houver senha, apenas atualiza os outros campos
    db.run('UPDATE usuario SET nome = ?, email = ?, idade = ? WHERE id_usuario = ?',
      [usuarioAtualizado.nome, usuarioAtualizado.email, usuarioAtualizado.idade, id_usuario],
      function (err) {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
        res.json({ message: 'Usuário atualizado com sucesso!' });
      });
  }
});

// Rota para excluir um usuário por ID
app.delete('/usuarios/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  db.run('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], function (err) {
    if (err) return res.status(500).json({ message: 'Erro ao excluir usuário.' });
    res.json({ message: 'Usuário excluído com sucesso!' });
  });
});

// Rota para cadastro de novo serviço
app.post('/servicos/novo', (req, res) => {
  const { tamanho, complexidade, cores, preco } = req.body;

  // Verifica se todos os campos foram fornecidos e possuem valores válidos
  if (!tamanho || !complexidade || !cores || !preco) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  // Insere o novo serviço no banco de dados
  db.run(
    'INSERT INTO servico (tamanho, complexidade, cores, preco) VALUES (?, ?, ?, ?)',
    [tamanho, complexidade, cores, preco],
    function (err) {
      if (err) {
        console.error("Erro ao inserir no banco de dados:", err);  // Log para depuração
        return res.status(500).json({ message: 'Erro ao cadastrar serviço.' });
      }
      console.log("Serviço cadastrado com sucesso:", { tamanho, complexidade, cores, preco });
      return res.status(201).json({ message: 'Serviço cadastrado com sucesso!', id_servico: this.lastID });
    }
  );
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
