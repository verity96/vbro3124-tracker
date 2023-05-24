// let task = {
//     name: "White t-shirt",
//     category: "Top",
//     image: "",
//     id: Date.now(),
//     date: new Date().toISOString(),
//     brand: "Levi's",
//     size: "AU 6",
//     colour: "White",
//     materialOne: "blend",
//     materialTwo: "cotton",
//     cost: "25.00",
//     season: "Summer",
//     comfortRate: 4,
//     fitRate: 5,
//     wearCount: []
// }

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