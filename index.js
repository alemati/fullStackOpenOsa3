const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(bodyParser.json())
morgan.token('body', (req) => JSON.stringify(req.body))
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/api/info', (req, res) => {
    const lenght = persons.length
    const date = new Date()
    res.send('<h4>Phonebook has info for ' + lenght + ' people!</h4>  ' + date)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || body.name === "") {
        return response.status(403).json({
            error: 'invalid name (either null or empty string was received)'
        })
    }
    if (!body.number || body.number === "") {
        return response.status(403).json({
            error: 'invalid number (either null or empty number was received)'
        })
    }
    const p = persons.find(person => person.name === body.name)
    if (p) {
        return response.status(403).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number || "",
        id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
})

const generateId = () => {
    min = Math.ceil(1);
    max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// let notes = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         date: "2020-01-10T17:30:31.098Z",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only Javascript",
//         date: "2020-01-10T18:39:34.091Z",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         date: "2020-01-10T19:20:14.298Z",
//         important: true
//     }
// ]

// app.get('/api/notes', (req, res) => {
//     res.json(notes)
// })

// app.get('/', (req, res) => {
//     res.send('<h2>Hello there!</h2>')
// })

// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(note => note.id === id)

//     if (note) {
//         response.json(note)
//     } else {
//         response.status(404).end()
//     }
// })

// app.post('/api/notes', (request, response) => {
//     const body = request.body

//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing' 
//       })
//     }

//     const note = {
//       content: body.content,
//       important: body.important || false,
//       date: new Date(),
//       id: generateId(),
//     }

//     notes = notes.concat(note)

//     response.json(note)
//   })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)

//     response.status(204).end()
// })

// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//     return maxId + 1
// }

// const PORT = 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })