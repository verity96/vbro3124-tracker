
const form = document.getElementById('garmentForm');
const garmentElem = document.querySelector('#garmentList');
const wardrobeElem = document.querySelector('#wardrobeList');
const itemElem = document.querySelector('#itemList');
const successMessage = document.querySelector('#successfulAdd');

//Adds item to local storage array from form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    successMessage.classList.add('show');

    let reader = new FileReader();

    // Get the first selected file from the input element
    let selectedFile = form.elements.garmentImage.files[0];

    // Set up the FileReader's 'onloadend' event handler
    reader.onloadend = function (e) {
        // Get the base64 representation of the image from the event target result
        let imgData = e.target.result;

        // Adding new item after image is read to ensure data is fully loaded
        addGarment(
            form.elements.garmentName.value,
            form.elements.garmentBrand.value,
            form.elements.garmentSize.value,
            form.elements.garmentColour.value,
            form.elements.garmentMaterialOne.value,
            form.elements.garmentMaterialTwo.value,
            form.elements.garmentCost.value,
            form.elements.garmentSeason.value,
            form.elements.garmentComfort.value,
            form.elements.garmentFit.value,
            imgData
        )
    }

    // Read the uploaded image as a Data URL (Base64 encoded string)
    reader.readAsDataURL(selectedFile);  

})

//Displaying item cards with add wear button
function displayGarment() {

    garmentElem.innerHTML = "";

    let localGarments = JSON.parse(localStorage.getItem('garments'));

    if (localGarments !== null) {

        localGarments.forEach((garment) => {

            let item = document.createElement('li');

                let comfortRating = "";
                if (garment.comfortRate == 1) {
                    comfortRating = "★";
                } else if (garment.comfortRate == 2) {
                    comfortRating = "★★";
                } else if (garment.comfortRate == 3) {
                    comfortRating = "★★★";
                } else if (garment.comfortRate == 4) {
                    comfortRating = "★★★★";
                } else if (garment.comfortRate == 5) {
                    comfortRating = "★★★★★";
                } else {
                    comfortRating = "No rating available.";
                };

            //Creates card for Home page
            item.setAttribute('data-id', garment.id);
            item.innerHTML = `
                <div class="card itemDetails">
                    <div class="row">
                        <div class="col-8 column-spacing">
                            <h3> ${garment.brand} </h3>
                            <p> ${garment.name} </p>
                            <p id="wearcount"> Wears: ${garment.wearCount} </p>
                            <p> Comfort Rating: <span style="color:#F4AFCF">${comfortRating}</span> </p>
                        </div>
                        <div class="col-4 column-spacing">
                            <img src=${garment.image} class="itemImg" alt="Image of ${garment.name}" /> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="button" class="addWear-btn">ADD WEAR +</button>
                        </div>
                    </div>
                </div>
            `; 

            //Creates card for Modal
            let itemModal = document.createElement('li');

            itemModal.setAttribute('data-id', garment.id);
            itemModal.innerHTML = `
                <div class="card itemDetails">
                    <div class="row">
                        <div class="col-8 column-spacing">
                            <h3> ${garment.brand} </h3>
                            <p> ${garment.name} </p>
                            <p id="wearcount"> Wears: ${garment.wearCount} </p>
                            <p> Comfort Rating: <span style="color:#F4AFCF">${comfortRating}</span> </p>
                        </div>
                        <div class="col-4 column-spacing">
                            <img src=${garment.image} class="itemImg" alt="Image of ${garment.name}" /> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="button" class="addWear-btn">ADD WEAR +</button>
                        </div>
                    </div>
                </div>
            `; 
            //Adds card to modal
            garmentElem.prepend(itemModal);
            //Adds card to Wardrobe home page
            wardrobeElem.prepend(item); 
            form.reset();

             // Add click event listeners to all item cards
            const itemCards = document.querySelectorAll('.card.itemDetails');
            itemCards.forEach((card) => {
                card.addEventListener('click', () => {
                    itemDisplay.classList.remove("hidden");
                    displayItem(garment.id);
                    garmentDisplay.classList.add("hidden");
                    console.log('Button clicked!');
                });
            });
        })
    }
}

//TODO: How can this be displayed? Not working with card click

// Function to display item details
function displayItem(ID) {
    // Get the data-id attribute of the clicked card
    console.log(ID);

    let localGarments = JSON.parse(localStorage.getItem('garments'));
  
    let garment = [];
    // Retrieve the item from localStorage using the itemId
    for(i = 0; i < localGarments.length; i++) {
        if(localGarments[i].id == ID) {
            garment = localGarments[i];
        }
    }
  
    // Clear the itemList
    itemElem.innerHTML = "";
  
    // Create elements to display item details
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="row">
            <div class="col-7 column-spacing">
                <h2> ${garment.name} </h2>
                <p id="wearcount" class="itemWears"> Wears: ${garment.wearCount} </p>
                <p> Brand: ${garment.brand} </p>
                <p> Size: ${garment.size} </p>
                <p> Colour: ${garment.colour} </p>
                <p> Material 1: ${garment.materialOne} </p>
                <p> Material 2: ${garment.materialTwo} </p>
                <p> Cost: $${garment.cost} </p>
                <p> Season: ${garment.season} </p>
                <p> Comfort Rating: ${garment.comfortRate} </p>
                <p> Fit Rating: ${garment.fitRate} </p>
            </div>
            <div class="col-5 column-spacing ">
                <img src="${garment.image}" alt="Image of ${garment.name}" /> 
            </div>
        </div>
    `;
    itemElem.appendChild(li);
  
    //Create delete button
    let delButton = document.createElement('button');
    let delButtonText = document.createTextNode('Delete');
    delButton.setAttribute('class', 'deleteButton');
    delButton.appendChild(delButtonText);
    li.appendChild(delButton);

    delButton.addEventListener('click', function() {
        li.remove();
        localGarments.forEach(function(garmentArrayElement, garmentArrayIndex) {
            if (garmentArrayElement.id == ID) {
                localGarments.splice(garmentArrayIndex, 1);
            }
        })

        localStorage.setItem('garments', JSON.stringify(localGarments));

        garment.remove();
    })
    
    // Show the item display
    document.getElementById('itemDisplay').style.display = 'block';
  }
  
 
  

// TODO: Connect wears to individual objects
//Wear count button on each card adds one 'wear' each time it is clicked
    // let addWearBtn = document.querySelectorAll('.addWear-btn');

    // addWearBtn.addEventListener('click', function(event) {
    //     let localGarments = JSON.parse(localStorage.getItem('garments')); //Do i bring this in again for this function?
    //     localGarments.forEach(function(wearElement) {
    //         if (wearElement.id == item.getAttribute('data-id')) {
    //             event.target.value++;
    //             window.localStorage.setItem(event.target.wearCount, event.target.value);
    //             document.querySelector("#wearcount").innerHTML = "Wears " + event.target.wearCount;
    //         }
    //     })
        
    // });



//Showing and hiding different elements
const formElement = document.getElementById("garmentForm");
const garmentDisplay = document.getElementById("garmentDisplay");
const itemDisplay = document.getElementById("itemDisplay");
const showButton = document.getElementById("showElement");
const hideButton = document.getElementById("hideElement");
const itemDetailsCard = document.getElementById("itemDisplay");
let showItem = document.querySelectorAll(".itemDetails");

//Shows form when Add Item button clicked
showButton.addEventListener("click", () => {
    formElement.classList.remove("hidden");
    garmentDisplay.classList.add("hidden");
});

//Hides form and displays items when Submit button clicked
hideButton.addEventListener("click", () => {
    formElement.classList.add("hidden");
    garmentDisplay.classList.remove("hidden");
});


//Adds garment object to local storage
function addGarment(name, brand, size, colour, materialOne, materialTwo, cost, season, comfortRate, fitRate, image, category, wearCount) {
    let garment = {
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
        category: category,
        wearCount: wearCount
    }

    let localGarments = JSON.parse(localStorage.getItem('garments'));
    console.log(localGarments);

    if (localGarments == null) {
        localGarments = [garment];
    } else {
        if (localGarments.find(element => element.id === garment.id)) {
            console.log('Garment ID already exists');
        } else {
            localGarments.push(garment);
        }
    }

    localStorage.setItem('garments', JSON.stringify(localGarments));

    displayGarment();
}

displayGarment();

/*Modal pop-up showing and hiding with names of category tiles*/
const main = document.querySelector('main'),
modalCategory = document.querySelector('#modal-category'),
    showBtn = document.querySelectorAll('.show-modal'),
    closeBtn = document.querySelector('.close-btn');

    showBtn.forEach((button) => {
        button.addEventListener('click', (event) => {
            modalCategory.textContent = event.target.textContent.trim();
            main.classList.add("active");
        });
    })

closeBtn.addEventListener('click', () => {
successMessage.classList.remove("show")
main.classList.remove("active")
});
