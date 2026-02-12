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

        const lengthOfList = drinks.length;

        const i = Math.floor(Math.random() * (lengthOfList));

        const firstPayload = {
            id: drinks[i].idDrink
        };

        const urlForSpecificDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${firstPayload.id}`;

        const response2 = await fetch(urlForSpecificDrink);
        const dataOfSpecificDrink = await response2.json();

        const specificDrink = dataOfSpecificDrink.drinks[0];

        const payload = {
            name: specificDrink.strDrink
        }


        res.status(200).json(payload);

    } catch (err) {
        res.status(500).json({error: "Could not fetch database."});
    }

});


// currently it fetches the first drink from na drinks. 
// I could fetch na drinks, then length of drinks, 
// then a random one from it.
// once a random one is grabbed, I could hit that api ID link

// then parse
// then put on front end
// then style