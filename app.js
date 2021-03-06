const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express()


const items = ["Buy Food", "Cook Food","Eat Food"];
const workList = [];

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
   const day = date();
    res.render('list', { listItems: day, newListItems : items})
});


app.post("/", function(req, res) {
    const item = req.body.newItem
    if (req.body.list === "Work") {
        workList.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/")
    }
})


app.get("/work", function(req, res) {
    res.render('list', {listItems: "Work List", newListItems: workList})
})

app.get("/about", function(req, res) {
    res.render('about');
})

app.listen(3000, function() {
    console.log("Server run on Port 3000");
})