const randomBtn = document.getElementById('randomBtn');
randomBtn.addEventListener('click', randomDrinkFetcher);
const randomDrinkContent = document.getElementById('randomDrinkContent');

async function randomDrinkFetcher() {

    const response = await fetch('/api/drink/random');
    const data = await response.json();
      
    randomDrinkContent.innerHTML = '';

    const drinkName = document.createElement('h2');
    drinkName.textContent = data.name;
    randomDrinkContent.appendChild(drinkName);

}
