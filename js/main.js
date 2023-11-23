const term = document.querySelector(".term");
const definition = document.querySelector(".definition");
const checkButton = document.querySelector("#check");
const nextButton = document.querySelector("#next");

const questions = [
    {
        term: "What is the capital of france?",
        definition: "I don't know!"
    },
    {
        term: "What is the best programming language?",
        definition: "OBviously React..."
    }, 
]
var currentIndex = 0;

checkButton.addEventListener("click", () => {
    console.log("You clicked the check button!")
    if (definition.classList.contains("hidden")) {
        definition.classList.remove("hidden");
    } else {
        definition.classList.add("hidden");
    }
});

nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex == questions.length) {
        currentIndex = 0;
    }
    updateFlashcardHtml(questions[currentIndex]);
});

function updateFlashcardHtml (question) {
    console.log(question.term);
    term.textContent = question.term;
    definition.textContent = question.definition;
    definition.classList.add("hidden");
}

updateFlashcardHtml(questions[0]);