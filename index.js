const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Hello World');
    res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
    console.log('SERVER is running on port 3000');
});
