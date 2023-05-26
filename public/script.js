
const form = document.getElementById('taskForm');
const tasklistElem = document.querySelector('#taskList');

form.addEventListener('submit', function(event) {
    //Block default submission behaviour
    event.preventDefault();
    //console.log(form.elements.taskName.value)
    addTask(
        form.elements.taskName.value, 
        form.elements.taskBrand.value,
        form.elements.taskSize.value,
        form.elements.taskColour.value,
        form.elements.taskMaterialOne.value,
        form.elements.taskMaterialTwo.value,
        form.elements.taskCost.value,
        form.elements.taskSeason.value,
        form.elements.taskComfort.value,
        form.elements.taskFit.value,
        form.elements.taskImage.value
    )
    //console.log(taskList);
})

function displayTask(task) {
    let item = document.createElement('li');
    item.setAttribute('data-id', task.id);
    item.innerHTML = `
        <div class="card">
            <div class="row">
                <div class="col-9 column-spacing">
                    <h3> ${task.brand} </h3>
                    <p> ${task.name} </p>
                    <p> ${task.wearCount} </p>
                    <p> ${task.comfortRate} </p>
                </div>
                <div class="col-3 column-spacing">
                    <img src="${task.image}" alt="Image of garment" />
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <a href="#"><p class="addWear-btn">ADD WEAR +</p></a>
                </div>
            </div>
        </div>
    `;
    tasklistElem.appendChild(item);
    form.reset();

    let delButton = document.createElement('button');
    let delButtonText = document.createTextNode('Delete');
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    delButton.addEventListener('click', function(event) {
        item.remove();
        taskList.forEach(function(taskArrayElement, taskArrayIndex) {
            if (taskArrayElement.id == item.getAttribute('data-id')) {
                taskList.splice(taskArrayIndex, 1);
            }
        })
    })

}

var taskList = [];

function addTask(name,  brand, size, colour, materialOne, materialTwo, cost, season, comfortRate, fitRate, image, category) {
    let task = {
        name: name,
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
        image: image,
        wearCount: [],
        category: category
    }

    taskList.push(task);
    displayTask(task);
}

addTask("Flower dress", "H&M", "AU 6", "Pink", "Cotton", "Cotton", "69.99","Summer", 3, 4, "image.png", "Dresses");
console.log(taskList);


/*Modal pop-up showing and hiding*/
const main = document.querySelector('main'),
    showBtn = document.querySelector('.show-modal'),
    closeBtn = document.querySelector('.close-btn');

showBtn.addEventListener('click', () => main.classList.add("active"));
closeBtn.addEventListener('click', () => main.classList.remove("active"));