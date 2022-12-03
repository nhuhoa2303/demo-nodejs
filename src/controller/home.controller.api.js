const express = require('express');
let router = express.Router();
const APIController = require('../models/product.models.api')

const initAPIRoute = (app) => {
    router.get('/', APIController.displayListProduct);
    router.get('/:id', APIController.findById);
    router.post('/add', APIController.addProduct);
    router.put('/update/', APIController.updateProduct);
    router.delete('/delete/:id', APIController.deleteProduct);

    return app.use('', router)
}

module.exports = initAPIRoute;
