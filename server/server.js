const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Card = require('./cardModel');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://douze:12@pariquantitatifcluster.7lgvzom.mongodb.net/')

  .then(() => console.log('On est connecté à MongoDB'))
  .catch(err => console.log(err));

app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/cards', async (req,res) => {
  const { nom, cartes } = req.body;

  try {
    const newCategory = new Card({ nom, cartes });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne en  ${PORT}`));
