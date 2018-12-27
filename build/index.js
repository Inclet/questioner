const express = require('express');

const app = express();

const port = 5000;

app.get('/cj', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example listening on port ${port}!`));