const mongoose = require('mongoose')
const url = 'mongodb://fullstackheidi:salasana@ds117730.mlab.com:17730/puhelinluettelo'

mongoose.connect(url)

const personSchema = new mongoose.Schema({name: String, number: String})

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person.id
  }
}

const Person = mongoose.model('Person', personSchema)
module.exports = Person

