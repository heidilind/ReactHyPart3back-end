const mongoose = require('mongoose')

const url = 'mongodb://fullstackheidi:salasana@ds117730.mlab.com:17730/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Note', {
  name: String,
  number: String
})

const person = new Person({
  name: 'empty',
  number: 0
})

process.argv.forEach((val, index) => {
  if (index === 2) {
	person.name = val
  }
  if (index === 3) {
	person.number = val
  }  
})

person.name === 'empty' ?
Person
  .find({})
  .then(result => {
    console.log('puhelinluettelo')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  }) :
person
  .save()
  .then(response => {
    console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)	
    mongoose.connection.close()
    })	





