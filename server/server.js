const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://douze:12@pariquantitatifcluster.7lgvzom.mongodb.net/pari-quantitatif', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('On est connecté à MongoDB'))
  .catch(err => console.log(err));

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Card = mongoose.model('Card', cardSchema);

app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne en  ${PORT}`));
