const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    api_key: process.env.API_KEY ,
    api_secret: process.env.API_SECRET ,
    secure: true
});

module.exports = {

    async createAll(req, res) {
        try {

            const createdPhotos = req.body

            const photos = await prisma.photos.createMany({
                data: createdPhotos,
                skipDuplicates: true
            })
            
            return photos
        } catch (error) {
            return error
        }
    },

    async delete(req, res) {
        try {
            const idphoto = parseInt(req.params.idphoto)

            const photo = await prisma.photos.delete({
                where: {
                    idphoto: idphoto
                }
            })

            return res.status(200).json(photo)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async deleteAll(req, res) {
        try {
            const { imovelId } = req.body

            const photos = await prisma.photos.deleteMany({
                where: {
                    idimovel: imovelId
                }
            })

            return photos
            
        } catch (error) {
            return error
        }
    },

    async findALL(req, res) {
        try {

            const imovelId = parseInt(req.params.imovelId)

            const photos = await prisma.photos.findMany({where: {idimovel: imovelId}})

            // return res.status(200).json(photos)
            return photos
            
        } catch (error) {
            return error
        }
    },

}
