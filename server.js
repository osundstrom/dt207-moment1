


const express = require("express");

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