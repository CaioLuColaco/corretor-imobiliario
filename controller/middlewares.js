const jwt = require("jsonwebtoken")

module.exports = {
    checkToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(!token) {
            return res.status(401).json({message: "Acesso negado!"})
        }

        try {
            
            jwt.verify(token, process.env.AUTH_SECRET_KEY)

            next()

        } catch (error) {
            return res.status(400).json({message: "Token invalido!"})
        }
    }
}