const term = document.querySelector(".term");
const definition = document.querySelector(".definition");
const checkButton = document.querySelector("#check");
const nextButton = document.querySelector("#next");
const buttons = [document.querySelector("#one"), document.querySelector("#two"), document.querySelector("#three"), document.querySelector("#four")];
var selectedButton = -1;


const questions = [
    {
        type: "MCQ",
        term: "What is the capital of france?",
        options: [
            "Paris",
            "Bologna",
            "Pisa",
            "Bordeaux"
        ],
        correctIndex: 0
    },
    {
        type: "Flashcard",
        term: "What is the best programming language?",
        definition: "OBviously React..."
    }, 
]
var currentIndex = 0;

checkButton.addEventListener("click", () => {
    checkDefinition(questions[currentIndex]);
});

nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex == questions.length) {
        currentIndex = 0;
    }
    updateFlashcardHtml(questions[currentIndex]);
});

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        console.log("setting " + i);
        selectedButton = i;
        updateButtonHtml(i);
    });
    console.log(buttons[i]);
}

function updateFlashcardHtml (question) {
    // reset all items, colours, etc...
    console.log(question.type);
    definition.classList.add("hidden");
    checkButton.classList.remove("correct");
    checkButton.classList.remove("incorrect");
    selectedButton = -1;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("hidden");
        buttons[i].classList.remove("selected");
    }

    if (question.type === "Flashcard") {
        term.textContent = question.term;
        definition.textContent = question.definition;
    } else if (question.type === "MCQ") {
        term.textContent = question.term;

        for (let i = 0; i < question.options.length; i++) {
            buttons[i].textContent = question.options[i];
            buttons[i].classList.remove("hidden");
        }
    }
}

function checkDefinition(question) {
    console.log("You clicked the check button!")

    if (question.type === "Flashcard") {
        if (definition.classList.contains("hidden")) {
            definition.classList.remove("hidden");
        } else {
            definition.classList.add("hidden");
        }
    } else if (question.type === "MCQ") {
        if (selectedButton === -1) {
            return;
        }
        if(selectedButton === question.correctIndex) {
            console.log("You got it right!");
            checkButton.classList.add("correct");
            checkButton.classList.remove("incorrect");
        } else {
            console.log("You got it wrong :(");
            checkButton.classList.remove("correct");
            checkButton.classList.add("incorrect");
        }
    }
}

function updateButtonHtml (index) {
    for (var i = 0; i < buttons.length; i++) {
        if (i === selectedButton) {
            buttons[i].classList.add("selected");
        } else {
            buttons[i].classList.remove("selected");
        }
    }
}

updateFlashcardHtml(questions[0]);