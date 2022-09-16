const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {

    async createAll(req, res) {
        try {

            const {createdPhotos} = req.body

            const photos = await prisma.photos.createMany({
                data: createdPhotos,
                skipDuplicates: true
            })
            
            return res.status(200).json(photos)
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
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

            return res.status(200).json(photos)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async findALL(req, res) {
        try {

            const imovelId = parseInt(req.params.imovelId)

            const photos = await prisma.photos.findMany({where: {idimovel: imovelId}})

            return res.status(200).json(photos)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },
}