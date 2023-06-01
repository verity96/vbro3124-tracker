
const form = document.getElementById('garmentForm');
const garmentElem = document.querySelector('#garmentList');
const wardrobeElem = document.querySelector('#wardrobeList');
const itemElem = document.querySelector('#itemList');
const successMessage = document.querySelector('#successfulAdd');


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
                            <button onclick="wearCounter()" type="button" class="addWear-btn">ADD WEAR +</button>
                        </div>
                    </div>
                </div>
            `; // TODO: Need to generate unique ID for the wearCount ^
            garmentElem.appendChild(item);
            wardrobeElem.appendChild(item); // How do I show in both home pg and modal?
            form.reset();
        })
    }
}

function displayItem(garment) {

    itemElem.innerHTML = "";

    let localGarments = JSON.parse(localStorage.getItem('garments'));

    if (localGarments !== null) {

            localGarments.forEach((garment) => {
            let itemDetails = document.createElement('li');
            itemDetails.setAttribute('data-id', garment.id);
            itemDetails.innerHTML = `
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
                    <div class="col-5 column-spacing">
                        <img src="img-dest" class="img-dest" alt="Image of ${garment.name}" /> 
                    </div>
                </div>
            `;
            itemElem.appendChild(itemDetails);
        })
    }

    //TODO: Delete not working.
    let delButton = document.createElement('button');
    let delButtonText = document.createTextNode('Delete');
    delButton.setAttribute('class', 'deleteButton');
    delButton.appendChild(delButtonText);
    itemDetails.appendChild(delButton);

    delButton.addEventListener('click', function(event) {
        itemDetails.remove();
        localGarments.forEach(function(garmentArrayElement, garmentArrayIndex) {
            if (garmentArrayElement.id == item.getAttribute('data-id')) {
                localGarments.splice(garmentArrayIndex, 1);
            }
        })

        localStorage.setItem('garments', JSON.stringify(localGarments));

        item.remove();
    })

}

// TODO: Only storing once in localStorage. All buttons for new items only add to first wearCount
function wearCounter() {
    if (localStorage.wearcount) {
      localStorage.wearcount = Number(localStorage.wearcount)+1;
    } else {
      localStorage.wearcount = 1;
    }
    document.querySelector("#wearcount").innerHTML = "Wears " + localStorage.wearcount;
  }
// document.addEventListener('click', function(event) {
//     if (event.target.dataset.counter != undefined) {
//       event.target.value++;
//       window.localStorage.setItem(event.target.wearCount, event.target.value);
//     }
//   });


//Showing and hiding different elements
const myElement = document.getElementById("garmentForm");
const garmentDisplay = document.getElementById("garmentDisplay");
const showButton = document.getElementById("showElement");
const hideButton = document.getElementById("hideElement");
const itemDetailsCard = document.getElementById("itemDisplay");
let showItem = document.querySelectorAll(".itemDetails");

showButton.addEventListener("click", () => {
    myElement.classList.remove("hidden");
    garmentDisplay.classList.add("hidden");
});
hideButton.addEventListener("click", () => {
    myElement.classList.add("hidden");
    garmentDisplay.classList.remove("hidden");
});

//TODO: Not working to show individual card details
showItem.forEach((card) => {
    card.addEventListener("click", () => {
        garmentDisplay.classList.add("hidden");
        itemDetailsCard.classList.remove("hidden");
    });
});


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
        category: category
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

    displayGarment();
    displayItem();
}

//addTask("Flower dress", "H&M", "AU 6", "Pink", "Cotton", "Cotton", "69.99","Summer", 3, 4, "./Images/Asset 1.svg", "Dresses");
displayGarment();

/*Modal pop-up showing and hiding*/
const main = document.querySelector('main'),
modalCategory = document.querySelector('#modal-category'),
    showBtn = document.querySelectorAll('.show-modal'),
    closeBtn = document.querySelector('.close-btn');

    showBtn.forEach((button) => {
        button.addEventListener('click', (event) => {
            console.log(event.target.textContent.trim());
            modalCategory.textContent = event.target.textContent.trim();
            main.classList.add("active");
        });
    })

closeBtn.addEventListener('click', () => {
successMessage.classList.remove("show")
main.classList.remove("active")
});
