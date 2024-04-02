

//Express, sql, bodyParser
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

        //console.log("Table created " + table);
    });


    //Insert nytt
connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Webbutveckling I", "DT057G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/", "A"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    console.table( results );
});

connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Introduktion till programmering i JavaScript", "DT084G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/", "A"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    //console.table( results );
});

connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Grafisk teknik för webb", "DT200G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/", "A"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    //console.table( results );
});

connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Webbanvändbarhet", "DT068G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/", "B"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    //console.table( results );
});

connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Databaser", "DT003G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/", "A"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    //console.table( results );
});

connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Frontend-baserad webbutveckling", "DT211G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/", "B"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    //console.table( results );
});

connection.query("INSERT INTO kurser(coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)", ["Backend-baserad webbutveckling (Pågående)", "DT207G", "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/", "B"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    //console.table( results );
});



//---------------------------------------------------------------//



const app = express();
app.use(express.json());
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //View engine ejs (html typ)
app.use(express.static("public")); //Statiska filer (css typ)


//Addera kurs via form 
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
        

        app.get("/index", (request, response) => {
            connection.query("SELECT * FROM kurser", (rows) => {
                response.render("addCourse", {courses: rows});
                
            });
            
})})}

response.redirect("/addCourse"); //Uppdaterar så listan uppdateras.
});




//Delete
app.post("/deleteCourse", (request, response) => {

    const id = request.body.id;


    if (id) {
        connection.query("DELETE FROM kurser WHERE id = ?", [id], (err) => {
            if (err) {
                console.error("not deleted " + err);
                return;
            }

            
            response.redirect("/");
            });
    }});




//Route

app.get("/", (request, response) => {
    connection.query("SELECT * FROM kurser", (err, rows) => {
        if (err) {
            console.log("failed: " + err );
        }
        response.render("index", {courses: rows});
        //console.log(rows);
    });

});

app.get("/addCourse", (request, response) => {
    response.render("addCourse");
    });


app.get("/about", (request, response) => {
    response.render("about");

});


//Starta
app.listen(port, () => {
    console.log("Server started on: " + port)
});

