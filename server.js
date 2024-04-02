

//Express och sql
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");


//Connect.
const connection = mysql.createConnection({
    host: "localhost",
    user: "ogge",
    password: "pass",
    database: "ogge"
});

//Error eller success om connect eller inte
connection.connect((err) => {
    if (err) {
        console.error("failed connection " + err);
        return;
    }
    console.log("Success connection")
});


//SQL


connection.query("DROP TABLE IF EXISTS kurser;", (err, info) => {
    if(err) throw err;
    console.log("Table deleted " + info);
});


connection.query(`CREATE TABLE kurser (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    coursename VARCHAR(200),
    coursecode VARCHAR(200),
    syllabus VARCHAR(200),
    progression VARCHAR(1))` , (err, table) => {
        if(err) throw err;

        console.log("Table created " + table);
    });


    //Insert nytt
connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Backend-baserad webbutveckling", "DT207G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/", "B"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    console.table( results );
});



//---------------------------------------------------------------//
const app = express();
app.use(express.json());
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //View engine ejs (html typ)
app.use(express.static("public")); //Statiska filer (css typ)

app.post("/addCourse", (request, response) => {
    
    const coursename = request.body.coursename;
    const coursecode = request.body.coursecode;
    const syllabus = request.body.syllabus;
    const progression = request.body.progression;

    
   if (coursename != "" && coursecode != "" && syllabus != "" && progression != "") {
    connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", 
    [coursename, coursecode, syllabus, progression], (err) => {
        if (err) {
            console.log("Failed insert " + err);
            return; 
        }
        

        app.get("/addCourse", (request, response) => {
            connection.query("SELECT * FROM kurser", (rows) => {
                response.render("addCourse", {courses: rows});
                console.log(connection.query)
            });
})})}});





//Route

app.get("/", (request, response) => {
    response.render("index");

});

app.get("/addCourse", (request, response) => {
    connection.query("SELECT * FROM kurser", (err, rows) => {
        if (err) {
            console.log("failed: " + err );
        }
        response.render("addCourse", {courses: rows});
        console.log(rows);
    });


});

app.get("/about", (request, response) => {
    response.render("about");

});


//Starta
app.listen(port, () => {
    console.log("Server started on: " + port)
});

