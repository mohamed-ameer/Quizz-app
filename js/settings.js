import {Quiz} from "./quiz.js"

export class Settings{    
    constructor(){
        this.categoryElement = document.getElementById("category");
        this.difficultyElement = document.getElementsByName("difficulty")
        this.numberOfQuestionsElement = document.getElementById("numberOfQuestions")
        document.getElementById("startBtn").addEventListener("click",this.startQuiz.bind(this))
    }
    async startQuiz(){
        let category = this.categoryElement.value;
        let difficulty = Array.from(this.difficultyElement).filter( (el) => {return el.checked} )[0].value;
        let numOfQuestions = this.numberOfQuestionsElement.value;
        let API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`
        if(numOfQuestions == ""){
            $("#alert1").fadeIn(500)
        }else{
            $("#alert1").fadeOut(500)
        }
        let questions = await this.fetchAPI(API)
        if (questions.length > 0){
            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(500)
            })
            let quiz = new Quiz(questions)
        }
    }
    async fetchAPI(API){
        let response = await fetch(API)
        response = await response.json();
        return response.results;
    }  
}