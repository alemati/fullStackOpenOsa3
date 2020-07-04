const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('give password as argument')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]

const url =
    `mongodb+srv://amfullstack:${password}@cluster0.lvu9c.mongodb.net/people-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// eslint-disable-next-line no-undef
if (process.argv.length === 3) {
  Person.find({})
    .then(res => {
      console.log('phonebook:')
      res.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
    .catch(() => {
      console.log('Error')
      mongoose.connection.close()
    })
  return
}

const person = new Person({
  // eslint-disable-next-line no-undef
  name: process.argv[3],
  // eslint-disable-next-line no-undef
  number: process.argv[4],
})

person.save().then(response => {
  console.log(`Added ${response.name} number ${response.number} to the phonebook`)
  mongoose.connection.close()
})

