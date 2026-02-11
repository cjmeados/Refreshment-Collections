const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
    res.json({message: 'Backend is working.'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/drink/random', async (req, res) => {

    const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

    try {
        
        const response = await fetch(url);
        const data = await response.json();

        const drinks = data.drinks;

        console.log("All drinks:", drinks); // debug

        const payload = {
            name: drinks[0].strDrink
        };

        res.status(200).json(payload);

    } catch (err) {
        res.status(500).json({error: "Could not fetch database."});
    }

});