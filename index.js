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

app.get('/students', async (req, res) => {
    try {
        // SELECT * FROM students;
        const students = await knex('students').select(); // knex.select().from('students');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json(error);
    }
}); // Liste
app.get('/students/:id', async (req, res) => {
    try {
        // SELECT * FROM students WHERE id=:id
        const students = await knex('students')
            .where({
                id: req.params.id,
            })
            .select();

        if (students.length === 0) {
            return res.status(404).json();
        }

        return res.status(200).json(students[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}); // Détail d'un étudiant
app.post('/students', async (req, res) => {
    try {
        const id = await knex('students').returning('id').insert(req.body);
        const students = await knex('students').where({ id: id[0] }).select();
        res.status(201).json(students[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}); // Création d'un étudiant
app.patch('/students/:id', async (req, res) => {
    try {
        const nbrRecords = await knex('students')
            .where({ id: req.params.id })
            .update(req.body);
        if (nbrRecords === 0) {
            return res.status(404).json();
        }
        const updatedStudents = await knex('students')
            .where({ id: req.params.id })
            .select();
        return res.status(200).json(updatedStudents[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}); // Mise à jour d'un étudiant
app.delete('/students/:id', async (req, res) => {
    try {
        const nbrRecords = await knex('students')
            .where({ id: req.params.id })
            .del();
        if (nbrRecords === 0) {
            return res.status(404).json();
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json(error);
    }
}); // Suppression d'un étudiant

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
