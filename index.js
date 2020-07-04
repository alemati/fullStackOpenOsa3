require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())
morgan.token('body', (req) => JSON.stringify(req.body))
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))


app.get('/api/info', (req, res) => {
  // var pers = Person.find({})
  const lenght = 111
  const date = new Date()
  res.send('<h4>Phonebook has info for ' + lenght + ' people!</h4>  ' + date)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || body.name === '') {
    return response.status(403).json({
      error: 'invalid name (either null or empty string was received)'
    })
  }
  if (!body.number || body.number === '') {
    return response.status(403).json({
      error: 'invalid number (either null or empty number was received)'
    })
  }

  const np = new Person({
    name: body.name,
    number: body.number || '',
    // id: generateId(),
  })

  Person
    .findOne({ name: body.name })
    .then(result => {
      if (result) {
        return response.status(405).json({ error: 'name already added to phonebook' })
      } else {
        np.save()
          .then(savedP => {
            response.json(savedP)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))

  // np.save()
  //     .then(savedP => {
  //         response.json(savedP)
  //     })
  //     .catch(error => next(error))
})

// const generateId = () => {
//     min = Math.ceil(1)
//     max = Math.floor(10000)
//     return Math.floor(Math.random() * (max - min)) + min
// }

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(p => {
      if (p) {
        response.json(p)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const p = {
    name: body.name,
    number: body.number || '',
  }

  Person.findByIdAndUpdate(request.params.id, p, { new: true })
    .then(updatedP => {
      response.json(updatedP)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.statu(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})