const questions = [
    {
        question: "What is (void*)0?",
        answers: [
            { text: "Representation of NULL pointer", correct: true },
            { text: "Representation of void pointer", correct: false },
            { text: "Error", correct: false },
            { text: "None of above", correct: false },

        ]
    },
    {
        question: "In which header file is the NULL macro defined?",
        answers: [
            { text: "stdio.h", correct: false },
            { text: "stddef.h", correct: false },
            { text: "stdio.h and stddef.h", correct: true },
            { text: "math.h", correct: false },

        ]
    },
    {
        question: "What are the types of linkages?",
        answers: [
            { text: "Internal and External", correct: false },
            { text: "External, Internal and None", correct: true },
            { text: "External and None", correct: false },
            { text: "Internal", correct: false },

        ]
    },
    {
        question: "How would you round off a value from 1.66 to 2.0?",
        answers: [
            { text: "ceil(1.66)", correct: true },
            { text: "floor(1.66)", correct: false },
            { text: "roundup(1.66)", correct: false },
            { text: "roundto(1.66)", correct: false },

        ]
    },

];

let question = document.getElementById('quesion');

let answerButtons = document.querySelector('.answers-div');

let nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;

let score = 0;

// function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
};

// function to display the current question and that of there answer option
function showQuestion() {
    resetQuiz();
    let currentQuestion = questions[currentQuestionIndex];
    let currentQuestionNumber = currentQuestionIndex + 1;
    question.innerText = currentQuestionNumber + ". " + currentQuestion.question;

    // looping through all the options for the current question
    currentQuestion.answers.forEach((answer) => {
        let answerBtn = document.createElement('button');
        answerBtn.classList.add('answer-btn');
        answerBtn.innerText = answer.text;
        answerButtons.appendChild(answerBtn);

        if(answer.correct) {
            answerBtn.dataset.correct = answer.correct;
        };
        answerBtn.addEventListener('click', selectAnswer);
    });
};


// function to select the answer 
function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset['correct'] === "true";
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    // disabling the answer buttons after select any answer button
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct')
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";

}

// function to reset the quiz 
function resetQuiz() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
};

// function to show the score after the quiz is completed
function showScore() {
    question.innerText = `your score is ${score} out of ${questions.length}`;
    question.style.textAlign = "center";
    question.style.fontSize = "20px";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };

    nextButton.innerText = 'Play Again';
}

// function to show the next question
function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


// applying event handler for the next button 
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        showNextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
