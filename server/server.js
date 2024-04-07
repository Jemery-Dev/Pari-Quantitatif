const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Card = require('./cardModel');
const carteSchema = require('./cardModel');

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

app.post('/cards', async (req, res) => {
  const { nom, cartes } = req.body;

  try {
    const newCategory = new Card({ nom, cartes });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/cards/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Card.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'La catégorie n\'existe pas.' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/cards/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    await Card.findByIdAndDelete(categoryId);
    res.status(200).json({ message: 'La catégorie a été supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/cards/:id/cartes', async(req, res) => {
  const categorieId = req.params.id;

  try{
    const categorie = await Card.findById(categorieId);
    if(!categorie){
      return res.status(404).json({message: 'la catégorie n\existe pas.'});
    }
    res.status(200).json(categorie.cartes);
  } catch(err){
    res.status(500).json({message: err.message})
  }
});

app.post('/cards/:id/cartes', async(req, res) => {
  const categorieId = req.params.id;
  const {theme, questions} = req.body;

  try{
    const categorie = await Card.findById(categorieId);
    if(!categorie){
      return res.status(404).json({message: "la categorie n'existe pas"});
    }
    categorie.cartes.push({theme, questions});
    await categorie.save();

    res.status(201).json(categorie);
  } catch(err){
    res.status(500).json({message: err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne en ${PORT}`));
