const express = require('express')
const session = require('express-session')

const port = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

const isAuthorized = (req, res, next) => {
  if (!req.session.email) {
    return res.sendStatus(401)
  }
  next()
}

const tasklist = [
  {
    id: 0,
    title: 'todo1',
    createdDate: '16.6.2023',
    executionDate: '13.2'
  }
]

app.get('/tasks', isAuthorized, (request, response) => {
  response.setHeader('Content-Type', 'application/json')
  response.status(200).json(tasklist)
})

app.post('/tasks', isAuthorized, (request, response) => {
  const newTask = request.body
  tasklist.push(newTask)
  response.status(201).json(tasklist)
})

app.get('/tasks/:id', isAuthorized, (request, response) => {
  const id = parseInt(request.params.id)
  const index = tasklist.findIndex(t => t.id === id)
  if (index !== -1) {
    response.status(200).json(tasklist[index])
  } else {
    response.sendStatus(404)
  }
})

app.put('/tasks/:id', isAuthorized, (request, response) => {
  const id = request.params.id
  if (tasklist[id]) {
    tasklist[id] = {
      ...tasklist[id],
      ...request.body
    }
    response.status(200).json(tasklist[id])
  } else {
    response.sendStatus(404)
  }
})

app.delete('/tasks/:id', isAuthorized, (request, response) => {
  const id = parseInt(request.params.id)
  if (id >= 0 && id < tasklist.length) {
    tasklist.splice(id, 1)
    response.sendStatus(204)
  } else {
    response.sendStatus(404)
  }
})

const password = 'm295'
app.post('/login', (request, response) => {
  if (request.body.password !== password || !request.body.email.includes('@')) {
    return response.status(401).send('Email or password incorrect')
  }
  request.session.email = request.body.email
  response.status(200)
  response.send('Your logged in')
})

app.get('/verify', (request, response) => {
  if (!request.session.email) {
    return response.status(401).send('not loged in')
  }
  response.status(200).send('verified')
})

app.delete('/logout', (request, response) => {
  request.session.destroy()
  response.sendStatus(204)
})

app.use((req, res) => {
  res.sendStatus(404)
}) // diese funktion wurde von Chatgpt korrigiert

app.listen(port, () => {
  console.log(`${port} is connected SUCCESFULLY`)
})
