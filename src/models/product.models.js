const dbConnect = require('../database/connect')


// get list
let getList = (req, res) => {
    dbConnect.query('select * from product where is_deleted = 0', (err, data) => {
        if (err) res.render('error', {message: err.message, status: '', error: err.message});
        res.render('index.ejs', {productList: data});
    });

}

// chuyen sang trang them moi

let toPageAdd = (req, res) => {
    res.render('add')
}


// them moi data
let addProduct = async (req, res) => {
    let {name, price, cost, address} = req.body;
    if (!name || !price || !cost || !address) {
        console.log('nhap thieu')
    }
    dbConnect.execute(' insert into product (name, price, cost, address) value ( ?,?,?,?)', [name, price, cost, address], (err, result) => {
        if (err) res.render('error', {message: err.message, status: '', error: err.message});
        return res.redirect('/')
    })
}


// xóa

let deleteProduct = (req, res) => {
    let idDelete = req.params.id;

    dbConnect.query(
        'UPDATE product set is_deleted = 1 WHERE id = ? ', [idDelete], (err, result) => {
            if (err) throw err;
            res.redirect('/')
        }
    );
}


// hiển thị dữ liệu để edit

let findById = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    await dbConnect.execute(
        'select * from product WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            console.log(result)
            return res.render('edit.ejs', {data: result[0]})
        }
    );
}

// update data
let updateProduct = async (req, res) => {
    let {name, price, cost, address, id} = req.body;
    await dbConnect.execute(' UPDATE product SET name = ? , price = ? , cost = ?, address = ? where id = ?', [name, price, cost, address, id], (err, result) => {
        if (err) res.render('error', {message: err.message, status: '', error: err.message});
        return res.redirect('/');
    })

}


// let searchName =  (req, res) => {
//     var nameSearch = req.query.nameSearch;
//     dbConnect.query(`select * from product`, (err, result) => {
//         if (err) res.render('error', {message: err.message, status: '', error: err.message});
//         var data = result.filter(function (item) {
//             return item.name.indexOf(nameSearch) !== -1
//         });
//         console.log(nameSearch)
//         res.render('index', {productList: data});
//     })
// }

let searchName =  (req,res) => {

    var query = dbConnect.find();

    var findKeywords = [];
    if (req.query.keywords != '')
    {
        var words = req.query.keywords.split(",");

        for (ii=0; ii<words.length; ii++)
            findKeywords[ii] = {keywords: words[ii].trim()};

        console.log(findKeywords);
        query.or(findKeywords);
    }

    query.exec(function (err,logs) {
        if (err){
            res.send(500,err);
        } else {
            req.logsList = logs;

            res.render('searchdb',{user:req.user,logs:req.logsList});
        }
    });

}

module.exports = {
    getList, toPageAdd, addProduct, deleteProduct, findById, updateProduct,searchName
}
