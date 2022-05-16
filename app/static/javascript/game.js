var colors = ["Blue", "Red", "Green", "Yellow"];  
var extraColors = ["Blue", "Red", "Green", "Yellow", "White", "Grey"]; 

var colorsLength = colors.length; 
var extraColorsLength = extraColors.length; 
var clicks = 0;
var gridSize = 2; 
    

function startGame(){
    //setInterval(timer, 1000);
    reset();

}

var checkmark = document.getElementById("checkmark");
var wrong = document.getElementById("wrong");
var correct = document.getElementById("correct");
var correctInt = 0; // keeps track of no. of correct guesses 


function checkColor(color, correctAnswer){
    if(color===correctAnswer){
        console.log("Thats correct"); 
        correctInt++;
        checkmark.classList.add("fadeAway"); // add class 'fadeAway' -> i.e. correct mark fades away 
    }else{
        wrong.classList.add("fadeAway"); // wrong mark fades away
    }
    setTimeout(function(){
        checkmark.classList.remove("fadeAway");
        wrong.classList.remove("fadeAway");
    },500); // runs the function after 0.5 seconds (removes added classes)
    reset(); 
    correct.innerHTML = correctInt; // update #correct span element with no. of correct guesses 
}

function makeBoard(numCorrect) { 

    if (numCorrect%2 == 0) { 

        if (numCorrect != 0) { 
            gridSize++; 
            } 

        console.log("grid size: ", gridSize); 
        var bod = document.getElementById('body'); 
        bod.removeChild(document.getElementById('GameBoard')); 
        var newBoard = document.createElement('div'); 
        newBoard.setAttribute('id', 'GameBoard'); 
        bod.appendChild(newBoard); 

        for (let i = 0; i < gridSize*gridSize; i++ ) { 
            var newSqu = document.createElement('div'); 
            newBoard.appendChild(newSqu); 
            newSqu.style.width = (300/gridSize).toString() + "px"; 
            newSqu.style.height = (300/gridSize).toString() + "px"; 
        }  

        newBoard.style.gridTemplateColumns = "auto ".repeat(gridSize); 
        newBoard.style.gridTemplateRows = "auto ".repeat(gridSize); 
    } 
}


function defineColours(corAns) { 

    var allSquares = document.getElementById("GameBoard").childNodes;

    var alreadyChosen = []; 
    var alreadyChosen2 = []; 
    var randomIndex = 0; 

    if (allSquares.length == colorsLength) {

            var randomIndex = Math.floor(Math.random()*colorsLength); 
            var chosenCol = colors[randomIndex]; 
            while (alreadyChosen.indexOf(chosenCol) == -1 || alreadyChosen.length < colorsLength) { 
                if (alreadyChosen.indexOf(chosenCol) == -1) { 
                    alreadyChosen.push(chosenCol); 
                }
                randomIndex = Math.floor(Math.random()*colorsLength);
                chosenCol = colors[randomIndex];
            }

            for (let i = 0; i < allSquares.length; i++) { 
                allSquares[i].style.backgroundColor = alreadyChosen[i]; 
                allSquares[i].classList.add(alreadyChosen[i], "color"); 
                let onclick = "checkColor('".concat(alreadyChosen[i],"','",corAns,"')");
                allSquares[i].setAttribute("onclick", onclick);

            } 
        } else { 

            var randomIndex = Math.floor(Math.random()*extraColorsLength); 
            var chosenCol2 = extraColors[randomIndex]; 
            while (alreadyChosen2.indexOf(chosenCol2) == -1 || alreadyChosen2.length < extraColorsLength) { 
                if (alreadyChosen2.indexOf(chosenCol2) == -1) { 
                    alreadyChosen2.push(chosenCol2); 
                }
                randomIndex = Math.floor(Math.random()*extraColorsLength);
                chosenCol2 = extraColors[randomIndex];
            }

            //var newList = alreadyChosen2.slice(); 
            //console.log(alreadyChosen2); 
            //console.log(newList); 
            //newList = newList.slice(4,5).concat(newList.slice(0,1), newList.slice(5,6), newList.slice(1,4))  
            //console.log(newList); 
            //console.log(alreadyChosen2); 
            
            var newColors = colors.slice(); 

            for (let i = 0; i < allSquares.length; i++) { 
                if (i < colorsLength) { 
                    randomIndex = Math.floor(Math.random()*newColors.length); 
                    var squareColour = newColors[randomIndex]; 
                    newColors.splice(randomIndex, 1); 
                    //console.log(newColors);
                } else { 
                    randomIndex = Math.floor(Math.random()*extraColorsLength); 
                    squareColour = extraColors[randomIndex]; 
                    //console.log(squareColour);
                }
                allSquares[i].style.backgroundColor = squareColour; 
                allSquares[i].classList.add(squareColour, "color"); 
                let onclick = "checkColor('".concat(squareColour,"','",corAns,"')");
                allSquares[i].setAttribute("onclick", onclick);

            } 
        }
    } 


    /*
    for (let i = 0; i < allSquares.length; i++) {
        var j = i%4; 

        if (allSquares.length < 4 || i < 4) {
        //var alreadyChosen = []; 
        //var randomIndex = Math.floor(Math.random()*allSquares.length); 
        allSquares[i].style.backgroundColor = colors[j]; 
        allSquares[i].classList.add(colors[j], "color"); 
        } else {
            
        var randomIndex = Math.floor(Math.random()*7)
        allSquares[i].style.backgroundColor = extraColors[randomIndex]; 
        allSquares[i].classList.add(colors[j], "color"); 
        }
        //allSquares[i].addEventListener("click", function() { checkColor(colors[j], corAns);  } ); 
        let onclick = "checkColor('".concat(colors[j],"','",corAns,"')");
        allSquares[i].setAttribute("onclick", onclick);
    } 

}
*/

function reset(){

    console.log("correct guesses: ", correctInt); 

    var random1 = Math.floor(Math.random()*2); // either 0 or 1 
    if(random1==0){
        var color1 = document.getElementById("color1"); // top prompt is color1
        var color2 = document.getElementById("color2"); // bottom prompt is color2
    }else{
        var color2 = document.getElementById("color1"); // top prompt is color2
        var color1 = document.getElementById("color2"); // bottom prompt is color1
    }
   
    // NOTE: color1 and color2 are javascript VARIABLES not html tags! 
    // We choose randomly each time whether the top prompt is 'color1' or 'color2' 
    // Or, if the bottom prompt is 'color1' or 'color2'

    document.getElementById("start").style.display = "none";
    var random = Math.floor(Math.random() * colorsLength); // random no. between 0 and 3
    var correctAnswer = colors[random]; // choose colour randomly from list
    color1.innerHTML = correctAnswer; // set TEXT of first 'colour prompt' to be correct colour
    color2.style.color = correctAnswer; // set LITERAL COLOUR of second 'colour prompt' to be correct colour
    // NOTE: color1 prompt always has correct TEXT 
    //       color2 prompt always has correct COLOUR

    console.log("correct ans: ", correctAnswer); 

    // Now, we need to change the COLOUR of colour1 prompt 
    // and the TEXT of color2 prompt 

    // list index: [ 0 , 1 , 2 , 3 ]
    if(random+1==4){
        color2.innerHTML = colors[random-3]; // if index=3, go to (3)-(3)=0
    }else{
        color2.innerHTML = colors[random+1]; // increment UP
    }
    if(random-1==-1){
        color1.style.color = colors[random+3]; // if index=0, go to (0)+(3)=3
    }else{
        color1.style.color = colors[random-1]; // increment DOWN
    }

    color1.style.display = "block";
    color2.style.display = "block";

    makeBoard(correctInt); 
    defineColours(correctAnswer); 

} 


    /*
    for (let i = 0; i < colors.length; i++) {
        document.getElementById(colors[i]).addEventListener("click", function() { 
            if(color===correctAnswer){
                correctInt++;
                checkmark.classList.add("fadeAway"); // add class 'fadeAway' -> i.e. correct mark fades away 
            }else{
                wrong.classList.add("fadeAway"); // wrong mark fades away
            }
            setTimeout(function(){
                checkmark.classList.remove("fadeAway");
                wrong.classList.remove("fadeAway");
            },500); // runs the function after 0.5 seconds (removes added classes)
            reset(); 
            correct.innerHTML = correctInt; // update #correct span element with no. of correct guesses 
        })
        
    }

    /* 
    addClick("Blue", correctAnswer);
    addClick("Red", correctAnswer);
    addClick("Green", correctAnswer);
    addClick("Yellow", correctAnswer);
    */ 


/*
function addClick(color, correctAnswer){
    var colorSpan = document.getElementById(color); // pass colors as strings into function and then retrieve corresponding element
    let onclick = "checkColor('".concat(color,"','",correctAnswer,"')");
    // onclick is a function call e.g. checkColor('Blue','Red') where red is the correct answer

    var col = color; 
    var ans = correctAnswer; 
    // console.log(col, ans); 
    // colorSpan.addEventListener("click", function() { checkColor(col, ans); } ); 

    // colorSpan.addEventListener("click", function() { onclick } ) <- DOESNT WORK
    colorSpan.setAttribute("onclick", onclick); 
    // set event listener for 'onclick' attribute which calls checkColor(color, correctAnswer) function
}
*/ 



var countdown = 30;
function timer(){
    document.getElementById("time").innerHTML = countdown;
    if(countdown==0){
        pOst();
        clearInterval(timer);
        alert("Game Over. Score: " + correctInt);
        location.reload();
    }
    countdown--;
}


function pOst() {
    $.ajax({
        type: "POST",
        url: "/game",
        data: {"score": correctInt},

    })
 }




/*

var colors = ["Blue", "Red", "Green", "Yellow"];


var clicks = 0;
    

function startGame(){
    setInterval(timer, 1000);
    reset();

}

var checkmark = document.getElementById("checkmark");
var wrong = document.getElementById("wrong");
var correct = document.getElementById("correct");
var correctInt = 0
function checkColor(color, correctAnswer){
    if(color===correctAnswer){
        correctInt++;
        checkmark.classList.add("fadeAway");
    }else{
        wrong.classList.add("fadeAway");
    }
    setTimeout(function(){
        checkmark.classList.remove("fadeAway");
        wrong.classList.remove("fadeAway");
    },500);
    reset();
    correct.innerHTML = correctInt;
}

function reset(){
    var random1 = Math.floor(Math.random()*2); // either 0 or 1 
    if(random1==0){
        var color1 = document.getElementById("color1");
        var color2 = document.getElementById("color2");
    }else{
        var color2 = document.getElementById("color1");
        var color1 = document.getElementById("color2");
    }
    document.getElementById("start").style.display = "none";
    var random = Math.floor(Math.random() * 4); // random no. between 0 and 3
    var correctAnswer = colors[random];
    color1.innerHTML = correctAnswer;
    color2.style.color = correctAnswer;
    if(random+1==4){
        color2.innerHTML = colors[random-3];
    }else{
        color2.innerHTML = colors[random+1];
    }
    if(random-1==-1){
        color1.style.color = colors[random+3];
    }else{
        color1.style.color = colors[random-1];
    }
    color1.style.display = "block";
    color2.style.display = "block";
    addClick("Blue", correctAnswer);
    addClick("Red", correctAnswer);
    addClick("Green", correctAnswer);
    addClick("Yellow", correctAnswer);
}
function addClick(color, correctAnswer){
    var colorSpan = document.getElementById(color);
    let onclick = "checkColor('".concat(color,"','",correctAnswer,"')");
    colorSpan.setAttribute("onclick", onclick);
}




var countdown = 30;
function timer(){
    document.getElementById("time").innerHTML = countdown;
    if(countdown==0){
        pOst();
        clearInterval(timer);
        alert("Game Over. Score: " + correctInt);
        location.reload();
    }
    countdown--;
}


function pOst() {
    $.ajax({
        type: "POST",
        url: "/game",
        data: {"score": correctInt},

    })
 }

*/
