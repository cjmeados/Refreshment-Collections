const express = require('express');
const app = express();
const PORT = 5500;

app.use(express.json());

app.get('/test', (req, res) => {
    res.json({message: 'Backend is working.'});
});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost://${PORT}`);
});

app.get('/api/drink/random', (req, res) => {

    

});