const express = require(`express`)

const port = 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const tasklist = [
    { 
        id: 0,
        title: 'todo1',
        createdDate:"16.6.2023",
        executionDate:"13.2" 
    }
];

app.get(`/tasks`, (request, response) =>{
    response.status(200).json(tasklist)
})

app.post(`/tasks`, (request, response) =>{
    const newTask = request.body;
    tasklist.push(newTask);
    const newTaskId = tasklist.lastIndexOf(tasklist)
    response.status(201).json(tasklist).send(newTaskId);
})

app.get(`/tasks/:id`, (request, response) =>{
    const id = parseInt(request.params.id)
    const index = tasklist.find( t => t.id === id)
    if(index){
        response.status(200).json(index)
    } else{
        response.sendStatus(404)
    }
})

app.listen(port, ()=>{
    console.log(`${port} is connected SUCCESFULLY`)
})