const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "nhuhoa2303",
    database: "demo_nodejs"
});

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE demo_nodejs", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");
//     });
// });

// tạo bảng và thêm dữ liệu
let sql;
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     sql = "CREATE TABLE product " +
//         " (id int primary key AUTO_INCREMENT NOT NULL, name VARCHAR(255),price double, cost int, address VARCHAR(255), is_deleted int default 0)";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//      sql = "INSERT INTO product ( name,price, cost, address)" +
//          " VALUES " +
//          "('Sữa nutri', 10000, 99, 'Đà Nẵng, VN' ), ('Bò húc', 15000, 99, 'Thái Lan' ) ,('Bia laru', 12000, 99, 'SG, VN' )" ;
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });
module.exports = con;
