const connectDB = require('../database/connect')

let displayListProduct = (req, res) => {
    let sql = 'select * from product where is_deleted = 0'
    connectDB.query(sql, (err, data) => {
        if (data == null) {
            res.writeHead(404, {
                'Content-type': 'application/json',
                'X-Powered-By': 'Node.js'
            })
            res.end(JSON.stringify({
                success: false,
                error: 'NOT FOUND',
                productList: null
            }));
        } else {
            res.writeHead(200, {
                'Content-type': 'application/json',
                'X-Powered-By': 'Node.js'
            })
            res.end(JSON.stringify({
                success: true,
                productList: data
            }));

        }
    });
}


let addProduct = (req, res) => {
    let {name, price, cost, address} = req.body;
    if (!name || !price || !cost || !address) {
        return res.status(200).json({
            message: 'nhập đủ thông tin đi cu :))'
        })
    }
    let sql = ' insert into product (name, price, cost, address) value ( ?,?,?,?)';
    connectDB.query(sql, [name, price, cost, address], (err, result) => {
        if (err) res.render('error', {message: err.message, status: '', error: err.message});
        return res.status(200).json({message: 'thêm thành công'})
    })
}


let deleteProduct = (req, res) => {
    let idDelete = req.params.id;
    console.log(idDelete)
    if (!idDelete) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    connectDB.query(
        'UPDATE product set is_deleted = 1 WHERE id = ?', [idDelete], (err, result) => {
            if (err) throw err;
            return res.status(200).json({
                message: 'ok'
            })
        }
    );
}


let findById = (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    connectDB.query(
        'select * from product WHERE id = ? and is_deleted = 0 ', [id], (err, result) => {
            if (err) throw err;
            if (result == '') {
                return res.status(200).json({
                    message: 'id not found',
                })
            }
            return res.status(200).json({
                message: 'ok',
                product: result
            })
        }
    );
}

let updateProduct = async (req, res) => {
    let {name, price, cost, address, id} = req.body;
    if (!name || !price || !cost || !address || !id) {
        return res.status(200).json({
            message: 'chưa truyền đủ data'
        })
    }
    await connectDB.execute(' UPDATE product SET name = ? , price = ? , cost = ?, address = ? where id = ?', [name, price, cost, address, id], (err, result) => {
        if (err) res.render('error', {message: err.message, status: '', error: err.message});
        return res.status(200).json({message: 'sửa thành công'})
    })
}

let searchProduct = (req, res) => {
    var nameSearch = req.query.nameSearch;
    connectDB.query(`select * from product`, (err, result) => {
        if (err) res.render('error', {message: err.message, status: '', error: err.message});
        var data = result.filter(function (item) {
            return item.name.indexOf(nameSearch) !== -1
        });
        console.log(nameSearch)
        res.render('index', {productList: data});
    })

}

module.exports = {
    displayListProduct, findById, addProduct, deleteProduct, updateProduct, searchProduct
}
