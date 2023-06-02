
// const form = document.getElementById('garmentForm');
// const garmentElem = document.querySelector('#garmentList');
// const wardrobeElem = document.querySelector('#wardrobeList');
// const itemElem = document.querySelector('#itemList');
// const successMessage = document.querySelector('#successfulAdd');

// //Adds item to local storage array from form submission
// form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     successMessage.classList.add('show');

//     let reader = new FileReader();

//     // Get the first selected file from the input element
//     let selectedFile = form.elements.garmentImage.files[0];

//     // Set up the FileReader's 'onloadend' event handler
//     reader.onloadend = function (e) {
//         // Get the base64 representation of the image from the event target result
//         let imgData = e.target.result;

//         // Adding new item after image is read to ensure data is fully loaded
//         addGarment(
//             form.elements.garmentName.value,
//             form.elements.garmentBrand.value,
//             form.elements.garmentSize.value,
//             form.elements.garmentColour.value,
//             form.elements.garmentMaterialOne.value,
//             form.elements.garmentMaterialTwo.value,
//             form.elements.garmentCost.value,
//             form.elements.garmentSeason.value,
//             form.elements.garmentComfort.value,
//             form.elements.garmentFit.value,
//             imgData
//         )
//     }

//     // Read the uploaded image as a Data URL (Base64 encoded string)
//     reader.readAsDataURL(selectedFile);  

// })

// function convertComfortRating(comfortRate) {
//     let comfortRating = "";
//     if (comfortRate == 1) {
//         comfortRating = "★";
//     } else if (comfortRate == 2) {
//         comfortRating = "★★";
//     } else if (comfortRate == 3) {
//         comfortRating = "★★★";
//     } else if (comfortRate == 4) {
//         comfortRating = "★★★★";
//     } else if (comfortRate == 5) {
//         comfortRating = "★★★★★";
//     } else {
//         comfortRating = "No rating available.";
//     };
//     return comfortRating
// }

// function generateGarmentItem(garment) {
//     let item = document.createElement('li');

//     let comfortRating = convertComfortRating(garment.comfortRate);

//     //Creates card for Home page
//     item.setAttribute('data-id', garment.id);
//     item.innerHTML = `
//         <div class="card itemDetails">
//             <div class="row">
//                 <div class="col-8 column-spacing">
//                     <h3> ${garment.brand} </h3>
//                     <p> ${garment.name} </p>
//                     <p id="wearcount"> Wears: ${garment.wearCount} </p>
//                     <p> Comfort Rating: <span style="color:#F4AFCF">${comfortRating}</span> </p>
//                 </div>
//                 <div class="col-4 column-spacing">
//                     <img src=${garment.image} class="itemImg" alt="Image of ${garment.name}" /> 
//                 </div>
//             </div>
//             <div class="row">
//                 <div class="button-container col-12">
//                 </div>
//             </div>
//         </div>
//     `;

//     let buttonContainer = item.querySelector('.button-container');
//     let wearCountButton = document.createElement('button');
//     wearCountButton.classList.add('addWear-btn');
//     wearCountButton.textContent = 'ADD WEAR +';
//     buttonContainer.appendChild(wearCountButton);

//     wearCountButton.addEventListener('click', function (event) {
//         event.stopPropagation();
//         let localGarments = JSON.parse(localStorage.getItem('garments'));
//         localGarments.forEach(function (wearElement) {
//             if (wearElement.id == item.getAttribute('data-id')) {
//                 wearElement.wearCount++;
//                 item.querySelector("#wearcount").innerHTML = "Wears " + wearElement.wearCount;
//             }
//         })
//         localStorage.setItem('garments', JSON.stringify(localGarments));

//     });

//     return item;
// }

// //Displaying item cards with add wear button
// function displayGarmentsInWardrobe() {

//     wardrobeElem.innerHTML = "";
//     garmentElem.innerHTML = "";

//     let localGarments = JSON.parse(localStorage.getItem('garments'));

//     if (localGarments !== null) {

//         localGarments.forEach((garment) => {

//             let item = generateGarmentItem(garment);

//             //Adds card to Wardrobe home page
//             wardrobeElem.prepend(item);
//             form.reset();

//             item.addEventListener('click', () => {
//                 itemDisplay.classList.remove("hidden");
//                 garmentDisplay.classList.add("hidden");
//                 displayItem(item);

//             });

//         })
//     }
// }

// function displayGarmentsInCateogry() {
//     garmentElem.innerHTML = "";

//     let localGarments = JSON.parse(localStorage.getItem('garments'));

//     if (localGarments !== null) {

//         localGarments.forEach((garment) => {

//             if (garment.category == currentCategory) {
//                 //Creates card for Modal
//                 let itemModal = generateGarmentItem(garment);
//                 //Adds card to modal
//                 garmentElem.prepend(itemModal);
//             }

//         })
//     }
// }


// // Function to display item details
// function displayItem(item) {
//     console.log(item)
//     // Get the data-id attribute of the clicked card
//     const itemId = item.getAttribute('data-id');
//     console.log(itemId);
//     // Retrieve the item from localStorage using the itemId
//     let localGarments = JSON.parse(localStorage.getItem('garments'))
//     let garment = localGarments.find(function (garment) {
//         return garment.id == itemId;
//     })
//     console.log(garment)
//     currentCategory = garment.category
//     modalCategory.textContent = currentCategory;

//     // Clear the itemList
//     itemElem.innerHTML = "";

//     // Create elements to display item details
//     const li = document.createElement('li');
//     li.innerHTML = `
//         <div class="row">
//             <div class="col-7 column-spacing">
//                 <h2> ${garment.name} </h2>
//                 <p id="wearcount" class="itemWears"> Wears: ${garment.wearCount} </p>
//                 <p> Brand: ${garment.brand} </p>
//                 <p> Size: ${garment.size} </p>
//                 <p> Colour: ${garment.colour} </p>
//                 <p> Material 1: ${garment.materialOne} </p>
//                 <p> Material 2: ${garment.materialTwo} </p>
//                 <p> Cost: $${garment.cost} </p>
//                 <p> Season: ${garment.season} </p>
//                 <p> Comfort Rating: ${garment.comfortRate} </p>
//                 <p> Fit Rating: ${garment.fitRate} </p>
//             </div>
//             <div class="col-5 column-spacing">
//                 <img src="${garment.image}" alt="Image of ${garment.name}" /> 
//             </div>
//         </div>
//     `;
//     itemElem.appendChild(li);

//     //Create delete button
//     let delButton = document.createElement('button');
//     let delButtonText = document.createTextNode('Delete');
//     delButton.setAttribute('class', 'deleteButton');
//     delButton.appendChild(delButtonText);
//     li.appendChild(delButton);

//     delButton.addEventListener('click', function () {
//         li.remove();
//         localGarments.forEach(function (garmentArrayElement, garmentArrayIndex) {
//             if (garmentArrayElement.id == item.getAttribute('data-id')) {
//                 localGarments.splice(garmentArrayIndex, 1);
//             }
//         })

//         localStorage.setItem('garments', JSON.stringify(localGarments));

//         item.remove();
//     })

//     // Show the item display
    
//     document.getElementById('itemDisplay').style.display = 'block';
// }

// // Function to display item details
// // function displayItem(ID) {
// //     // Get the data-id attribute of the clicked card
// //     console.log(ID);

// //     let localGarments = JSON.parse(localStorage.getItem('garments'));
  
// //     let garment = [];
    

// //     // Retrieve the item from localStorage using the itemId
// //     for(i = 0; i < localGarments.length; i++) {
// //         if(localGarments[i].id == ID) {
// //             garment = localGarments[i];
// //             console.log(localGarments[i].id);
// //             console.log(ID);
// //         }
// //     }
  
// //     // Clear the itemList
// //     itemElem.innerHTML = "";
  
// //     // Create elements to display item details
// //     const li = document.createElement('li');

// //     let starRating = "";
// //     if (garment.comfortRate == 1 || garment.fitRate == 1) {
// //         starRating = "★";
// //     } else if (garment.comfortRate == 2 || garment.fitRate == 2) {
// //         starRating = "★★";
// //     } else if (garment.comfortRate == 3 || garment.fitRate == 3) {
// //         starRating = "★★★";
// //     } else if (garment.comfortRate == 4 || garment.fitRate == 4) {
// //         starRating = "★★★★";
// //     } else if (garment.comfortRate == 5 || garment.fitRate == 5) {
// //         starRating = "★★★★★";
// //     } else {
// //         starRating = "No rating available.";
// //     };

// //     li.innerHTML = `
// //         <div class="row">
// //             <div class="col-7 column-spacing">
// //                 <h2> ${garment.name} </h2>
// //                 <p id="wearcount" class="itemWears"> Wears: ${garment.wearCount} </p>
// //                 <p> Brand: ${garment.brand} </p>
// //                 <p> Size: ${garment.size} </p>
// //                 <p> Colour: ${garment.colour} </p>
// //                 <p> Material 1: ${garment.materialOne} </p>
// //                 <p> Material 2: ${garment.materialTwo} </p>
// //                 <p> Cost: $${garment.cost} </p>
// //                 <p> Season: ${garment.season} </p>
// //                 <p> Comfort Rating: ${starRating} </p>
// //                 <p> Fit Rating: ${starRating} </p>
// //             </div>
// //             <div class="col-5 column-spacing ">
// //                 <img src="${garment.image}" class="itemImg" alt="Image of ${garment.name}" /> 
// //             </div>
// //         </div>
// //     `;
// //     itemElem.appendChild(li);
  
// //     //Create delete button
// //     let delButton = document.createElement('button');
// //     let delButtonText = document.createTextNode('Delete');
// //     delButton.setAttribute('class', 'deleteButton');
// //     delButton.appendChild(delButtonText);
// //     li.appendChild(delButton);

// //     delButton.addEventListener('click', function() {
// //         li.remove();
// //         localGarments.forEach(function(garmentArrayElement, garmentArrayIndex) {
// //             if (garmentArrayElement.id == ID) {
// //                 localGarments.splice(garmentArrayIndex, 1);
// //             }
// //         })

// //         localStorage.setItem('garments', JSON.stringify(localGarments));

// //     })

// //     let itemCloseButton = document.createElement('button');
// //     let itemCloseText = document.createTextNode('Close');
// //     itemCloseButton.setAttribute('class', 'itemCloseButton');
// //     itemCloseButton.appendChild(itemCloseText);
// //     li.appendChild(itemCloseButton);

// //     itemCloseButton.addEventListener('click', function() {
// //         itemDisplay.classList.add("hidden");
// //         garmentDisplay.classList.remove("hidden");
// //     })
    
// //     // Show the item display
// //     document.getElementById('itemDisplay').style.display = 'block';
// //   }
  



// //Showing and hiding different elements
// const formElement = document.getElementById("garmentForm");
// const garmentDisplay = document.getElementById("garmentDisplay");
// const itemDisplay = document.getElementById("itemDisplay");
// const showButton = document.getElementById("showElement");
// const hideButton = document.getElementById("hideElement");
// const itemDetailsCard = document.getElementById("itemDisplay");
// let showItem = document.querySelectorAll(".itemDetails");
// let currentCategory = "";

// //Shows form when Add Item button clicked
// showButton.addEventListener("click", () => {
//     formElement.classList.remove("hidden");
//     garmentDisplay.classList.add("hidden");
//     formElement.elements.garmentCategory.value = currentCategory
// });

// //Hides form and displays items when Submit button clicked
// hideButton.addEventListener("click", () => {
//     formElement.classList.add("hidden");
//     garmentDisplay.classList.remove("hidden");
// });


// //Adds garment object to local storage
// function addGarment(name, brand, size, colour, materialOne, materialTwo, cost, season, comfortRate, fitRate, image, category, wearCount) {
//     let garment = {
//         name: name,
//         id: Date.now(),
//         date: new Date().toISOString(),
//         brand: brand,
//         size: size,
//         colour: colour,
//         materialOne: materialOne,
//         materialTwo: materialTwo,
//         cost: cost,
//         season: season,
//         comfortRate: comfortRate,
//         fitRate: fitRate,
//         image: image,
//         category: category,
//         wearCount: 0
//     }

//     let localGarments = JSON.parse(localStorage.getItem('garments'));

//     if (localGarments == null) {
//         localGarments = [garment];
//     } else {
//         if (localGarments.find(element => element.id === garment.id)) {
//             console.log('Garment ID already exists');
//         } else {
//             localGarments.push(garment);
//         }
//     }

//     localStorage.setItem('garments', JSON.stringify(localGarments));

//     displayGarmentsInWardrobe();
//     displayGarmentsInCateogry();
// }

// displayGarmentsInWardrobe();

// /*Modal pop-up showing and hiding with names of category tiles*/
// const main = document.querySelector('main'),
// modalCategory = document.querySelector('#modal-category'),
// showBtn = document.querySelectorAll('.show-modal'),
// closeBtn = document.querySelector('.close-btn');

// showBtn.forEach((button) => {
//     button.addEventListener('click', (event) => {
//         currentCategory = button.getAttribute('data-category');
//         modalCategory.textContent = currentCategory;
//         main.classList.add("active");
//         displayGarmentsInCateogry();
//     });
// })

// closeBtn.addEventListener('click', () => {
//     successMessage.classList.remove("show")
//     main.classList.remove("active")
//     currentCategory = "";
    
//     // Run again to update list in case wear count has changed
//     displayGarmentsInWardrobe();
// });

const form = document.getElementById('garmentForm');
const garmentElem = document.querySelector('#garmentList');
const wardrobeElem = document.querySelector('#wardrobeList');
const itemElem = document.querySelector('#itemList');
const successMessage = document.querySelector('#successfulAdd');

//Adds item to local storage array from form submission
form.addEventListener('submit', function (event) {
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
            imgData,
            form.elements.garmentCategory.value
        )
    }

    // Read the uploaded image as a Data URL (Base64 encoded string)
    reader.readAsDataURL(selectedFile);

})

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


function generateGarmentItem(garment) {
    let item = document.createElement('li');

    let comfortRating = convertComfortRating(garment.comfortRate);

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
                <div class="button-container col-12">
                </div>
            </div>
        </div>
    `;

    let buttonContainer = item.querySelector('.button-container');
    let wearCountButton = document.createElement('button');
    wearCountButton.classList.add('addWear-btn');
    wearCountButton.textContent = 'ADD WEAR +';
    buttonContainer.appendChild(wearCountButton);

    wearCountButton.addEventListener('click', function (event) {
        event.stopPropagation();
        let localGarments = JSON.parse(localStorage.getItem('garments'));
        localGarments.forEach(function (wearElement) {
            if (wearElement.id == item.getAttribute('data-id')) {
                wearElement.wearCount++;
                item.querySelector("#wearcount").innerHTML = "Wears " + wearElement.wearCount;
            }
        })
        localStorage.setItem('garments', JSON.stringify(localGarments));

    });

    return item;
}

//Displaying item cards with add wear button
function displayGarmentsInWardrobe() {

    wardrobeElem.innerHTML = "";
    garmentElem.innerHTML = "";

    let localGarments = JSON.parse(localStorage.getItem('garments'));

    if (localGarments !== null) {

        localGarments.forEach((garment) => {

            let item = generateGarmentItem(garment);

            //Adds card to Wardrobe home page
            wardrobeElem.prepend(item);
            form.reset();
            
            item.addEventListener('click', () => {
                itemDisplay.classList.remove("hidden");
                garmentDisplay.classList.add("hidden");
                main.classList.add("active");
                displayItem(item);
            });

        })
    }
}



function displayGarmentsInCateogry() {
    garmentElem.innerHTML = "";

    let localGarments = JSON.parse(localStorage.getItem('garments'));

    if (localGarments !== null) {

        localGarments.forEach((garment) => {

            if (garment.category == currentCategory) {
                //Creates card for Modal
                let itemModal = generateGarmentItem(garment);
                //Adds card to modal
                garmentElem.prepend(itemModal);

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
    console.log(item)
    // Get the data-id attribute of the clicked card
    const itemId = item.getAttribute('data-id');
    console.log(itemId);
    // Retrieve the item from localStorage using the itemId
    let localGarments = JSON.parse(localStorage.getItem('garments'))
    let garment = localGarments.find(function (garment) {
        return garment.id == itemId;
    })
    console.log(garment)
    currentCategory = garment.category
    modalCategory.textContent = currentCategory;

    // Clear the itemList
    itemElem.innerHTML = "";

    // Create elements to display item details
    const li = document.createElement('li');
    let comfortRating = convertComfortRating(garment.comfortRate);
    let fitRating = convertComfortRating(garment.fitRate);
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
                <p> Comfort Rating: ${comfortRating} </p>
                <p> Fit Rating: ${fitRating} </p>
            </div>
            <div class="col-5 column-spacing">
                <img src="${garment.image}" class="itemImg" alt="Image of ${garment.name}" /> 
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

    delButton.addEventListener('click', function () {
        li.remove();
        localGarments.forEach(function (garmentArrayElement, garmentArrayIndex) {
            if (garmentArrayElement.id == item.getAttribute('data-id')) {
                localGarments.splice(garmentArrayIndex, 1);
            }
        })

        localStorage.setItem('garments', JSON.stringify(localGarments));

        item.remove();

        main.classList.remove("active")
        currentCategory = "";

        // Run again to update list in case wear count has changed
        displayGarmentsInWardrobe();
    })

    let itemCloseButton = document.createElement('button');
    let itemCloseText = document.createTextNode('Close');
    itemCloseButton.setAttribute('class', 'itemCloseButton');
    itemCloseButton.appendChild(itemCloseText);
    li.appendChild(itemCloseButton);

    itemCloseButton.addEventListener('click', function() {
        itemDisplay.classList.add("hidden");
        garmentDisplay.classList.remove("hidden");
    })

    // Show the item display
    
    document.getElementById('itemDisplay').style.display = 'block';
}


//Showing and hiding different elements
const formElement = document.getElementById("garmentForm");
const garmentDisplay = document.getElementById("garmentDisplay");
const itemDisplay = document.getElementById("itemDisplay");
const showButton = document.getElementById("showElement");
const hideButton = document.getElementById("hideElement");
const itemDetailsCard = document.getElementById("itemDisplay");
let showItem = document.querySelectorAll(".itemDetails");
let currentCategory = "";

//Shows form when Add Item button clicked
showButton.addEventListener("click", () => {
    formElement.classList.remove("hidden");
    garmentDisplay.classList.add("hidden");
    itemDisplay.classList.add("hidden");
    formElement.elements.garmentCategory.value = currentCategory
});

//Hides form and displays items when Submit button clicked
hideButton.addEventListener("click", () => {
    formElement.classList.add("hidden");
    garmentDisplay.classList.remove("hidden");
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

    let localGarments = JSON.parse(localStorage.getItem('garments'));

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

    displayGarmentsInWardrobe();
    displayGarmentsInCateogry();

}

displayGarmentsInWardrobe();

/*Modal pop-up showing and hiding with names of category tiles*/
const main = document.querySelector('main'),
    modalCategory = document.querySelector('#modal-category'),
    showBtn = document.querySelectorAll('.show-modal'),
    closeBtn = document.querySelector('.close-btn');

showBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
        currentCategory = button.getAttribute('data-category');
        modalCategory.textContent = currentCategory;
        main.classList.add("active");
        displayGarmentsInCateogry();
    });
})

closeBtn.addEventListener('click', () => {
    successMessage.classList.remove("show")
    main.classList.remove("active")
    currentCategory = "";

    // Run again to update list in case wear count has changed
    displayGarmentsInWardrobe();
});
