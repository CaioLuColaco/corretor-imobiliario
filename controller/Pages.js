const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const ImovelController = require('./ImovelController')

module.exports = {
    async admin(req, res){

        return res.render('./screens/login')

    },

    async financas(req, res) {
        return res.render('./screens/financas')
    },
    
    async pageNotFind(req, res) {
        return res.render('./screens/pageNotFind')
    },

    async home(req, res){
        try {
            const imoveis = await prisma.imoveis.findMany()
    
            return imoveis? res.render("./screens/home", imoveis) : res.render("./screens/pageNotFind")
            
        } catch (error) {
            return res.render("./screens/pageNotFind")
        }
    },


    async ihone(req, res) {
        try {

            const imoveis = await prisma.imoveis.findMany()
    
            return imoveis? res.render("./screens/admin", imoveis) : res.render("./screens/pageNotFind")
            
        } catch (error) {
            return res.render("./screens/pageNotFind")
        }
    },

    async imovel(req, res) {
        try {
            const imovelId = parseInt(req.params.imovelId)
            const imovel = await prisma.imoveis.findUnique({where: {idimovel: imovelId}})

            
    
            return imovel? res.render("./screens/imovel", imovel) : res.render("./screens/pageNotFind")
            
        } catch (error) {
            return res.render("./screens/pageNotFind")
        }

    },

    async imoveis(req, res) {
        try {

            const imoveis = await prisma.imoveis.findMany()
    
            return imoveis? res.render("./screens/imoveis", imoveis) : res.render("./screens/pageNotFind")
            
        } catch (error) {
            return res.render("./screens/pageNotFind")
        }
    }
}