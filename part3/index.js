require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT;

const app = express();
app.use(cors())
app.use(express.static('dist'))
app.use(express.json());
app.use(morgan('tiny'));

morgan.token('postData', (req) => JSON.stringify(req.body));
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :postData')
);

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "4560-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
    const date = new Date();
    Person.find({}).then(persons => {
        res.send(`<h4>Phonebook has info for ${persons.length} people </h4><h4>${date}</h4>`)
    })
})

app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id).then(person => {
        if(person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        if(result) {
            console.log(result)
        } else {
            res.send(400).end()
        }
    })
    .catch (error => next(error))
  })

app.post('/api/persons', (req, res, next) => {
    const person = req.body;

      const persons = new Person ({
        name: person.name,
        number: person.number
      })

      persons.save().then(saveData => {
        console.log(saveData)
      })
      .catch(error => {
        next(error)
      })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updateNumber => res.json(updateNumber))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server running on the port ${PORT}`)
})