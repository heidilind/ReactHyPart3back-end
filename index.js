const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

morgan.token('body', function(req, res){
  return JSON.stringify(req.body) })

app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
       response.json(persons.map(Person.format))
    }).catch(error => {
	console.log(error)
   })
})

app.get('/api/info', (req, res) => {
  const time = new Date()
  Person
    .find({})
    .then(ps => {
       res.send(
	`<div>
      	  <p>puhelinluettelosta löytyi ${ps.length} henkilön tiedot</p>
          <p>${time}</p>
        </div>`)
    }).catch(error => {
	console.log(error)
   })
})


app.get('/api/persons/:id', (request, response) => {
  Person
   .findById(request.params.id)
   .then(person => {
	if (person) {
	  response.json(Person.format(person))
	} else {
	  response.status(404).end()
	}
   }).catch(error => {
	response.status(404).send({error: 'malformatted id'})
   })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updated => {
      response.json(Person.format(updated))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  Person
   .find({name: body.name})
   .then(result => {
	    if (result.length === 0) {
	      const person2 = new Person({
			    name: body.name,
			    number: body.number
		    })
	      person2
		    .save()
		    .then(r => {
			    return response.status(200).json(Person.format(person2))
		    })
        .catch(er => {
          return response.status(500).json({error: 'Failed to save person'})
        })
	    } else {
        return response.status(409).json({ error: 'name already exists' })
	    }
    }).catch(er => {
      return response.status(500).json( { error: ' ' + er })  
    })

})


app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(person => {
      console.log('deletin id', person.id)
      console.log('deleting name', person.name)
      response.json(Person.format(person))
    }).catch(error => {
	response.status(400).send({error: 'malformatted id'})
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})










