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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const verificarTokenAdm = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado. Token não encontrado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    // Verifica se o token pertence a um administrador
    db.get('SELECT * FROM adm WHERE id_adm = ?', [decoded.id], (err, adm) => {
      if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
      if (!adm) return res.status(403).json({ message: 'Não autorizado. Acesso restrito a administradores.' });

      req.userId = decoded.id; // Adiciona o ID do administrador no request
      next();
    });
  });
};


// Middleware para verificar o token JWT
const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    req.userId = decoded.id; // Armazena o ID do usuário decodificado na requisição
    next();
  });
};


// Função para verificar as credenciais do usuário
const verificarCredenciaisUsuario = (email, senha, callback) => {
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


// Endpoint para verificar o usuário logado
app.get('/api/usuarios/me', verificarToken, (req, res) => {
  db.get('SELECT * FROM usuario WHERE id_usuario = ?', [req.userId], (err, usuario) => {
    if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
    res.json(usuario);
  });
});

// Função para verificar as credenciais do administrador
const verificarCredenciaisADM = (user, senha, callback) => {
  // Busca o administrador pelo username no banco de dados
  db.get('SELECT * FROM adm WHERE user = ?', [user], (err, row) => {
    if (err) return callback(err);

    if (!row) {
      return callback(null, null); // Administrador não encontrado
    }

    // Comparação da senha fornecida com a senha armazenada (criptografada)
    bcrypt.compare(senha, row.senha, (err, isPasswordMatch) => {
      if (err) return callback(err);
      if (isPasswordMatch) {
        return callback(null, row); // Credenciais corretas
      } else {
        return callback(null, null); // Senha incorreta
      }
    });
  });
};

app.post('/api/login', (req, res) => {
  const { userOrEmail, senha } = req.body;

  // Verifica credenciais de administrador
  verificarCredenciaisADM(userOrEmail, senha, (err, adm) => {
    if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
    if (adm) {
      const token = jwt.sign({ id: adm.id_adm, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 3600000,
      });

      return res.status(200).json({
        message: 'Login bem-sucedido como administrador!',
        token,
        role: 'admin', // Inclua o role explicitamente
      });
    }

    // Verifica credenciais de usuário
    verificarCredenciaisUsuario(userOrEmail, senha, (err, usuario) => {
      if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
      if (usuario) {
        const token = jwt.sign({ id: usuario.id_usuario, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 3600000,
        });

        return res.status(200).json({
          message: 'Login bem-sucedido como usuário!',
          token,
          role: 'user', // Inclua o role explicitamente
        });
      }

      return res.status(401).json({ message: 'Credenciais inválidas.' });
    });
  });
});


// Endpoint para verificar o adm logado
app.get('/api/adms/me', verificarTokenAdm, (req, res) => {
  db.get('SELECT * FROM adm WHERE id_adm = ?', [req.userId], (err, adm) => {
    if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });
    if (!adm) return res.status(404).json({ message: 'Administrador não encontrado.' });
    res.json(adm);
  });
});

// Rota para cadastro de novo serviço
app.post('/servicos/novo', verificarTokenAdm, (req, res) => {
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
        return res.status(500).json({ message: 'Erro ao cadastrar serviço.' });
      }
      return res.status(201).json({ message: 'Serviço cadastrado com sucesso!', id_servico: this.lastID });
    }
  );
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
app.post('/adm/novo', verificarTokenAdm, async (req, res) => {
  const { nome, user, senha, conf_senha } = req.body;

  // Verifica se a senha e a confirmação da senha são iguais
  if (senha !== conf_senha) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }

  // Verifica se o usuário já existe no banco de dados
  db.get('SELECT user FROM adm WHERE user = ?', [user], (err, row) => {
    if (err) return res.status(500).json({ message: 'Erro interno do servidor.' });

    if (row) {
      return res.status(409).json({ message: 'Usuário já existe.' }); // Usuário já cadastrado
    }

    // Criptografa a senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Erro ao criptografar a senha.' });

      // Insere o novo administrador no banco de dados
      db.run(
        'INSERT INTO adm (nome, user, senha) VALUES (?, ?, ?)',
        [nome, user, hashedPassword],
        function (err) {
          if (err) return res.status(500).json({ message: 'Erro ao cadastrar administrador.' });

          return res.status(201).json({ message: 'Administrador cadastrado com sucesso!', id_adm: this.lastID });
        }
      );
    });
  });
});


// Rota para cadastrar um horário
app.post('/horario/novo', verificarTokenAdm, (req, res) => {
  
  const { datetime } = req.body;

  if (!datetime) {
    return res.status(400).json({ message: 'O campo datetime é obrigatório.' });
  }

  // Verifica se já existe um horário no mesmo dia e hora
  db.get(
    'SELECT * FROM horario WHERE datetime = ?', // Compara o datetime exato
    [datetime],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao verificar a disponibilidade do horário.' });
      }

      if (row) {
        return res.status(409).json({ message: 'Já existe um horário cadastrado neste momento.' });
      }

      // Insere o novo horário e associa ao usuário
      db.run(
        'INSERT INTO horario (datetime, usuario_sk) VALUES (?, ?)',
        [datetime],
        function (err) {
          if (err) {
            return res.status(500).json({ message: 'Erro ao cadastrar horário.' });
          }

          res.status(201).json({
            message: 'Horário cadastrado com sucesso!',
            id_horario: this.lastID,
          });
        }
      );
    }
  );
});

// Rota de logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token'); // Limpa o cookie do token
  return res.status(200).json({ message: 'Logout bem-sucedido.' });
});

//Rota para listar usuarios
app.get("/usuarios", verificarTokenAdm, (req, res) => {
  db.all("SELECT id_usuario, nome, email, idade FROM usuario", [], (err, rows) => {
    if (err) {
      console.error("Erro ao obter usuários:", err.message);
      return res.status(500).json({ message: "Erro ao carregar usuários." });
    }
    res.status(200).json({
      result: {
        usuarios: rows || [], // Garante que retorne um array mesmo que vazio
      },
    });
  });
});

//Rota para listar adms
app.get("/adms", verificarTokenAdm, (req, res) => {
  db.all("SELECT id_adm, nome, user FROM adm", [], (err, rows) => {
    if (err) {
      console.error("Erro ao obter administradores:", err.message);
      return res.status(500).json({ message: "Erro ao carregar administradores." });
    }
    res.status(200).json({
      result: {
        adms: rows || [], // Garante que retorne um array mesmo que vazio
      },
    });
  });
});


//Rota para listar serviços
app.get("/servicos", (req, res) => {
  db.all("SELECT id_servico, tamanho, complexidade, cores, preco FROM servico", [], (err, rows) => {
    if (err) {
      console.error("Erro ao obter serviços:", err.message);
      return res.status(500).json({ message: "Erro ao carregar serviços." });
    }
    res.status(200).json({
      result: {
        servicos: rows || [], // Garante que retorne um array mesmo que vazio
      },
    });
  });
});

// Rota para listar horários onde usuario_sk é nulo, com data e hora separados
app.get("/horarios", verificarTokenAdm, (req, res) => {
  db.all(`
    SELECT 
      h.id_horario, 
      SUBSTR(h.datetime, 1, 10) AS data,   -- Extrai a parte da data (YYYY-MM-DD)
      SUBSTR(h.datetime, 12, 5) AS hora     -- Extrai a parte da hora (HH:MM)
    FROM horario h
    WHERE h.usuario_sk IS NULL            -- Filtra onde usuario_sk é nulo
  `, [], (err, rows) => {
    if (err) {
      console.error("Erro ao obter horários:", err.message);
      return res.status(500).json({ message: "Erro ao carregar horários." });
    }
    res.status(200).json({
      result: {
        horarios: rows || [], // Garante que retorne um array mesmo que vazio
      },
    });
  });
});

// Rota para buscar horários em data especifica
app.get("/horarios/:data", verificarToken, (req, res) => {
  const dataSelecionada = req.params.data; // Recebe a data no formato YYYY-MM-DD

  db.all(`
    SELECT 
      h.id_horario, 
      SUBSTR(h.datetime, 12, 5) AS hora     -- Extrai a parte da hora (HH:MM)
    FROM horario h
    WHERE h.usuario_sk IS NULL            -- Filtra onde usuario_sk é nulo
      AND SUBSTR(h.datetime, 1, 10) = ?   -- Filtra pela data enviada (formato YYYY-MM-DD)
  `, [dataSelecionada], (err, rows) => {
    if (err) {
      console.error("Erro ao obter horários:", err.message);
      return res.status(500).json({ message: "Erro ao carregar horários." });
    }
    
    // Retorna os horários disponíveis na data especificada
    res.status(200).json({
      result: {
        horarios: rows || [], // Garante que retorne um array mesmo que vazio
      },
    });
  });
});

// Rota para buscar preço de serviço com base no tamanho, complexidade e cores
app.get("/preco-servico", (req, res) => {
  const { tamanho, complexidade, cores } = req.query;

  // Verifica o tamanho e mapeia para a categoria adequada
  let tamanhoCategoria = "";
  const tamanhoNumero = parseInt(tamanho); // Convertendo tamanho para número inteiro
  
  if (tamanhoNumero >= 0 && tamanhoNumero <= 5) {
    tamanhoCategoria = "pequeno";
  } else if (tamanhoNumero > 5 && tamanhoNumero <= 15) {
    tamanhoCategoria = "medio";
  } else if (tamanhoNumero > 15) {
    tamanhoCategoria = "grande";
  } else {
    return res.status(400).json({ message: "Tamanho inválido." });
  }

  // Monta a consulta com base nos parâmetros fornecidos
  const query = `SELECT preco FROM servico WHERE tamanho = ? AND complexidade = ? AND cores = ?`;

  db.get(query, [tamanhoCategoria, complexidade, cores], (err, row) => {
    if (err) {
      console.error("Erro ao buscar preço:", err.message);
      return res.status(500).json({ message: "Erro ao buscar preço do serviço." });
    }
    
    if (row) {
      res.status(200).json({
        result: {
          preco: row.preco, // Retorna o preço do serviço encontrado
        },
      });
    } else {
      res.status(404).json({ message: "Serviço não encontrado." });
    }
  });
});

// Rota para atualizar o campo usuario_sk no horário, para associar ao usuário logado (AGENDAMENTO)
app.put("/horarios/:id", verificarToken, (req, res) => {
  const idHorario = req.params.id;  // ID do horário a ser atualizado
  const usuarioId = req.usuario.id_usuario;  // ID do usuário logado, proveniente do token

  // Verifica se o id_horario é válido e se o usuario_sk está nulo
  db.get(`
    SELECT usuario_sk
    FROM horario
    WHERE id_horario = ? AND usuario_sk IS NULL
  `, [idHorario], (err, row) => {
    if (err) {
      console.error("Erro ao buscar horário:", err.message);
      return res.status(500).json({ message: "Erro ao verificar horário." });
    }
    
    if (!row) {
      return res.status(404).json({ message: "Horário não encontrado ou já está ocupado." });
    }

    // Se o horário não tiver um usuario_sk, realiza a atualização
    db.run(`
      UPDATE horario
      SET usuario_sk = ?
      WHERE id_horario = ?
    `, [usuarioId, idHorario], function(err) {
      if (err) {
        console.error("Erro ao atualizar horário:", err.message);
        return res.status(500).json({ message: "Erro ao atualizar horário." });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ message: "Horário não encontrado para atualizar." });
      }

      res.status(200).json({ message: "Horário atualizado com sucesso." });
    });
  });
});

// Rota para listar os agendamentos de um usuário logado
app.get("/agendamentos", (req, res) => {
  const usuarioId = req.usuario.id_usuario;  // ID do usuário logado, extraído do token

  // Consulta os agendamentos do usuário logado
  db.all(`
    SELECT 
      a.id_agendamento, 
      a.data, 
      a.hora 
    FROM agendamento a
    WHERE a.usuario_sk = ?
  `, [usuarioId], (err, rows) => {
    if (err) {
      console.error("Erro ao obter agendamentos:", err.message);
      return res.status(500).json({ message: "Erro ao carregar agendamentos." });
    }

    // Se não houver agendamentos, retorna um array vazio
    res.status(200).json({
      result: {
        agendamentos: rows || [], // Garantir que um array vazio seja retornado
      },
    });
  });
});

// Rota para cancelar um agendamento (tornar usuario_sk nulo)
app.put("/agendamentos/cancelar/:id", verificarToken, (req, res) => {
  const idAgendamento = req.params.id;  // ID do agendamento a ser cancelado
  const usuarioId = req.usuario.id_usuario;  // ID do usuário logado, proveniente do token

  // Verifica se o agendamento existe e se o usuario_sk corresponde ao usuário logado
  db.get(`
    SELECT usuario_sk
    FROM agendamento
    WHERE id_agendamento = ? AND usuario_sk = ?
  `, [idAgendamento, usuarioId], (err, row) => {
    if (err) {
      console.error("Erro ao buscar agendamento:", err.message);
      return res.status(500).json({ message: "Erro ao verificar agendamento." });
    }

    if (!row) {
      return res.status(404).json({ message: "Agendamento não encontrado ou não pertence ao usuário." });
    }

    // Se o agendamento existe e pertence ao usuário, podemos cancelá-lo
    db.run(`
      UPDATE agendamento
      SET usuario_sk = NULL
      WHERE id_agendamento = ?
    `, [idAgendamento], function(err) {
      if (err) {
        console.error("Erro ao cancelar agendamento:", err.message);
        return res.status(500).json({ message: "Erro ao cancelar agendamento." });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Agendamento não encontrado para cancelar." });
      }

      res.status(200).json({ message: "Agendamento cancelado com sucesso." });
    });
  });
});


// Rota para editar um usuário
app.put('/usuarios/:id_usuario', verificarTokenAdm, (req, res) => {
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

// Rota para editar um adm
app.put('/adms/:id_adm', verificarTokenAdm, (req, res) => {
  const { id_adm } = req.params;
  const { nome, user } = req.body;

  const admAtualizado = { nome, user };

  db.run('UPDATE adm SET nome = ?, user = ? WHERE id_adm = ?',
    [admAtualizado.nome, admAtualizado.user, id_adm],
    function (err) {
      if (err) return res.status(500).json({ message: 'Erro ao atualizar adm.' });
      res.json({ message: 'Adm atualizado com sucesso!' });
    });
});


// Rota para editar um servico
app.put('/servicos/:id_servico', verificarTokenAdm, (req, res) => {
  const { id_servico } = req.params;
  const { preco } = req.body;

  const servicoAtualizado = { preco };

  db.run('UPDATE servico SET preco = ? WHERE id_servico = ?',
    [servicoAtualizado.preco, id_servico],
    function (err) {
      if (err) return res.status(500).json({ message: 'Erro ao atualizar serviço.' });
      res.json({ message: 'Serviço atualizado com sucesso!' });
    });
});


// Rota para excluir um usuário por ID
app.delete('/usuarios/:id_usuario', verificarTokenAdm, (req, res) => {
  const { id_usuario } = req.params;
  db.run('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], function (err) {
    if (err) return res.status(500).json({ message: 'Erro ao excluir usuário.' });
    res.json({ message: 'Usuário excluído com sucesso!' });
  });
});

// Rota para excluir um adm por ID
app.delete('/adms/:id_adm', (req, res) => {
  const { id_adm } = req.params;
  db.run('DELETE FROM adm WHERE id_adm = ?', [id_adm], function (err) {
    if (err) return res.status(500).json({ message: 'Erro ao excluir adm.' });
    res.json({ message: 'Adms excluído com sucesso!' });
  });
});


// Rota para excluir um servico por ID
app.delete('/servicos/:id_servico', verificarTokenAdm, (req, res) => {
  const { id_servico } = req.params;
  db.run('DELETE FROM servico WHERE id_servico = ?', [id_servico], function (err) {
    if (err) return res.status(500).json({ message: 'Erro ao excluir serviço.' });
    res.json({ message: 'Serviço excluído com sucesso!' });
  });
});

//Rota para excluir horario por ID
app.delete('/horarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.run('DELETE FROM horario WHERE id_horario = ?', [id]);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Horário excluído com sucesso.' });
        } else {
            res.status(404).json({ message: 'Horário não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir horário.' });
    }
});


// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
