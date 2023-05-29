
const form = document.getElementById('taskForm');
const tasklistElem = document.querySelector('#taskList');
const wardrobeElem = document.querySelector('#wardrobeList');

form.addEventListener('submit', function(event) {
    //Block default submission behaviour
    event.preventDefault();

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
})

function displayTask(task) {
    let item = document.createElement('li');

    // TODO: DON'T KNOW WHERE TO PUT THIS!! or should I use another method? For displaying purposes
   /* let starComfort = task.comfortRate;
        var starsComfort;
        switch (starComfort) {
        case "1" :
        starsComfort = "★";
        ;
        case "2" :
        starsComfort = "★★";
        ;
        case "3" :
        starsComfort = "★★★";
        ;
        case "4" :
        starsComfort = "★★★★";
        ;
        case "5" :
        starsComfort = "★★★★★";
        ;
        default :
        alert("No rating available");
        ;
        }
        console.log(starsComfort);
        break */

    item.setAttribute('data-id', task.id);
    item.innerHTML = `
        <div class="card">
            <div class="row">
                <div class="col-9 column-spacing">
                    <h3> ${task.brand} </h3>
                    <p> ${task.name} </p>
                    <p class="wearcount"> Wears ${task.wearCount} </p>
                    <p> ${task.comfortRate} </p>
                </div>
                <div class="col-3 column-spacing">
                    <img src="img-dest" class="img-dest" alt="Image of garment" /> 
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button onclick="wearCounter()" type="button" class="addWear-btn">ADD WEAR +</button>
                </div>
            </div>
        </div>
    `; // TODO: Need to generate unique ID for the wearCount ^
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

function displayWardrobe(task) {
    let wardrobeItem = document.createElement('li');
    wardrobeItem.setAttribute('data-id', task.id);
    wardrobeItem.innerHTML = `
        <div class="card">
            <div class="row">
                <div class="col-9 column-spacing">
                    <h3> ${task.brand} </h3>
                    <p> ${task.name} </p>
                    <p id="wearcount"> Wears ${task.wearCount} </p>
                    <p> ${task.comfortRate} </p>
                </div>
                <div class="col-3 column-spacing">
                    <img id="img-dest" class="img-dest" alt="Image of garment"></img>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button onclick="wearCounter()" type="button" class="addWear-btn">ADD WEAR +</button>
                </div>
            </div>
        </div>
    `;
    wardrobeElem.appendChild(wardrobeItem);

}


/*TODO: Images not showing up on item card display.
        base64 is logging in console
        Error msg: */
// Get the image input and destination elements
const imgInput = document.getElementById("taskImage");
const imgDest = document.getElementById("img-dest");

// Add a 'change' event listener to the image input element
imgInput.addEventListener("change", function (event) {
  // Create a new FileReader instance
  var reader = new FileReader();

  // Get the first selected file from the input event (the image)
  var selectedFile = event.target.files[0];

  // Set up the FileReader's 'onloadend' event handler
  reader.onloadend = function (e) {
    // Get the base64 representation of the image from the event target result
    var base64 = e.target.result;
    
    // Log the base64 data to the console
    console.log(base64);
    
    // Store the base64 image data in localStorage with the key 'imgData'
    localStorage.setItem("imgData", base64);
    
    // Set the destination element's src attribute to the base64 data to display the uploaded image
    imgDest.src = base64;
  };

  // Read the uploaded image as a Data URL (Base64 encoded string)
  reader.readAsDataURL(selectedFile);
});


// TODO: Only storing once in localStorage. All buttons for new items only add to first wearCount
function wearCounter() {
    if (localStorage.wearcount) {
      localStorage.wearcount = Number(localStorage.wearcount)+1;
    } else {
      localStorage.wearcount = 1;
    }
    document.querySelector("#wearcount").innerHTML = "Wears " + localStorage.wearcount;
  }

  //TODO: How does local storage work with this code?
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
        image: image
    }

    taskList.push(task);
    displayTask(task);
    displayWardrobe(task);
}

addTask("Flower dress", "H&M", "AU 6", "Pink", "Cotton", "Cotton", "69.99","Summer", 3, 4, "image.png", "Dresses");
console.log(taskList);


/*Modal pop-up showing and hiding*/
const main = document.querySelector('main'),
    showBtn = document.querySelector('.show-modal'),
    closeBtn = document.querySelector('.close-btn');

showBtn.addEventListener('click', () => main.classList.add("active"));
closeBtn.addEventListener('click', () => main.classList.remove("active"));