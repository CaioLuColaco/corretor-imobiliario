const express = require('express')

const routes = express.Router()

const ImovelController = require('./ImovelController')
const PhotosController = require('./PhotosController')
const Pages = require('./Pages')

// Imoveis
routes.get('/imov',                 ImovelController.findAll)
routes.get('/imov/:imovelId',       ImovelController.find)
routes.post('/imov',                ImovelController.create)
routes.put('/imov/:imovelId',       ImovelController.update)
routes.delete('/imov/:imovelId',    ImovelController.delete)

// Photos
routes.get('/photos/:imovelId',     PhotosController.findALL)
routes.post('/photos',              PhotosController.createAll)
routes.delete('/photos/:idphoto',   PhotosController.delete)
routes.delete('/photos',            PhotosController.deleteAll)

// Pages
routes.get('/admin',                Pages.admin)
routes.get('/imoveis',              Pages.imoveis)
routes.get('/imovel',               Pages.pageNotFind)
routes.get('/imovel/:imovelId',     Pages.imovel)
routes.get('/ihone',                Pages.ihone)
routes.get('/financas',             Pages.financas)
routes.get('/home',                 Pages.home)
routes.get('/',                     Pages.home)


routes.use((req, res) => {
    res.status(404).get('/imovel',  Pages.pageNotFind)
})

module.exports = routes;