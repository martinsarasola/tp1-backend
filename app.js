const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());


const stars = [
  {
    id: 1,
    name: "Sirius",
    type: "Estrella binaria, Secuencia Principal (tipo A1V)",
    distancia: "8.6 años luz",
    mass: "2.02 masas solares",
    radius: "1.711 radios solares",
    temperature: "9,940 K",
    luminosity: "25.4 luminosidades solares",
    age: "200-300 millones de años",
    composition: {
      hydrogen: "71%",
      helium: "27%",
      otros_elementos: "2%"
    },
    stellar_history: "Sirius es una de las estrellas más brillantes en el cielo nocturno y es una estrella binaria compuesta por Sirius A y Sirius B. Es una estrella blanca de la secuencia principal que ha consumido la mayor parte de su hidrógeno y se encuentra en una etapa avanzada de su vida."
  }
];


const starSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  distancia: Joi.string().required(),
  mass: Joi.string().required(),
  radius: Joi.string().required(),
  temperature: Joi.string().required(),
  luminosity: Joi.string().required(),
  age: Joi.string().required(),
  composition: Joi.object({
    hydrogen: Joi.string().required(),
    helium: Joi.string().required(),
    otros_elementos: Joi.string().required()
  }).required(),
  stellar_history: Joi.string().required()
});

app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor de estrellas!');
  });  


app.get('/stars', (req, res) => {
  const { name } = req.query;
  if (name) {
    const filteredStars = stars.filter(star => star.name.toLowerCase() === name.toLowerCase());
    res.json(filteredStars);
  } else {
    res.json(stars);
  }
});


app.post('/stars', (req, res) => {
  const newStar = req.body;

  const { error } = starSchema.validate(newStar);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    stars.push(newStar);
    res.status(201).json(newStar);
  }
});


app.get('/stars/:id', (req, res) => {
  const starId = parseInt(req.params.id);
  const star = stars.find(star => star.id === starId);

  if (star) {
    res.json(star);
  } else {
    res.status(404).json({ error: 'Estrella no encontrada' });
  }
});
  

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
