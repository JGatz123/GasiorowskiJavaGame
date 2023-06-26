var startBtn = document.querySelector("#startgame");
startBtn.addEventListener("click", startgame);
var timerEl = document.getElementById('countdown');
var currentquestion = 1;
var timeLeft = 60;
var score = 0;

function starttimer(){
  

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    
    
    if ( timeLeft > 1 ) {
      timerEl.textContent = timeLeft + " seconds left";
        timeLeft --;
    }else if (timeLeft ===1 ) {
      timerEl.textContent = timeLeft + " second left";
      timeLeft--;
    } else if (timeLeft ===0) { 
      timerEl.textContent = "GAME OVER";
      clearInterval(timeInterval);

      var finprompt = prompt(`Your score is ${score}. Please enter your initials`);
      // create and OBJECT which holds the user Data
      var userData = {
        userName: finprompt,   // user's initials
        userScore: score
      }

      console.log('User Data: ', userData)

      // save users score in local storage
      var storedData = JSON.parse(localStorage.getItem('userscores') || "[]" );
      console.log ("stored data", storedData)
      // add current users score to stored data
      storedData.push(userData)
      // put stored data into local storage
      localStorage.setItem("userscores", JSON.stringify(storedData))
      // show highscores page
      highscore()
      }
   }, 1000);
}



function startgame(){
    // hide highscore page if user clicked view highscores
    var highscoresection = document.querySelector("#highscorebox")
    highscoresection.style.display = "none"
    // first action upon starting game is to activate the function starttimer//
    starttimer()
    //console.log("Starting Game");//

    // hide homescreen text
    var homescreen = document.querySelector("#intro-section")
    homescreen.style.display = "none"
    //show questions upon hiding homescreen//
    
    nextquestion()
    

}  
 
function nextquestion(){
    //puts next question on screen
    // select current question
    // by using backticks, you can embed a variable in a sstring. This is called a template literal
    var question = document.querySelector(`#q${currentquestion}`)      // same as: ("#q" + currentquestion)
    question.style.display = "inline"

    // put next question on screen after clicking button
    // each button for answer choices needs to be made into an event listener
    var answrbtns = document.querySelectorAll(`.answrbtn${currentquestion}`)
    
    // loop through answer buttons because there are multiple answer choices
    for (var x = 0; x < answrbtns.length; x++) {
            answrbtns[x].addEventListener('click', function(event) {
            var element = event.target
        
                
            //variablename[x] is used to determine whether the button clicked is correct or not

            // check to  see if user clicked correct answer
            if (element.getAttribute('data-correct') === "yes"){
                alert('correct!')
                score += 1
            } else {
                alert('incorrect!')
                timeLeft -=7;
            }
            //console.log(element.textContent)  // this console logs the text of the button that you click on
            //console.log the data attribute also
            //console.log(element.getAttribute('data-correct'))


            // go to next question

            // hide current question after click
            question.style.display = "none"
            // need to check, are there any more questions?  if so, go to next question. If not, go to final screen. 
            if (currentquestion < 6) {
                currentquestion +=1
                nextquestion()
            } else {
                timeLeft = 1
            }
             
        })
    }
}


function highscore () {
    // allows user to view highscores
    var highscoresection = document.querySelector("#highscorebox")
    highscoresection.style.display = "inline"
    // need to get highscores from local storage
    var storedData = JSON.parse(localStorage.getItem('userscores'));
    // sort highscores highest to lowest score
    storedData.sort((a, b) => (a.userScore - b.userScore)).reverse()
    // stored data is an array
    var hscorelist = document.querySelector("#hscorelist")
    
    // loop through items in stored data to create li tags for them and add to page
    for (var i = 0; i<storedData.length; i++){

       var highscoreInfo = document.createElement("li")
       highscoreInfo.textContent = `${storedData[i].userName}: ${storedData[i].userScore}`
       hscorelist.appendChild(highscoreInfo)
    }
}

var vhighscores = document.querySelector("#hscore")
vhighscores.addEventListener("click", highscore)




// track highscores upon filling out inits
//make view highscores interactable
  

  