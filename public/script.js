const main = document.querySelector('main'),
    showBtn = document.querySelector('.show-modal'),
    closeBtn = document.querySelector('.close-btn');

showBtn.addEventListener('click', () => main.classList.add("active"));
closeBtn.addEventListener('click', () => main.classList.remove("active"));

var taskList = [];

function addTask(name, category, image, brand, size, colour, materialOne, materialTwo, cost, season, comfortRate, fitRate) {
    let task = {
        name: name,
        category: category,
        image: image,
        id: Date.now(),
        date: new Date().toISOString(),
        brand: brand,
        size: size,
        colour: colour,
        materialOne: materialOne,
        materialTwo: materialTwo,
        cost: cost,
        season: season,
        comfortRate: comfortRate,
        fitRate: fitRate,
        wearCount: []
    }

    taskList.push(task);
}

addTask("Flower dress", "Dresses", "#", "H&M", "AU 8", "Pink", "Cotton", null, "69.99", "Spring", 3, 4);
console.log(taskList);