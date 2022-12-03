const express = require('express');
let router = express.Router();
const home = require('../models/product.models')

const initWebRoute = (app) => {
    router.get('/', home.getList);
    router.get('/add', home.toPageAdd);
    router.post('/add', home.addProduct);
    router.get('/edit/:id', home.findById);
    router.post('/update', home.updateProduct);
    router.get('/delete/:id', home.deleteProduct);
    router.get('/search/', home.searchName);

    return app.use('/', router)
}

module.exports = initWebRoute;
