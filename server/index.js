const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'expensedb',
});

db.getConnection((err) => {
    if (err) throw err;
    console.log("MYSQL connected");
})
// app.get("/", (req, res)=>{
// const sqlInsert= "INSERT INTO credentials (email, password) VALUES('nikk45454@gmail.com', 'hgjhsgh');"
// db.query(sqlInsert,(err, result)=>{
//     res.send("jdkksdkhbhbjf");
// })
// });

app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body.email, password)
    db.query(
        "SELECT * FROM credentials WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {

            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result)
            } else {
                res.send({ message: "No user found" })
            }
        }
    )
})

app.post("/monthData", (req, res) => {
    const clickMonth = req.body.clickMonth;
    const selectedCategory = req.body.selectedCategory;
     console.log(selectedCategory)
    db.query('SELECT * FROM categoryexpense where date like "%-"?"-%" and category = ?;',[clickMonth, req.body.selectedCategory],
     (err, result) => {
        if (err) throw err;
        console.log('res');
        console.log(result);
        var month = JSON.stringify(result);
        console.log('>> string: ', month);
        res.send(month)
    })
})


app.post("/category", (req, res) => {

    const newCatAdded = req.body.newCatAdded;

    console.log(req.body.newCatAdded)
    db.query(
        "INSERT INTO categories (category) VALUES (?);",
        [newCatAdded],
        (err, result) => {

            if (err) {
                res.send({ err: err });
            } else {
                res.send({ message: "Data added successfully" })
            }
        }
    )
})


app.post("/saveCat", (req, res) => {

    const date = req.body.date;
    const amount = req.body.amount;
    const categ = req.body.categ;
    console.log(req.body.date)

    console.log(req.body.amount)
    db.query(
        "INSERT INTO categoryexpense (date,category,amount) VALUES (?,?,?);",
        [date, categ, amount],
        (err, result) => {

            if (err) {
                res.send({ err: err });
            } else {
                res.send({ message: "Data added successfully" })
            }
        }
    )
})




app.get("/cate", (req, res) => {
    var getCategory = "SELECT * FROM categories;"
    db.query(getCategory, (err, result) => {
        if (err) throw err;
        console.log(result);
        var catlist = JSON.stringify(result);
        console.log('>> string: ', catlist);
        res.send(catlist)
    })

})

// app.get("/monthWiseData", (req, res) => {
//     var getCat = "SELECT * FROM categoryexpense;"
//     db.query(getCat, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         var catl = JSON.stringify(result);
//         console.log('>> string: ', catl);
//         res.send(catl)
//     })

// })


app.post("/weekData", (req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const selectedCategory = req.body.selectedCategory;
     console.log(selectedCategory)
    db.query('SELECT * FROM categoryexpense where date between ? and ? and category = ?;',[startDate,endDate, req.body.selectedCategory],
     (err, result) => {
        if (err) throw err;
        console.log('res');
        console.log(result);
        var month = JSON.stringify(result);
        console.log('>> string: ', month);
        res.send(month)
    })
})


app.listen(8000, () => {
    console.log("running on port 8000");
})

