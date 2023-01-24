const { PrismaClient } = require('@prisma/client')

const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

module.exports = {
    async find(req, res) {
        try {
            const userId = parseInt(req.params.userId)

            const user = await prisma.users.findUnique({
                where: {
                    id: userId 
                }
            })

            return res.status(200).json(user)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async findAll(req, res) {
        try {

            const users = await prisma.users.findMany()

            return res.status(200).json(users)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async create(req, res) {
        try {

            const {name, email, password, permission} = req.body

            const findUser = await prisma.users.findUnique({
                where: {
                    email: email
                }
            })

            if(findUser) {
                return res.status(400).json({status: 400, message: "Email já cadastrado!"})
            }

            const salt = bcrypt.genSaltSync(10)
            const passwordHash = bcrypt.hashSync(password, salt)

            const user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash
                }
            })
            console.log("fim")
            return res.status(200).json(user)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async authenticationUser(req, res) {
        try {

            const {email, password} = req.body

            const user = await prisma.users.findUnique({
                where: {
                    email: email
                }
            })

            if(!user){
                return res.json(404).json({status: 404, message: "Email ou senha incorretos!"})
            }

            var validation = false
            if(email == user.email){
                bcrypt.compare(password, user.password, function(err, res) {
                    validation = res
                });
            }
            
            if(validation == true){
                return res.status(200).json(user)
            }

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async update(req, res) {
        try {

            const {userId} = parseInt(req.params.userId)

            const currentUser = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            })

            if(!currentUser){
                return res.status(400).json({status:400, message: "Usuário não encontrado!"})
            }

            const {name, email, password, permission} = req.body

            const user = await prisma.users.update({
                where: {
                    id: userId
                },
                data: {
                    name: name || currentUser.name,
                    email: email || currentUser.email,
                    password: password || currentUser.password,
                    permission: permission || currentUser.permission
                }
            })

            return res.status(200).json(user)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async delete(req, res) {
        try {
            
            const {userId} = parseInt(req.params.userId)

            const findUser = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            })

            if(!findUser){
                return res.status(400).json({status: 200, message: "Usuário não encontrado!"})
            }

            const user = await prisma.users.delete({
                where: {
                    id: userId
                }
            })

            return res.status(200).json(user)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    }
}