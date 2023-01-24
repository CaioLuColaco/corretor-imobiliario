const express = require('express')

const routes = express.Router()

const ImovelController = require('./ImovelController')
const PhotosController = require('./PhotosController')
const UserControllers = require('./UserController')
const Pages = require('./Pages')

const {checkToken} = require("./middlewares")

// Imoveis
routes.get('/imov',                             ImovelController.findAll)
routes.get('/imov/:imovelId',                   ImovelController.find)
routes.post('/imov', checkToken,                ImovelController.create)
routes.put('/imov/:imovelId', checkToken,       ImovelController.update)
routes.delete('/imov/:imovelId', checkToken,    ImovelController.delete)

// Photos
routes.get('/photos/:imovelId',                 PhotosController.findALL)
routes.post('/photos', checkToken,              PhotosController.createAll)
routes.delete('/photos/:idphoto', checkToken,   PhotosController.delete)
routes.delete('/photos', checkToken,            PhotosController.deleteAll)

// Pages
routes.get('/admin',                            Pages.admin)
routes.get('/imoveis',                          Pages.imoveis)
routes.get('/imovel',                           Pages.pageNotFind)
routes.get('/imovel/:imovelId',                 Pages.imovel)
routes.get('/ihone', checkToken,                Pages.ihone)
routes.get('/financas',                         Pages.financas)
routes.get('/home',                             Pages.home)
routes.get('/',                                 Pages.home)

// User
routes.get('/userCreate',                       UserControllers.create)
routes.get('/userAuth',                         UserControllers.authenticationUser)
routes.get('/userUpdate/:userId',               UserControllers.update)
routes.get('/userDelete/:userId',               UserControllers.delete)
routes.get('/userFind/:userId',                 UserControllers.find)
routes.get('/userFindAll',                      UserControllers.findAll)

routes.use((req, res) => {
    res.status(404).get('/imovel',  Pages.pageNotFind)
})

module.exports = routes;