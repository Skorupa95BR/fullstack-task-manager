import jwt from "jsonwebtoken";

export function authMiddleware (req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({
            error: "Token de autenticação não fornecido"
        })
}

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "SEGREDO_SUPER_SEGURO");

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status (401).json({
            error: "Token de autenticação inválido"
        })
    }
}    