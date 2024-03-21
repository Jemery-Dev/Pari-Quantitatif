const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  niveau: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  reponse: {
    type: String,
    required: true
  }
});

const carteSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});

const categorieSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  cartes: [carteSchema]
});

const Card = mongoose.model('Card', categorieSchema);

module.exports = Card;
