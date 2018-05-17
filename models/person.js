const mongoose = require('mongoose')
const url = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

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

