const express = require(`express`)
const session = require(`express-session`)

const port = 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: "supersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

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
    response.status(201).json(tasklist);
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

app.put(`/tasks/:id`, (request, response) =>{
    const id = request.params.id
    if(tasklist[id]){
    tasklist[id] = {
      ...tasklist[id],
      ... request.body
    }
     response.status(200).json(tasklist[id])
    } else{
        response.sendStatus(404)
    }
})

app.delete("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    if (id >= 0 && id < tasklist.length) {
      tasklist.splice(id, 1);
      response.sendStatus(204)
    } else {
      response.sendStatus(404);
    }
});


const password = "m295"
app.post('/login', (request, response) => {
  if(request.body.password !== password || !request.body.email.includes('@')) {
    return response.status(401).send('Email or password incorrect')
  }
    request.session.email = request.body.email 
    response.status(200)
    response.send('Your logged in')

})

app.get('/verify', (request, response) => {
    if (!request.session.email) {
      return response.status(401).send('failed')
    }
    response.status(200).send('verified')
})

app.delete('/logout', (request, response) => {
    request.session.destroy()
    response.status(204)
})

app.listen(port, ()=>{
    console.log(`${port} is connected SUCCESFULLY`)
})