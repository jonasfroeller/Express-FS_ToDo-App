// A simple Express app with
// -> static fileserving (using middleware)
// -> JSON API: serve tasks via GET
// -> JSON API: add new tasks via POST

// IMPORTS
const express = require('express');
const fs = require("fs");

// INIT express app
const app = express();
const port = 3000;

// INIT Data
const jsonpath = "./src/mytodos.json";

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/index', (req, res) => {
    let answer = JSON.stringify(ToDoList.list);
    res.send(answer);
});

app.post('/index', (req, res) => {
    let patt1 = /[A-z]/; ///^([A-z.,!]+\s*)+$/
    let patt2 = /^[A-z]{3,15}$/;
    let patt3 = /^\d\d\.\d\d\.(\d\d)*(\d\d)*$/;

    if (patt1.test(req.body.task) && patt2.test(req.body.day) && patt3.test(req.body.date)) {
        let task = req.body.task;
        let day = req.body.day;
        let date = req.body.date;

        ToDoList.addTask(task, day, date);
        console.log(task, day, date);
        console.log("---------");

        // Save Data
        fs.writeFile(jsonpath, JSON.stringify(ToDoList, null, 2), 'utf8', (error) => {
            if (error) throw error;
            console.log("*data has been saved*");
        })

        // feedback
        let answer = { text: 'The new task has been added succsessfully.' };
        res.send(answer);
    } else {
        // feedback
        let answer = { text: "Input didn't match the pattern!" };
        res.send(answer);
    }
});

// START SERVER
app.listen(port, () => {
    console.log('*************************************')
    console.log('Express server app started.')
    console.log(`Server listening on port ${port}!`);
    console.log('*************************************')
});

/**
 *  Simple class to manage a ToDo list
 */
class ToDo {
    /**
     * inits an empty ToDo list
     */
    constructor() {
        this.list = new Array();
    }
    /**
     * 
     * @param {String} t - The task
     * @param {String} dy - Day (Monday, Tuesday, ...)
     * @param {String} dt - Date (16.03.2022)
     */
    addTask(t, dy, dt) {
        let newTask = {
            task: t,
            day: dy,
            date: dt
        };

        this.list.push(newTask);
    }
}

let ToDoList = new ToDo();
ToDoList.addTask("MEDT Highscore", "Donnerstag", "10.03.2022");
ToDoList.addTask("MEDT Projekt", "Donnerstag", "17.03.2022");
ToDoList.addTask("SYT HÜ", "Mittwoch", "30.03.2022");
ToDoList.addTask("English", "Dienstag", "07.05.2022");
ToDoList.addTask("Mathe", "Montag", "01.01.2023");

if (fs.existsSync(jsonpath)) {
    fs.readFile(jsonpath, 'utf8', (error, data_String) => {
        if (error) throw error;
        let data = JSON.parse(data_String);

        for (let i = 0; i < data.list.length; i++) {
            ToDoList.addTask(data.list[i].task, data.list[i].day, data.list[i].date);
        }
        console.log("*data has been recovered*");
    });
}