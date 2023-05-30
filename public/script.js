
const form = document.getElementById('taskForm');
const tasklistElem = document.querySelector('#taskList');
const wardrobeElem = document.querySelector('#wardrobeList');
const itemElem = document.querySelector('#itemList');
const successMessage = document.querySelector('#successfulAdd');

form.addEventListener('submit', function(event) {
    //Block default submission behaviour
    event.preventDefault();
    successMessage.classList.add('show');
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
        /*switch (task.comfortRate) {
        case "1" :
            return "★";
        ;
        case "2" :
            return "★★";
        ;
        case "3" :
            return "★★★";
        ;
        case "4" :
            return "★★★★";
        ;
        case "5" :
            return "★★★★★";
        ;
        default :
            return "No rating available";
        ;
        }
        console.log(task.comfortRate);*/

    /*let comfortRating = document.getElementById('comfortStar');
        if (comfortRating == 1) {
            comfortRating.innerHTML = "★";
        } else if (comfortRating == 2) {
            comfortRating.innerHTML = "★★";
        } else if (comfortRating == 3) {
            comfortRating.innerHTML = "★★★";
        } else if (comfortRating == 4) {
            comfortRating.innerHTML = "★★★★";
        } else if (comfortRating == 5) {
            comfortRating.innerHTML = "★★★★★";
        } else {
            comfortRating.innerHTML = "No rating available.";
        };*/ 

    item.setAttribute('data-id', task.id);
    item.innerHTML = `
        <div class="card">
            <div class="row">
                <div class="col-8 column-spacing">
                    <h3> ${task.brand} </h3>
                    <p> ${task.name} </p>
                    <p id="wearcount"> Wears ${task.wearCount} </p>
                    <p id="comfortStar"> ${task.comfortRate} </p>
                </div>
                <div class="col-4 column-spacing">
                    <img src="img-dest" class="img-dest" alt="Image of ${task.name}" /> 
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

}

function displayWardrobe(task) {
    let wardrobeItem = document.createElement('li');
    wardrobeItem.setAttribute('data-id', task.id);
    wardrobeItem.innerHTML = `
        <div class="card">
            <div class="row">
                <div class="col-8 column-spacing">
                    <h3> ${task.brand} </h3>
                    <p> ${task.name} </p>
                    <p id="wearcount"> Wears ${task.wearCount} </p>
                    <p> ${task.comfortRate} </p>
                </div>
                <div class="col-4 column-spacing">
                    <img id="img-dest" class="img-dest" alt="Image of ${task.name}"></img>
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

function displayItem(task) {
    let itemDetails = document.createElement('li');
    itemDetails.setAttribute('data-id', task.id);
    itemDetails.innerHTML = `
        <div class="row">
            <div class="col-7 column-spacing">
                <h2> ${task.name} </h2>
                <p id="wearcount" class="itemWears"> Wears: ${task.wearCount} </p>
                <p> Brand: ${task.brand} </p>
                <p> Size: ${task.size} </p>
                <p> Colour: ${task.colour} </p>
                <p> Material 1: ${task.materialOne} </p>
                <p> Material 2: ${task.materialTwo} </p>
                <p> Cost: $${task.cost} </p>
                <p> Season: ${task.season} </p>
                <p> Comfort Rating: ${task.comfortRate} </p>
                <p> Fit Rating: ${task.fitRate} </p>
            </div>
            <div class="col-5 column-spacing">
                <img src="img-dest" class="img-dest" alt="Image of ${task.name}" /> 
            </div>
        </div>
    `;
    itemElem.appendChild(itemDetails);

    //TODO: Only deleting detailed item not from category or wardrobe list
    let delButton = document.createElement('button');
    let delButtonText = document.createTextNode('Delete');
    delButton.setAttribute('class', 'deleteButton');
    delButton.appendChild(delButtonText);
    itemDetails.appendChild(delButton);

    delButton.addEventListener('click', function(event) {
        itemDetails.remove();
        taskList.forEach(function(taskArrayElement, taskArrayIndex) {
            if (taskArrayElement.id == item.getAttribute('data-id')) {
                taskList.splice(taskArrayIndex, 1);
            }
        })
    })

}


/*TODO: Images not showing up on item card display.
        base64 is logging in console
        Uncaught TypeError: Cannot set properties of null (setting 'src') at reader.onloadend (script.js:149:16)*/


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


  //Showing and hiding different elements
const myElement = document.getElementById("taskForm");
const showButton = document.getElementById("showElement");
const hideButton = document.getElementById("hideElement");

function showElement() {
  myElement.classList.remove("hidden");
}

function hideElement() {
  myElement.classList.add("hidden");
}

// Attach event listeners
showButton.addEventListener("click", showElement);
hideButton.addEventListener("click", hideElement);

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
        image: image,
        category: category
    }

    taskList.push(task);
    displayTask(task);
    displayWardrobe(task);
    displayItem(task);
}

addTask("Flower dress", "H&M", "AU 6", "Pink", "Cotton", "Cotton", "69.99","Summer", 3, 4, "./Images/Asset 1.svg", "Dresses");
console.log(taskList);


/*Modal pop-up showing and hiding*/
const main = document.querySelector('main'),
    showBtn = document.querySelector('.show-modal'),
    closeBtn = document.querySelector('.close-btn');

showBtn.addEventListener('click', () => main.classList.add("active"));
closeBtn.addEventListener('click', () => 
//TODO: How can I remove success message at same time as closing the modal?? successMessage.classList.remove("show"),
main.classList.remove("active")
);
