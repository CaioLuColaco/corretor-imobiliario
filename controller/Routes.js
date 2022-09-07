const express = require('express')

const routes = express.Router()

const ImovelController = require('./ImovelController')
const PhotosController = require('./PhotosController')

// Imoveis
routes.get('/imov', ImovelController.findALL)
routes.get('/imov/:imovelId', ImovelController.find)
routes.post('/imov', ImovelController.create)
routes.put('/imov/:imovelId', ImovelController.update)
routes.delete('/imov/:imovelId', ImovelController.delete)

// Photos
routes.get('/photos/:imovelId', PhotosController.findALL)
routes.post('/photos', PhotosController.createAll)
routes.delete('/photos/:idphoto', PhotosController.delete)
routes.delete('/photos', PhotosController.deleteAll)

routes.use((req, res) => {
    res.status(404).json({error: "Invalid request"})
})

module.exports = routes;