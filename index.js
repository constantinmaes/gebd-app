const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'gebd-app',
    },
});

app.get('/students', (req, res) => {}); // Liste
app.get('/students/:id', (req, res) => {}); // Détail d'un étudiant
app.post('/students', (req, res) => {}); // Création d'un étudiant
app.patch('/students/:id', (req, res) => {}); // Mise à jour d'un étudiant
app.delete('/students/:id', (req, res) => {}); // Suppression d'un étudiant

app.get('/appointments', (req, res) => {}); // Liste
app.get('/appointments/:id', (req, res) => {}); // Détail d'un rendez-vous
app.post('/appointments', (req, res) => {}); // Création d'un rendez-vous
app.patch('/appointments/:id', (req, res) => {}); // Mise à jour d'un rendez-vous
app.delete('/appointments/:id', (req, res) => {}); // Suppression d'un rendez-vous

app.listen(3000, () => {
    console.log('SERVER is running on port 3000');
    knex.raw('SELECT 1;')
        .then(() => {
            console.log('Database connection successful');
        })
        .catch((err) => {
            console.error('Database connection failed:', err);
        });
});
