const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const multiparty = require('multiparty')
const fs = require('fs')
const {createAll, deleteAll, findALL} = require('./PhotosController')


const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

module.exports = {
    async create(req, res) {
            const form = new multiparty.Form();
            form.parse(req, async (err, fields, files) => {
                try {
                    let listaDeImagens = [];

                    // console.log(Object.values(files))
                    for(let file of Object.values(files)){
                        listaDeImagens.push(file[0].path)
                    }


                    const {price, title, description, district, street, city, house_number, area, monthly_payment, bedrooms, suites, bathrooms, garages, finality, imovel_type} = fields
        
                    const imovel = await prisma.imoveis.create({
                        data: {
                            price: Number(price[0]),
                            title: title[0],
                            description: description[0],
                            district: district[0],
                            street: street[0],
                            city: city[0],
                            house_number: house_number[0],
                            area: Number(area[0]),
                            monthly_payment: Number(monthly_payment[0]),
                            bedrooms: Number(bedrooms[0]),
                            suites: Number(suites[0]),
                            bathrooms: Number(bathrooms[0]),
                            garages: Number(garages[0]),
                            finality: finality[0],
                            imovel_type: imovel_type[0],
                        }
                    })
                    
                    let listaURLs = [];
                    const postarTudo = async () => {
                        const promises = listaDeImagens.map(async (foto) => {
                            await cloudinary.uploader.upload(foto, { upload_preset: 'rstamimi' }).then(resp => listaURLs.push({ codepic: resp.url, idimovel: imovel.idimovel }))
                        })
                        await Promise.all(promises);
                    }
                    await postarTudo();
        
                    const photos = await createAll({body: listaURLs})
        
                    return res.status(200).json(imovel)
        
                } catch (error) {
                    console.log(error.message)
                    return res.status(400).json({status:400, message: error.message})
                }
            })
    },

    async update(req, res) {
        const imovelId = parseInt(req.params.imovelId)
            const form = new multiparty.Form();
            form.parse(req, async (err, fields, files) => {
                try {
                    const currentImovel = await prisma.imoveis.findUnique({ where: { idimovel: imovelId } })
                    
                    let listaDeImagens = [];

                    // console.log(Object.values(files))
                    for(let file of Object.values(files)){
                        listaDeImagens.push(file[0].path)
                    }


                    const {price, title, description, district, street, city, house_number, area, monthly_payment, bedrooms, suites, bathrooms, garages, finality, imovel_type} = fields
                    console.log("teste")
                    const imovel = await prisma.imoveis.update({
                        data: {
                            price: Number(price[0]) || Number(currentImovel.price),
                            title: title[0] || currentImovel.title,
                            description: description[0] || currentImovel.description,
                            district: district[0] || currentImovel.district,
                            street: street[0] || currentImovel.street,
                            city: city[0] || currentImovel.city,
                            house_number: house_number[0] || currentImovel.house_number,
                            area: Number(area[0]) || Number(currentImovel.area),
                            monthly_payment: Number(monthly_payment[0]) || Number(currentImovel.monthly_payment),
                            bedrooms: Number(bedrooms[0]) || Number(currentImovel.bedrooms),
                            suites: Number(suites[0]) || Number(currentImovel.suites),
                            bathrooms: Number(bathrooms[0]) || Number(currentImovel.bathrooms),
                            garages: Number(garages[0]) || Number(currentImovel.garages),
                            finality: finality[0] || currentImovel.finality,
                            imovel_type: imovel_type[0] || currentImovel.imovel_type,
                        },
                        where: {
                            idimovel: imovelId
                        }
                    })
                    
                    let listaURLs = [];
                    const postarTudo = async () => {
                        const promises = listaDeImagens.map(async (foto) => {
                            await cloudinary.uploader.upload(foto, { upload_preset: 'rstamimi' }).then(resp => listaURLs.push({ codepic: resp.url, idimovel: imovel.idimovel }))
                        })
                        await Promise.all(promises);
                    }
                    await postarTudo();
        
                    const photos = await createAll({body: listaURLs})
        
                    return res.status(200).json(imovel)
        
                } catch (error) {
                    console.log(error.message)
                    return res.status(400).json({status:400, message: error.message})
                }
            })
    },

    async delete(req, res) {
        try {
            const imovelId = parseInt(req.params.imovelId)

            const photos = await deleteAll({body: {imovelId}})
            
            const imovel = await prisma.imoveis.delete({
                where: {
                    idimovel: imovelId
                }
            })
            
            return res.status(200).json(imovel)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async find(req, res) {
        try {

            const imovelId = parseInt(req.params.imovelId)

            const imovel = await prisma.imoveis.findUnique({where: {idimovel: imovelId}})
            
            return res.status(200).json(imovel)
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async findAll(req, res) {
        try {

            const imoveis = await prisma.imoveis.findMany()

            return res.status(200).json(imoveis)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

}