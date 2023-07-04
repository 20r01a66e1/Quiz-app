const questions = [
    {
        question : "Commonly used data types DO NOT include:",
        answers : [
            {text:"strings",correct:false},
            {text:"booleans",correct:false},
            {text:"alerts",correct:true},
            {text:"numbers",correct:false},
        ]
    },
    {
        question : "Arrays in JavaScript can be used to store ______.",
        answers : [
            {text:"numbers and strings",correct:false},
            {text:"other arrays",correct:false},
            {text:"booleans",correct:false},
            {text:"all of the above",correct:true},
        ]
    },
    {
        question : "String values must be enclosed within _____ when being assigned to variables.",
        answers : [
            {text:"commas",correct:false},
            {text:"curly brackets",correct:false},
            {text:"quotes",correct:true},
            {text:"parentheses",correct:false},
            
        ]
    },
    {
        question : "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers : [
            {text:"JavaScript",correct:false},
            {text:"terminal/bash",correct:false},
            {text:"for loops",correct:false},
            {text:"console.log",correct:true},
        ]
    },
    {
        question : "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        answers : [
            {text:"break",correct:true},
            {text:"stop",correct:false},
            {text:"halt",correct:false},
            {text:"exit",correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });    
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore(){
    resetState();
    questionElement.innerHTML = "you scored " + score + " out of " + questions.length +"!" ;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();