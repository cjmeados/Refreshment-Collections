const randomBtn = document.getElementById('randomBtn');
randomBtn.addEventListener('click', randomDrinkFetcher);
const randomDrinkContent = document.getElementById('randomDrinkContent');

async function randomDrinkFetcher() {

    const response = await fetch('/api/drink/random');
    const data = await response.json();
      
    randomDrinkContent.innerHTML = '';

    const drinkName = document.createElement('h2');
    const glassDrinkGoesIn = document.createElement('h3');
    const instructions = document.createElement('p');
    

    let amountOfIngredients = data.ingredients.length;
    let amountOfMeasures = data.measures.length;

    instructions.textContent = data.instructions;
    glassDrinkGoesIn.textContent = data.glass;
    drinkName.textContent = data.name;

    randomDrinkContent.appendChild(drinkName);
    randomDrinkContent.appendChild(glassDrinkGoesIn);
    randomDrinkContent.appendChild(instructions);

}


