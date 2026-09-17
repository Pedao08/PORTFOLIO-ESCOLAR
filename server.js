const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// CONEXÃO COM O MYSQL
// ==========================================

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "123456",

    database: "portfolio"

});


db.connect((err) => {

    if (err) {

        console.error("Erro ao conectar ao MySQL:");
        console.error(err.message);

        return;
    }

    console.log("Conectado ao MySQL com sucesso!");

});


// ==========================================
// TESTE
// ==========================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Servidor do portfólio funcionando!"
    });

});


// ==========================================
// CADASTRO
// ==========================================

app.post("/api/cadastro", (req, res) => {

    const { nome, email, senha } = req.body;


    if (!nome || !email || !senha) {

        return res.status(400).json({

            success: false,

            message: "Preencha todos os campos."

        });

    }


    if (senha.length < 6) {

        return res.status(400).json({

            success: false,

            message: "A senha deve ter pelo menos 6 caracteres."

        });

    }


    // Verificar se o e-mail já existe
    const verificarSql = `
        SELECT id_usuario
        FROM usuarios
        WHERE email = ?
    `;


    db.query(
        verificarSql,
        [email],
        (err, results) => {

            if (err) {

                console.error(err.message);

                return res.status(500).json({

                    success: false,

                    message: "Erro ao consultar o banco."

                });

            }


            if (results.length > 0) {

                return res.status(409).json({

                    success: false,

                    message: "Este e-mail já está cadastrado."

                });

            }


            // Inserir usuário
            const inserirSql = `
                INSERT INTO usuarios
                (nome, email, senha)
                VALUES (?, ?, ?)
            `;


            db.query(
                inserirSql,
                [nome, email, senha],
                (err, resultado) => {

                    if (err) {

                        console.error(err.message);

                        return res.status(500).json({

                            success: false,

                            message: "Erro ao cadastrar usuário."

                        });

                    }


                    return res.json({

                        success: true,

                        message: "Cadastro realizado com sucesso!",

                        id_usuario: resultado.insertId

                    });

                }
            );

        }
    );

});


// ==========================================
// LOGIN
// ==========================================

app.post("/api/login", (req, res) => {

    const { email, senha } = req.body;


    if (!email || !senha) {

        return res.status(400).json({

            success: false,

            message: "E-mail e senha são obrigatórios."

        });

    }


    const sql = `
        SELECT
            id_usuario,
            nome,
            email
        FROM usuarios
        WHERE email = ?
        AND senha = ?
        LIMIT 1
    `;


    db.query(
        sql,
        [email, senha],
        (err, results) => {

            if (err) {

                console.error(err.message);

                return res.status(500).json({

                    success: false,

                    message: "Erro interno no servidor."

                });

            }


            if (results.length > 0) {

                return res.json({

                    success: true,

                    message: "Login realizado com sucesso!",

                    user: results[0]

                });

            }


            return res.status(401).json({

                success: false,

                message: "E-mail ou senha inválidos!"

            });

        }
    );

});


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(3000, () => {

    console.log(
        "Servidor rodando em http://localhost:3000"
    );

});