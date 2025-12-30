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

    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    try {
        
        const response = await fetch(url);
        const data = await response.json();
        
        const drink = data.drinks[0];

        const ingredientsAndProportions = [];
        for (let i = 1; i <= 15; i++) {
            if (drink["strIngredient" + i]) {
                ingredientsAndProportions.push({
                    ingredient: drink["strIngredient" + i],
                    measure: drink["strMeasure" + i] || ""
                });
            }
        }

        const payload = {
            name: drink.strDrink,
            alcoholic: drink.strAlcoholic,
            glass: drink.strGlass,
            instructions: drink.strInstructions,
            thumbnail: drink.strDrinkThumb,
            ingredientsAndProportions: ingredientsAndProportions
        }

        res.status(200).json(payload);

    } catch (err) {
        res.status(500).json({error: "Could not fetch drink."});
    }

});