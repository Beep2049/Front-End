//Question Array
const quizQuestions = [
    {
    question: "This band popularity was cut short by the lead singers death in 1994.", 
    options: ["Nirvana", "Soundgarden", "Hole", "Black Sabbath"],
    correctAnswer: "Nirvana",    
    },

    {
    question: "This band is credited with starting the golden age of Progressive-Rock in 1969.",
    options: ["Yes", "Cream", "King Crimson", "The Beatles"],
    correctAnswer: "King Crimson",    
    },

    {
    question: "This MC is known as 'The Supervillian of Hip Hop.'",
    options: ["Jay-Z", "MF DOOM", "Nas", "Drake"],
    correctAnswer: "MF DOOM",    
    },

    {
    question: "She is the most nominated artist in the Grammy's history.",
    options: ["Adele", "Michael Jackson", "Shania Twain", "Beyonce"],
    correctAnswer: "Beyonce",    
    },

    {
    question: "This artist is known by his nickname 'The Prince of Darkness.'",
    options: ["James Taylor", "Peter Murphy", "Ozzy Osbourne", "Steven Tyler"],
    correctAnswer: "Ozzy Osbourne",    
    },

    {
    question: "This band holds the record for the most number one songs on the Billboard 200.",
    options: ["Steely Dan", "The Beatles", "Aerosmith", "The Kinks"],
    correctAnswer: "The Beatles",    
    },

    {
    question: "This artist has been inducted into the Rock 'n Roll Hall Of Fame on 3 seperate occasions.",
    options: ["Paul McCartney", "Jeff Beck", "Dave Grohl", "Eric Clapton"],
    correctAnswer: "Eric Clapton",    
    },

    {
    question: "This artist holds the record for having the most consecutive albums to debut at number one on the billboard 200.",
    options: ["Beyonce", "Kanye West", "Taylor Swift", "Jay-Z"],
    correctAnswer: "Taylor Swift",    
    },

    {
    question: "This band is credited with the innovations in the genres of synthpop and synth related music.",
    options: ["The Human League", "Kraftwerk", "Daft Punk", "The Weekend"],
    correctAnswer: "Kraftwerk",    
    },

    {
    question: "This album holds the record for the most time spent on the billboard 200 at 991 weeks.",
    options: ["The Dark Side of the Moon", "Good Kid, M.A.A.D City", "Rumours", "Thriller"],
    correctAnswer: "The Dark Side of the Moon",    
    }
];


//Global Variables
let currentQuestionIndex = 0;
let score = 0;
let timer = 100;
let timeInterval;


//Start Quiz Function
function startQuiz(){
    //Displays & Hides respective HTML Structures
    document.getElementById("start-button").style.display = "none";
    document.getElementById("question-container").style.display = 'block';
    displayQuestion();
    startTimer();
}


//Display Question Function
function displayQuestion(){
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");

    questionText.innerHTML = "";
    answerButtons.innerHTML = "";

    questionText.innerHTML = currentQuestion.question;

    currentQuestion.options.forEach(option =>{
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("answer-button");
        answerButtons.appendChild(button);

        button.addEventListener("click", function(){
            checkAnswer(option);
        });
    });
}


//Check Answer Function
function checkAnswer(selectedOption){
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    if(selectedOption === currentQuestion.correctAnswer){
        score++; 
    }

    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length){
        displayQuestion();
    }else{
        endQuiz();
    }
}


//Timer Function
function startTimer(){
    timeInterval = setInterval(function(){
        timer--;

        document.getElementById("timer").textContent = timer;

        if(timer <= 0){
            endQuiz();
        }
    }, 1000);
}


//End Quiz Function
function endQuiz(){
    clearInterval(timeInterval);
    //Display and Hide respective html strcutre
    document.getElementById("quiz-end-container").style.display = 'block';
    document.getElementById("question-container").style.display = 'none';
    document.getElementById("controls-container").style.display = 'none';
    
    const endScore = document.getElementById("end-score");
    const endGrade = document.getElementById("end-grade");
    const scorePercentage = (score/quizQuestions.length) * 100;
    let quizRank;

    if (scorePercentage >= 90){
        quizRank = "A";
    }else if(scorePercentage >= 80){
        quizRank = "B";
    }else if(scorePercentage >= 70){
        quizRank = "C";
    }else if(scorePercentage >= 60){
        quizRank = "D";
    }else{
        quizRank = "F";
    }

    endScore.innerText = `Your Score: ${score} out of ${quizQuestions.length}`;
    endGrade.innerText = `Score: ${scorePercentage} | ${quizRank}`;     
};


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("quiz-end-container").style.display = 'none';
    document.getElementById("question-container").style.display = 'none';
    
});

document.getElementById("start-button").addEventListener("click", startQuiz);