const express = require(`express`)

const port = 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const tasklist = [
    { 
        title: 'todo1',
        createdDate:"16.6.2023",
        executionDate:"13.2" 
    }
];

app.get(`/tasks`, (request, response) =>{
    response.status(200).send(tasklist + new Date())
})

app.listen(port, ()=>{
    console.log(`${port} is connected SUCCESFULLY`)
})