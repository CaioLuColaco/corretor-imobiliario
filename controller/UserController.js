const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async find(req, res) {
        try {
            const userId = parseInt(req.params.userId)

            const user = await prisma.user.findUnique({
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

            const users = await prisma.user.findMany()

            return res.status(200).json(users)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async create(req, res) {
        try {

            const {name, email, password, permission} = req.body

            const findUser = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if(findUser) {
                return res.status(400).json({status: 400, message: "Email já cadastrado!"})
            }

            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            })

            return res.status(200).json(user)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async update(req, res) {
        try {

            const {userId} = parseInt(req.params.userId)

            const currentUser = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if(!currentUser){
                return res.status(400).json({status:400, message: "Usuário não encontrado!"})
            }

            const {name, email, password, permission} = req.body

            const user = await prisma.user.update({
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

            const findUser = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if(!findUser){
                return res.status(400).json({status: 200, message: "Usuário não encontrado!"})
            }

            const user = await prisma.user.delete({
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