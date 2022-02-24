//Importing the Data from the dino.js file
import { Data } from './dino.js'
const btn = document.getElementById("btn");
const main = document.getElementById("grid");

// Create Classes and Subclasses with Constructor
class Organism {
    constructor(weight, height, diet, where) {
        this.weight = weight,
            this.height = height,
            this.diet = diet
        this.where = where
    }
}
class Dinosaur extends Organism {
    constructor(weight, height, diet, species, where, when, fact) {
        super(weight, height, diet, where)
        this.species = species,
            this.fact = fact,
            this.when = when
    }
}
class Bird extends Organism {
    constructor(name, inches, weight, height, diet) {
        super(weight, height, diet)
        this.name = name,
            this.inches = inches
        this.weight = weight,
            this.height = height,
            this.diet = diet
    }
}
class Human extends Organism {
    constructor(name, inches, weight, height, diet, where) {
            super(weight, height, diet, where)
            this.name = name,
                this.inches = inches
        }
        //Creating Methods of this Prototype
    comparingHeight() {
        let heightByValue = Data.map(data => data.height);
        let sumHeight = 0;
        for (let h of heightByValue) {
            if (h < this.height) {
                sumHeight += 1;
            } else {}
        }
        return sumHeight
    }

    comparingDiet() {
        let dietByValue = Data.map(data => data.diet);
        let sumDiet = 0;
        for (let d of dietByValue) {
            this.diet.toLowerCase() == d ? sumDiet++ : {};
        }
        return sumDiet
    }

    comparingLocation() {
        let locationByValue = Data.map(data => data.where);
        let locationSum = 0;
        for (let l of locationByValue) {
            if (l == "World Wide") {
                locationSum++
            } else if (l.includes(this.where)) {
                locationSum++
            } else {}
        }
        return locationSum

    }
}

//Creating the human Object with the input of the form 
function createPerson() {
    let name = document.getElementById("name").value;
    let feet = document.getElementById("feet").value;
    let inches = document.getElementById("inches").value;
    let weight = document.getElementById("weight").value;
    let diet = document.getElementById("diet").value;
    let where = document.getElementById("location").value;

    let human = new Human(name, inches, weight, feet, diet, where)
    let human_el = document.createElement("div");
    human_el.classList.add("grid-item")
    human_el.setAttribute("id", "human-item")
    human_el.innerHTML = `
    <img src="./images/human.png">
    <h3>${human.name}</h3>
    <p>The human is taller than ${human.comparingHeight()} other dinosaurs.<br>
    It has the same diet as ${human.comparingDiet()} other dinosaurs.<br>
    It has the same habitat as ${human.comparingLocation()} other dinosaurs.
    </p>
    `
    main.appendChild(human_el)

}

//Creating the functionality for 
function displayDinoAndPigeon() {

    // Create Dino and Bird Objects within the DOM
    function manipulateDOM(el) {
        let dino_el = document.createElement('div');
        dino_el.classList.add('grid-item');
        dino_el.innerHTML = `
            <img src="./images/${el.species.toLowerCase()}.png">
            <h3>${el.species}</h3>
            `
        main.appendChild(dino_el)

        let frontside_el = document.createElement("p");
        frontside_el.innerHTML = `${el.fact}`
        frontside_el.classList.add("frontside")
        dino_el.appendChild(frontside_el);

        let backside_el = document.createElement("p");
        backside_el.innerHTML = `
        The ${el.species}'s habitat's was ${el.where} and was living during the ${el.when}. <br>
        It's size of about ${el.height} (inches) was reached through a ${el.diet} diet.
`
        backside_el.classList.add("backside")
        dino_el.appendChild(backside_el);

        dino_el.addEventListener("click", function() {
            if (backside_el.style.opacity == 0) {
                backside_el.style.opacity = 1;
                frontside_el.style.opacity = 0;
            } else {
                backside_el.style.opacity = 0;
                frontside_el.style.opacity = 1;
            }
        })
    }


    //Classifying the Objects of the array to either a Dino or a Bird class
    Data.forEach(function(d) {
        switch (d.name) {
            case "Pigeon":
                let bird = new Bird(d.weight, d.height, d.diet, d.species, d.where, d.when, d.fact)
                manipulateDOM(bird);
                break;
            default:
                let dino = new Dinosaur(d.weight, d.height, d.diet, d.species, d.where, d.when, d.fact)
                manipulateDOM(dino);
                break;
        }
    })
}

//Adding Event Listener when Button is clicked
btn.addEventListener("click", function() {
    document.getElementById("dino-compare").style.display = "none";
    createPerson();
    displayDinoAndPigeon();
});

/* //Adding Event Listener when Card is clicked
cards.forEach(function(card) {
    console.log(card);
}) */