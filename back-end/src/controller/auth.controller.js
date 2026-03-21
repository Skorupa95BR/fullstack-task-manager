import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../servies/db/connection.js";

function validarSenha (password) {
    const miniLength = 5;
    const temMaiuscula = /[A-Z]/.test(password);
    const temMinuscula = /[a-z]/.test(password);
    const temNumero = /[0-9]/.test(password);

    if( password.length < miniLength) {
        return "A senha deve conter no mínimo 5 caracteres";
    } 

    if (!temMaiuscula) {
        return "A senha deve conter pelo menos uma letra maiúscula";
    }

    if (!temMinuscula) {
        return "A senha deve conter pelo menos uma letra minúscula";
    }

    return null;
}

async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const userExists = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        // Gera hash da senha
        const senhaHash = await bcrypt.hash(password, 10);

        // Insere novo usuário
        const result = await client.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, senhaHash]
        );

        const user = result.rows[0];
        res.status(201).json({
            message: "Usuário criado com sucesso",
            user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }

  const senhaInvalida = validarSenha(password);

    if(senhaInvalida) {
        return res.status(400).json({ error: senhaInvalida });
    }
}
async function login(req, res) {
    const { email, password } = req.body;

    try {
        //Busca usuário
        const result = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const user = result.rows[0];

        //Compara senha
        const senhaValida = await bcrypt.compare(password, user.password);

        if (!senhaValida) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        //Gera token
        const token = jwt.sign(
            { userId: user.id },
            "SEGREDO_SUPER_SEGURO",
            { expiresIn: "1d" }
        );

        //Retorna dados
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no login" });
    }
}

export { login, register };