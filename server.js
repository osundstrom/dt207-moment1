

//Express och sql
const express = require("express");

const mysql = require("mysql");

//Connect
const connection = mysql.createConnection({
    host: "localhost",
    user: "OSund",
    password: "password",
    database: "OSund"
});

//Error eller success om connect eller inte
connection.connect((err) => {
    if (err) {
        console.error("failed connection " + err);
        return;
    }
    console.log("Success connection")
});




//---------------------------------------------------------------//
const app = express();
const port = 3000;

app.set("view engine", "ejs"); //View engine ejs (html typ)
app.use(express.static("public")); //Statiska filer (css typ)


//Route

app.get("/", (request, response) => {
    response.render("index");

});

app.get("/addCourse", (request, response) => {
    response.render("addCourse");

});

app.get("/about", (request, response) => {
    response.render("about");

});


//Starta
app.listen(port, () => {
    console.log("Server started")
});



