export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.numOfQuestions = questions.length
        this.score = 0
        this.currentQuestion = 0
        document.getElementById("next").addEventListener("click", this.nextQuestion.bind(this))
        $("#tryBtn").click(() => {
            $("#finish").fadeOut(500, () => {
                $("#setting").fadeIn(500)
            })
        })
        this.showQuestion()
    }


    shuffle(array) {
        let currentIndex = array.length,  //4  [1, 2 ,3, 4]   => [4, 2, 3, 1]
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) { //1

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex); //0
            currentIndex--; //0

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    showQuestion() {

        document.getElementById("question").innerHTML = this.questions[this.currentQuestion].question

        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1;
        document.getElementById("totalNumberOfQuestions").innerHTML = this.numOfQuestions;

        let answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers]
        console.log(answers);
        this.shuffle(answers)
        console.log(answers);

        let answerRow = ""
        for (let i = 0; i < answers.length; i++) {
            answerRow += `<label class="form-check-label">
            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}"
                >
            ${answers[i]}
        </label> <br/>`
        }


        document.getElementById("rowAnswer").innerHTML = answerRow
    }

    nextQuestion() {
        console.log();

        if(Array.from(document.getElementsByName("answer")).filter(el => el.checked).length != 0){
            $("#alert").fadeOut(500)

            let useranswer = Array.from(document.getElementsByName("answer")).filter(el => el.checked)[0].value;

            let correctAnswer = this.questions[this.currentQuestion].correct_answer
    
            this.checkUserAnswer(correctAnswer, useranswer)
    
    
            this.currentQuestion++;
    
    
            if (this.numOfQuestions > this.currentQuestion) {
                this.showQuestion()
            } else {
                console.log(this.score);
                $("#score").text(this.score)
                $("#quiz").fadeOut(500, () => {
                    $("#finish").fadeIn(500)
                })
            }
        }else{
            $("#alert").fadeIn(500)
        }

        


    }

    checkUserAnswer(correctAnswer, userAnswer) {
        if (correctAnswer == userAnswer) {
            this.score++;
            $("#Correct").fadeIn(500).fadeOut(500)
        } else {
            $("#inCorrect").fadeIn(500).fadeOut(500)
        }
    }



}