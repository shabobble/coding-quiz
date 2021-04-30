// Establishes quiz questions as an array of objects

let quizQuestions = [
    {
        question: "Commonly used data types do not include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _________.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
    }, 
    {
        question: "Arrays in Javascript can be used to store _____________.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ___________ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript", "terminal / bash", "for loops", "console log"],
        correctAnswer: "console log"
    },

];

// Establishes variables

let score = 0;
let currentQuestion = 0;
let createDiv = document.createElement("div");

let currentTime = document.querySelector("#currentTime");
let startButton = document.querySelector("#startButton");
let quiz = document.querySelector("#quiz");
let container = document.querySelector("#container");

let secondsLeft = 76;
let timerInterval = 0;
let wrongPenalty = 10;
let ulCreate = document.createElement("ul");

startButton.addEventListener("click", function() {
    if (timerInterval === 0) {
        timerInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                gameOver();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(currentQuestion);
});

// Render function displays questions and answers in order until all questions are answered. 

function render(currentQuestion) {
    quiz.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < quizQuestions.length; i++) {
        let userQuestion = quizQuestions[currentQuestion].question;
        var userAnswers = quizQuestions[currentQuestion].answers;
        quiz.textContent = userQuestion;
    }

    userAnswers.forEach(function (newItem) {
        let listItem = document.createElement("li");
        listItem.textContent = newItem;
        quiz.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));  
    })
}

// Compare function checks user answers against correct answers

function compare(event) {
    let element = event.target;

    // Ensures user is clicking on a list item

    if (element.matches("li")) {

        createDiv.setAttribute("id", "createDiv");

        // If user is clicking on a list item, and that list item matches the correct answer, return "Correct!"

        if (element.textContent == quizQuestions[currentQuestion].correctAnswer) {
            
            score++;
            createDiv.textContent = "Correct!";
        // If user is clicking on a list item and that list item is not the correct answer, deduct ten seconds from timer and let user know correct answer

        } else {
            secondsLeft = secondsLeft - wrongPenalty;
            createDiv.textContent = "Wrong! The correct answer is: " + quizQuestions[currentQuestion].correctAnswer;
        }
    }

    // Advances quiz to next question in array

    currentQuestion++;

    // Ends quiz once user has finished last question in array

    if (currentQuestion >= quizQuestions.length) {

        createDiv.setAttribute("id", "createDiv");

        createDiv.textContent = "End of quiz!" + " " + "You got " + score + "/" + quizQuestions.length + " correct!";
        setTimeout(gameOver(), 5000);

    } else {
        render(currentQuestion);
    }
quiz.appendChild(createDiv);


}

function gameOver() {
    
    //Removes text of quiz and timer from the screen
    
    quiz.innerHTML = "";
    currentTime.innerHTML = "";

    // Creates an <h1> element and sends it the text "All done!"

    let createH1 = document.createElement("h1");
    createH1.textContent = "All done!"

    quiz.appendChild(createH1);

    // Creates a <p> element and appends it to the body

    let createP = document.createElement("p");

    quiz.appendChild(createP);

    // Sets the score of the game as the value of the variable timeRemaining and
    // prints it to the <p> tag created on the line above

    if (secondsLeft >= 0) {
        let timeRemaining = secondsLeft;
        let createP2 = document.createElement("p");
        clearInterval(timerInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quiz.appendChild(createP2);
    }

    // Appends "Enter your initials" label to textbox

    let createLabel = document.createElement("label");
    createLabel.textContent = "Enter your initials: ";

    quiz.appendChild(createLabel);

    // Appends input box for user initials to body 

    let createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.setAttribute("placeholder", "AAA");
    createInput.textContent = "";

    quiz.appendChild(createInput);

    // Appends submit button to body of page

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    createSubmit.addEventListener("click", function(event) {
        event.preventDefault();
        saveNewScore();
    })

    quiz.appendChild(createSubmit);
}


function saveNewScore() {
     let finalScore = {
         initials: initials.value,
         score: secondsLeft
     };

    if (finalScore.initials == '') {
        alert('You must enter your initials!');
        return
    
    }

     let allScores = localStorage.getItem("allScores");

     if (!allScores) {
         allScores = [];
     } else {
         allScores = JSON.parse(allScores);
     }
    allScores.push(finalScore);
    let newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);

     window.location.replace("./scores.html");
}


