var colors = ["Blue", "Red", "Green", "Yellow"];  
//var extraColors = ["Blue", "Red", "Green", "Yellow", "White", "Orange", "HotPink", "Purple", "powderblue", "aqua"]; 
//var extraColors = ["DarkOrange", "HotPink", "DarkOrchid", "SeaShell", "MediumTurquoise","lightsalmon", "khaki", "powderblue", "purple", "Orange", "lightcyan"];
//var extraColors = ["Blue", "Red", "Green", "Yellow", "White", "linen", "Grey", "lightgrey", "mintcream"]; 
//var extraColors = ["Blue", "Red", "Green", "Yellow"] //"Blue", "Red", "Green", "Yellow","Blue"]
//var extraColors = ["Pink", "Purple", "Orange", "Turquoise"]
//var extraColors = ["white", "lightgrey", "#f2f2f2", "#e6e6e6", "#d9d9d9"]; 

var extraColors = ["#ff4d4d", "#ff6666", "#ff3333", "#ff5c33", //red
                   "#00e600", "#70db70", "#00cc00", "#00b33c", //green
                   "#4d79ff", "#668cff", "#1a53ff", "#4d4dff", //blue
                   "#ffff80", "#ffffb3", "#ffff4d", "#ffff66"]; //yellow


var colorsLength = colors.length; 
var extraColorsLength = extraColors.length; 
var gridSize = 1; 
var gridIncrementor = 2; // grid grows after achieving this many correct answers at the previous grid size
var results = document.getElementById('resultsContainer'); 
var correct = document.getElementById("correct");
var correctInt = 0; // keeps track of no. of correct guesses 
var answer = 'correct'; 
var board = document.getElementById('GameBoard'); 
    

function startGame() {
    setInterval(timer, 1000);
    reset();
}

function checkColor(color, correctAnswer){ 
    if(color===correctAnswer){
        correctInt++;
        $('#resultsContainer').css('background-color', 'lightgreen'); 
        //results.style.backgroundColor = "LightGreen"; 
        answer = 'correct'; 
    } else { 
        console.log("you clicked ", color, " but the answer was ", correctAnswer); 
        //results.style.backgroundColor = "#ff3333"; 
        $('#resultsContainer').css('background-color', '#ff3333'); 
        answer = 'incorrect'; 
    }
    reset(); 
    correct.innerHTML = correctInt; // update #correct span element with no. of correct guesses 
}


function makeBoard() { 

    gridSize++; 
    var divsToAdd; 

    if (gridSize == 2) { 
        divsToAdd = 4; 
    } else {
        divsToAdd = gridSize**2 - (gridSize - 1)**2
    }

    for (let i = 0; i < divsToAdd; i++) { 
        var newSqu = document.createElement('div'); 
        board.appendChild(newSqu); 
    }

    $('#GameBoard div').css({'width': (300/gridSize).toString() + "px", 'height' : (300/gridSize).toString() + "px"})
    $('#GameBoard div').addClass('color'); 
    
    board.style.gridTemplateColumns = "auto ".repeat(gridSize); 
    board.style.gridTemplateRows = "auto ".repeat(gridSize); 

}

function setColourAndEvent(divElement, squCol, corAns) { 

    divElement.style.backgroundColor = squCol; 
    let onclick = "checkColor('" + squCol + "','" + corAns + "')"; 
    //let onclick = "checkColor('".concat(squCol,"','",corAns,"')");
    divElement.setAttribute("onclick", onclick);

}

function defineColours(corAns) { 

    var allSquares = document.getElementById("GameBoard").childNodes;
    var newColors = colors.slice(); 

    if (allSquares.length == colorsLength) { 

        for (let i = 0; i < allSquares.length; i++) { 
            randomIndex = Math.floor(Math.random()*newColors.length); 
            var squareColour = newColors[randomIndex]; 
            newColors.splice(randomIndex, 1); 
            setColourAndEvent(allSquares[i], squareColour, corAns); 
        } 

    } else { 

        // create a new list with all the possible indexes for allSquares
        // generate a random index from this list by generating a number between 0 and the length
        // splice the list to remove the index 
        // set the colour and event for the chosen index: 
        // ->for the first four iterations, only choose options from the colors list
        //      -> splice the chosen color so that the next choice is unique 
        // ->for the remaining iterations, can choose from the extraColors list as well 
        // repeat; can guarantee unique index because we have removed the previous one from the list of possible indexes 

        var possibleIndexes = []; 

        for (let i=0; i<allSquares.length;i++) { 
            possibleIndexes.push(i); 
        }
 
        for (let i = 0; i < allSquares.length; i++) { 

            // choose square from Grid: 
            var randomIndex = Math.floor(Math.random()*possibleIndexes.length);
            var chosenIndex = possibleIndexes[randomIndex]; 
            possibleIndexes.splice(randomIndex,1); 

            // choose colour: 
            if (i < colorsLength) { 
                var colourIndex = Math.floor(Math.random()*newColors.length); 
                var squareColour = newColors[colourIndex]; 
                newColors.splice(colourIndex, 1); 
            } else { 
                var colourIndex = Math.floor(Math.random()*extraColorsLength); 
                var squareColour = extraColors[colourIndex]; 
            }
            //console.log("chosen index: ", chosenIndex, "square colour: ", squareColour); 
            setColourAndEvent(allSquares[chosenIndex], squareColour, corAns); 
        }
    }
} 



function reset(){

    var random1 = Math.floor(Math.random()*2); // either 0 or 1 
    if(random1==0){
        var color1 = document.getElementById("color1"); // top prompt is color1
        var color2 = document.getElementById("color2"); // bottom prompt is color2
        //var color1 = $('#color1'); 
        //var color2 = $('#color2'); 
    }else{
        var color2 = document.getElementById("color1"); // top prompt is color2
        var color1 = document.getElementById("color2"); // bottom prompt is color1
        //var color1 = $('#color2'); 
        //var color2 = $('#color1'); 
    }
   
    // NOTE: color1 and color2 are javascript VARIABLES not html tags! 
    // We choose randomly each time whether the top prompt is 'color1' or 'color2' 
    // Or, if the bottom prompt is 'color1' or 'color2'

    document.getElementById("start").style.display = "none";
    var random = Math.floor(Math.random() * colorsLength); 
    var correctAnswer = colors[random]; 
    color1.innerHTML = correctAnswer; 
    color2.style.color = correctAnswer; 
    // NOTE: color1 prompt always has correct TEXT 
    //       color2 prompt always has correct COLOUR

    console.log("correct ans: ", correctAnswer); 

    // Now, we need to change the COLOUR of colour1 prompt 
    // and the TEXT of color2 prompt 

    // list index: [ 0 , 1 , 2 , 3 ]

    var coloursCopy = colors.slice(); 
    coloursCopy.splice(coloursCopy.indexOf(correctAnswer),1); 
    const rand1 = Math.floor(Math.random()*coloursCopy.length); 
    color2.innerHTML = coloursCopy[rand1]; 
    coloursCopy.splice(rand1, 1); 
    color1.style.color = coloursCopy[Math.floor(Math.random()*coloursCopy.length)]; 
    
    color1.style.display = "block";
    color2.style.display = "block";
    
    if (correctInt%gridIncrementor == 0 && answer == 'correct') { 
        makeBoard(); 
    } 
    defineColours(correctAnswer); 
    correct.innerHTML = correctInt; 

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
