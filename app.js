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


    //Creating Methods of this Prototype
    comparingHeight(human) {
        let difference = this.height - human.height;
        if (this.height < human.height) {
            return `The ${this.species} is ${Math.abs(difference)} inches smaller than you.`
        } else {
            return `The ${this.species} is ${Math.abs(difference)} inches taller than you.`
        }
    }

    comparingDiet(human) {
        if (human.diet.toLowerCase() == this.diet) {
            return `The Dinosaur is also eating ${this.diet}, like you do.`
        } else {
            return `The Dinosaur is not eating the same as you, it eats ${this.diet}.`
        }
    }

    comparingWeight(human) {
        if (human.weight < this.weight) {
            return `The Dinosaur weights ${this.weight-human.weight} pounds more than you.`
        } else {
            return `The Dinosaur weights ${human.weight-this.weight} pounds less than you.`
        }
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
    constructor(weight, height, diet, species, where, when, fact) {
        super(weight, height, diet, where)
        this.species = species,
            this.fact = fact,
            this.when = when
    }
}
class Human extends Organism {
    constructor(name, inches, weight, height, diet, where) {
        super(weight, height, diet, where)
        this.name = name,
            this.inches = inches
    }
}

//Create Human Cards
function createHumanCard(object) {
    //Manipulating the DOM of the human Object
    let human_el = document.createElement("div");
    human_el.classList.add("grid-item")
    human_el.setAttribute("id", "human-item")
    human_el.innerHTML = `
    <img src="./images/human.png">
    <h3>${object.name}</h3>
    `
    main.appendChild(human_el)
}

// Create Dino and Bird Cards
function createDinoCards(el, human) {
    //Creating the Dino Element with a Picture and the name of the species
    let dino_el = document.createElement('div');
    dino_el.classList.add('grid-item');
    dino_el.innerHTML = `<img src="./images/${el.species.toLowerCase()}.png"><h3>${el.species}</h3>`
    main.appendChild(dino_el)

    //Creating the first fact, the fact about the dino
    let fact1 = document.createElement("p");
    fact1.innerHTML = `${el.fact}`
    fact1.classList.add("fact1")

    //Creating the second fact
    let fact2 = document.createElement("p");
    fact2.innerHTML = `${el.comparingDiet(human)}`

    //Creating the third fact
    let fact3 = document.createElement("p");
    fact3.innerHTML = `${el.comparingHeight(human)}`;

    //Create the fourth fact
    let fact4 = document.createElement("p");
    fact4.innerHTML = `${el.comparingWeight(human)}`;

    //Select random Element out of these 4 facts 
    let factArray = [fact1, fact2, fact3, fact4];
    dino_el.appendChild(factArray[Math.floor(Math.random() * factArray.length)]);
}

function createBirdCard(bird) {
    //Creating the Bird Element with a Picture and the name of the species
    let bird_el = document.createElement('div');
    bird_el.classList.add('grid-item');
    bird_el.innerHTML = `<img src="./images/${bird.species.toLowerCase()}.png"><h3>${bird.species}</h3><p>${bird.fact}</p>`
    main.appendChild(bird_el)
}


//Adding Event Listener when Button is clicked
btn.addEventListener("click", function() {
    //Making the form disappear
    document.getElementById("dino-compare").style.display = "none";


    //Defining the Variables of the human with the values of the form
    let name = document.getElementById("name").value;
    let feet = document.getElementById("feet").value * 12;
    let inches = document.getElementById("inches").value;
    let weight = document.getElementById("weight").value;
    let diet = document.getElementById("diet").value;
    let where = document.getElementById("location").value;

    //Creating a human Object which inherits from the Human Class
    let human = new Human(name, inches, weight, feet, diet, where)

    //Manipulating the DOM
    createHumanCard(human);

    //Creating Dino Objects and Manipulating the DOM
    Data.forEach(function(data) {
        if (data.species == "Pigeon") {
            let bird = new Bird(data.weight, data.height, data.diet, data.species, data.where, data.when, data.fact)
            createBirdCard(bird)
        } else {
            let dino = new Dinosaur(data.weight, data.height, data.diet, data.species, data.where, data.when, data.fact)
            createDinoCards(dino, human);
        }
    })
});