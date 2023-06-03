//Pulling through element IDs
const form = document.getElementById('garmentForm');
const garmentElem = document.querySelector('#garmentList');
const wardrobeElem = document.querySelector('#wardrobeList');
const itemElem = document.querySelector('#itemList');
const successMessage = document.querySelector('#successfulAdd');


//Adds item to local storage array from form submission
form.addEventListener('submit', function (event) {
    //Prevents default form submit behaviour
    event.preventDefault();

    //Displays success message when the form is submitted
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
            imgData,
            form.elements.garmentCategory.value
        )
    }

    // Read the uploaded image as a Data URL (Base64 encoded string)
    reader.readAsDataURL(selectedFile);

})

//Function to convert the stored number on input ratings to a star string value
function convertComfortRating(comfortRate) {
    let comfortRating = "";
    if (comfortRate == 1) {
        comfortRating = "★";
    } else if (comfortRate == 2) {
        comfortRating = "★★";
    } else if (comfortRate == 3) {
        comfortRating = "★★★";
    } else if (comfortRate == 4) {
        comfortRating = "★★★★";
    } else if (comfortRate == 5) {
        comfortRating = "★★★★★";
    } else {
        comfortRating = "No rating available.";
    };
    return comfortRating
}

//Generates innerHTML to display the tiles
function generateGarmentItem(garment) {
    //Creates a new <li></li> element in HTML
    let item = document.createElement('li');

    //Assigns the convertComfortRating function to a variable with a value to be converted
    let comfortRating = convertComfortRating(garment.comfortRate);

    //Creates card for Home page, assigning the tile with its ID number
    item.setAttribute('data-id', garment.id);
    item.innerHTML = `
        <div class="card itemDetails">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 column-spacing">
                    <h3> ${garment.brand} </h3>
                    <p> ${garment.name} </p>
                    <p id="wearcount"> Wears: ${garment.wearCount} </p>
                    <p> Comfort Rating: <span style="color:#F4AFCF">${comfortRating}</span> </p>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 column-spacing">
                    <img src=${garment.image} class="itemImg" alt="Image of ${garment.name}" /> 
                </div>
            </div>
            <div class="row">
                <div class="button-container col-12">
                </div>
            </div>
        </div>
    `;

    //Gets div with class 'button-container' for the item from the above HTML
    let buttonContainer = item.querySelector('.button-container');
    //Creates a <button> element
    let wearCountButton = document.createElement('button');
    //Add a class to the created button
    wearCountButton.classList.add('addWear-btn');
    //Adds text content to the created button
    wearCountButton.textContent = 'ADD WEAR +';
    //Appends the button to the buttonContainer
    buttonContainer.appendChild(wearCountButton);

    //EventListener to detect when the ADD WEAR + button has been clicked
    wearCountButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Stops parent event handlers from being executed
        let localGarments = JSON.parse(localStorage.getItem('garments')); //Retrieves all items from garments in localStorage
        //Finds the item from localStorage that matches the id of the current item being clicked and increments the wearCount by 1 and updating the innerHTML display.
        localGarments.forEach(function (wearElement) {
            if (wearElement.id == item.getAttribute('data-id')) {
                wearElement.wearCount++;
                item.querySelector("#wearcount").innerHTML = "Wears " + wearElement.wearCount;
            }
        })
        localStorage.setItem('garments', JSON.stringify(localGarments)); //Sets the new value in localStorage

    });

    return item;
}

//Displaying item cards with add wear button
function displayGarmentsInWardrobe() {

    //Clears innerHTML before running function
    wardrobeElem.innerHTML = "";
    garmentElem.innerHTML = "";

    let localGarments = JSON.parse(localStorage.getItem('garments')); //Retrieves all items from localStorage

    //Checks if localGarments variable has values
    if (localGarments !== null) {

        //Adds each item found to wardrobe list
        localGarments.forEach((garment) => {

            let item = generateGarmentItem(garment);

            //Adds card to Wardrobe home page
            wardrobeElem.prepend(item);
            form.reset();
            
            //When the item is clicked on it will activate the modal and display the page with all item details
            item.addEventListener('click', () => {
                itemDisplay.classList.remove("hidden");
                garmentDisplay.classList.add("hidden");
                main.classList.add("active");
                displayItem(item);
            });

        })
    }
}


//Displays all items in the modal filtered by their categories
function displayGarmentsInCateogry() {
    garmentElem.innerHTML = ""; //Clears the modal display

    let localGarments = JSON.parse(localStorage.getItem('garments')); //Retrieves all items from localStorage

    //Checks to see if the item exists and has a matching category value to then generate a card and append it to the modal
    if (localGarments !== null) {

        localGarments.forEach((garment) => {

            if (garment.category == currentCategory) {
                //Creates card for Modal
                let itemModal = generateGarmentItem(garment);
                //Adds card to modal
                garmentElem.prepend(itemModal);

                //When the card is clicked it displays the pages with all item details and delete button - displayItem()
                itemModal.addEventListener('click', () => {
                    itemDisplay.classList.remove("hidden");
                    garmentDisplay.classList.add("hidden");
                    displayItem(itemModal);
                });
            }
        })
    }
}

// Function to display item details
function displayItem(item) {
    // Get the data-id attribute of the clicked card
    const itemId = item.getAttribute('data-id');
    // Retrieve the item from localStorage using the itemId
    let localGarments = JSON.parse(localStorage.getItem('garments'))
    let garment = localGarments.find(function (garment) {
        return garment.id == itemId;
    })
    currentCategory = garment.category
    modalCategory.textContent = currentCategory;

    // Clear the itemList
    itemElem.innerHTML = "";

    // Create list elements to display item details
    const li = document.createElement('li');
    //Uses function to display stars for ratings
    let comfortRating = convertComfortRating(garment.comfortRate);
    let fitRating = convertComfortRating(garment.fitRate);
    //Generates HTML content
    li.innerHTML = `
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 column-spacing">
                <h2> ${garment.name} </h2>
                <p id="wearcount" class="itemWears"> Wears: ${garment.wearCount} </p>
                <p> Brand: ${garment.brand} </p>
                <p> Size: ${garment.size} </p>
                <p> Colour: ${garment.colour} </p>
                <p> Material 1: ${garment.materialOne} </p>
                <p> Material 2: ${garment.materialTwo} </p>
                <p> Cost: $${garment.cost} </p>
                <p> Season: ${garment.season} </p>
                <p> Comfort Rating: ${comfortRating} </p>
                <p> Fit Rating: ${fitRating} </p>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 column-spacing">
                <img src="${garment.image}" class="itemImg" alt="Image of ${garment.name}" /> 
            </div>
        </div>
    `;
    itemElem.appendChild(li); //Appends content to list item

    //Create delete button
    let delButton = document.createElement('button');
    let delButtonText = document.createTextNode('Delete'); //Adds text to button
    delButton.setAttribute('class', 'deleteButton'); //Adds class to the button
    delButton.appendChild(delButtonText); //Adds text to the button element
    li.appendChild(delButton); //Appends the button to each item

    //Listens for when delete button is clicked and gets the item by its id to remove it from the array
    delButton.addEventListener('click', function () {
        li.remove();
        localGarments.forEach(function (garmentArrayElement, garmentArrayIndex) {
            if (garmentArrayElement.id == item.getAttribute('data-id')) {
                localGarments.splice(garmentArrayIndex, 1);
            }
        })

        localStorage.setItem('garments', JSON.stringify(localGarments)); //Sets the new array to local storage

        item.remove(); //Deletes the item

        //Shows and hides elements so that the modal closes and resets
        main.classList.remove("active");
        garmentDisplay.classList.remove("hidden");
        itemDisplay.classList.add("hidden");
        currentCategory = "";

        // Run again to update list in case wear count has changed
        displayGarmentsInCateogry();
        displayGarmentsInWardrobe();
    })

    //Creates close button and adds it to the item
    let itemCloseButton = document.createElement('button');
    let itemCloseText = document.createTextNode('Close');
    itemCloseButton.setAttribute('class', 'itemCloseButton');
    itemCloseButton.setAttribute('id', 'itemCloseButton');
    itemCloseButton.appendChild(itemCloseText);
    li.appendChild(itemCloseButton);

    //When the close button is clicked it takes the user back one page to see the category list again
    itemCloseButton.addEventListener('click', function() {
        itemDisplay.classList.add("hidden");
        garmentDisplay.classList.remove("hidden");
        displayGarmentsInCateogry();
    })

    // Show the item display
    document.getElementById('itemDisplay').style.display = 'block';
}


//Pulling element ids and classes to show and hide different elements
const formElement = document.getElementById("garmentForm");
const garmentDisplay = document.getElementById("garmentDisplay");
const itemDisplay = document.getElementById("itemDisplay");
const showButton = document.getElementById("showElement");
const hideButton = document.getElementById("hideElement");
const itemDetailsCard = document.getElementById("itemDisplay");
let showItem = document.querySelectorAll(".itemDetails");
let currentCategory = "";

//Shows form when Add Item button clicked pulling the value for the current category
showButton.addEventListener("click", () => {
    formElement.classList.remove("hidden");
    garmentDisplay.classList.add("hidden");
    itemDisplay.classList.add("hidden");
    formElement.elements.garmentCategory.value = currentCategory
});

//Hides form and displays item cards when Submit button clicked
hideButton.addEventListener("click", () => {
    formElement.classList.add("hidden");
    garmentDisplay.classList.remove("hidden");
    displayGarmentsInCateogry();
});


//Adds garment object to local storage
function addGarment(name, brand, size, colour, materialOne, materialTwo, cost, season, comfortRate, fitRate, image, category) {
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
        wearCount: 0
    }

    let localGarments = JSON.parse(localStorage.getItem('garments')); //Pulls existing items from local storage

    //Checks if there are already items in local storage and displays it. Then checks for items with the same id otherwise it will add the new item to local storage
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

    displayGarmentsInWardrobe(); //Runs the function to update wardrobe display when new items added

}

//Run function on initial load before adding new items to display whats already in local storage
displayGarmentsInWardrobe();

/*Modal pop-up showing and hiding with names of category tiles*/
const main = document.querySelector('main'),
modalCategory = document.querySelector('#modal-category'),
showBtn = document.querySelectorAll('.show-modal'),
closeBtn = document.querySelector('.close-btn');

//Activates the modal when clicking a category button. Pulls through the current category and displays the items associated with the category.
showBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
        main.classList.add("active");
        currentCategory = button.getAttribute('data-category');
        modalCategory.textContent = currentCategory;
        displayGarmentsInCateogry();
    });
})

// X button on modal. Resets all elements so that when a category is clicked it will show the category items.
closeBtn.addEventListener('click', () => {
    successMessage.classList.remove("show")
    main.classList.remove("active")
    itemDisplay.classList.add("hidden")
    formElement.classList.add("hidden")
    garmentDisplay.classList.remove("hidden")
    currentCategory = "";
    
    // Run again to update list in case wear count has changed
    displayGarmentsInWardrobe();
});
