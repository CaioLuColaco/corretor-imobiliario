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
            const imoveis = await prisma.imoveis.findMany({
                include: {
                    photos: true,
                }
            })
            
            const cities = []
            for(imovel of imoveis) {
                if(cities.indexOf(imovel.city) == -1) {
                    cities.push(imovel.city)
                }
            }
            
            return imoveis? res.render("./screens/home", {imoveis: imoveis, cities: cities}) : res.render("./screens/pageNotFind")
            
        } catch (err) {
            console.log(err)
            return res.render("./screens/pageNotFind")
        }
    },


    async ihone(req, res) {
        try {

            const imoveis = await prisma.imoveis.findMany()
    
            return imoveis? res.render("./screens/admin", {imoveis: imoveis}) : res.render("./screens/pageNotFind")
            
        } catch (error) {
            return res.render("./screens/pageNotFind")
        }
    },

    async imovel(req, res) {
        try {
            const imovelId = parseInt(req.params.imovelId)
            const imovel = await prisma.imoveis.findUnique({
                where: {
                    idimovel: imovelId
                },
                include: {
                    photos: true
                }
            })
            
    
            return imovel? res.render("./screens/imovel", {imovel: imovel}) : res.render("./screens/pageNotFind")
            
        } catch (error) {
            return res.render("./screens/pageNotFind")
        }

    },

    async imoveis(req, res) {
        try {
            const filter = Object.fromEntries(
                Object.entries(req.query).filter(([_, v]) => v != null && v !== "")
              );
            let imoveis = await prisma.imoveis.findMany({
                include: {
                    photos: true,
                }
            })
            const cities = []
            for(imovel of imoveis) {
                if(cities.indexOf(imovel.city) == -1) {
                    cities.push(imovel.city)
                }
            }

            if(filter.imovel_type) {
                imoveis = imoveis.filter(imovel => imovel.imovel_type == filter.imovel_type)
            }

            if(filter.city) {
                imoveis = imoveis.filter(imovel => imovel.city == filter.city)
            }

            if(filter.finality) {
                imoveis = imoveis.filter(imovel => imovel.finality == filter.finality)
            }
            
            if(filter.bedrooms) {
                imoveis = imoveis.filter(imovel => imovel.bedrooms == filter.bedrooms)
            }

            if(filter.area_min) {
                imoveis = imoveis.filter(imovel => imovel.area >= parseFloat(filter.area_min))
            }

            if(filter.area_max) {
                imoveis = imoveis.filter(imovel => imovel.area <= parseFloat(filter.area_max))
            }

            if(filter.value_min) {
                imoveis = imoveis.filter(imovel => imovel.price >= parseFloat(filter.value_min))
            }

            if(filter.value_max) {
                imoveis = imoveis.filter(imovel => imovel.price <= parseFloat(filter.value_max))
            }

    
            return imoveis? res.render("./screens/imoveis", {imoveis: imoveis, cities: cities}) : res.render("./screens/pageNotFind")
            
        } catch (error) {
            console.log(error)
            return res.render("./screens/pageNotFind")
        }
    }
}