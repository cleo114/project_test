var colors = ["Blue", "Red", "Green", "Yellow"];  
//var colors = ["Pink", "Purple", "Aqua", "Lavender"]; 
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
var gridSize = 1; //note: starts at 1 since first call to makeBoard() will increment it to 2
var gridIncrementor = 3; // grid grows after achieving this many correct answers at the previous grid size
var correctInt = 0; // keeps track of no. of correct guesses 
var answer = 'correct'; 
var board = document.getElementById('GameBoard'); 
var countdown = 30;
    
$('#middlebox').css('display','none'); 

function startGame() {
    setInterval(timer, 1000);
    board.style.display = 'grid'; 
    reset();
}

function checkColor(color, correctAnswer){ 
    if(color==correctAnswer){
        correctInt++;
        $('#resultsContainer').css('background-color', 'lightgreen'); 
        answer = 'correct'; 
    } else { 
        console.log("you clicked ", color, " but the answer was ", correctAnswer); 
        $('#resultsContainer').css('background-color', '#ff3333'); 
        answer = 'incorrect'; 
    }
    reset(); 
    $('#correct').text(correctInt);  
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
        newSqu.classList.add('color'); 
        board.appendChild(newSqu); 
    }

    $('#GameBoard div').css({'width': (300/gridSize).toString() + "px", 'height' : (300/gridSize).toString() + "px"}); 
    board.style.gridTemplateColumns = "auto ".repeat(gridSize); 
    board.style.gridTemplateRows = "auto ".repeat(gridSize); 

}

function setColourAndEvent(divElement, squCol, corAns) { 

    divElement.style.backgroundColor = squCol; 
    divElement.setAttribute("onclick","checkColor('" + squCol + "','" + corAns + "')"); 

}

function defineColours(corAns) { 

    var allSquares = document.getElementById("GameBoard").childNodes;
    var newColors = colors.slice(); 
    var totalSquares = allSquares.length; 

    if (totalSquares == colorsLength) { 

        for (let i = 0; i < totalSquares; i++) { 
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

        for (let i=0; i<totalSquares;i++) { 
            possibleIndexes.push(i); 
        }
 
        for (let i = 0; i < totalSquares; i++) { 

            // choose square from Grid: 
            var randomIndex = Math.floor(Math.random()*possibleIndexes.length);
            var chosenIndex = possibleIndexes[randomIndex]; 
            possibleIndexes.splice(randomIndex,1); 
            var colourIndex; 
            var squareColour; 

            // choose colour: 
            if (i < colorsLength) { 
                colourIndex = Math.floor(Math.random()*newColors.length); 
                squareColour = newColors[colourIndex]; 
                newColors.splice(colourIndex, 1); 
            } else { 
                colourIndex = Math.floor(Math.random()*extraColorsLength); 
                squareColour = extraColors[colourIndex]; 
            }
            setColourAndEvent(allSquares[chosenIndex], squareColour, corAns); 
        }
    }
} 

function reset(){

    $('#start').css('display','none'); 

    // randomly choose correct answer: 
    var random = Math.floor(Math.random() * colorsLength); 
    var correctAnswer = colors[random]; 
    console.log("correct ans: ", correctAnswer); 

    // randomly choose text and colour for the attributes which aren't the correct answer
    var coloursCopy = colors.slice(); 
    coloursCopy.splice(coloursCopy.indexOf(correctAnswer),1); 
    const rand1 = Math.floor(Math.random()*coloursCopy.length); 
    const textChoice = coloursCopy[rand1]; 
    coloursCopy.splice(rand1, 1); 
    const rand2 = Math.floor(Math.random()*coloursCopy.length); 
    const colourChoice = coloursCopy[rand2];

    const random1 = Math.floor(Math.random()*2); // either 0 or 1 

    if(random1==0){
        $('#color1').text(correctAnswer); 
        $('#color2').css('color', correctAnswer); 
        $('#color2').text(textChoice); 
        $('#color1').css('color', colourChoice); 
    } else {
        $('#color2').text(correctAnswer); 
        $('#color1').css('color', correctAnswer); 
        $('#color1').text(textChoice); 
        $('#color2').css('color', colourChoice); 
    }
   
    $('#color1').css('display', 'block'); 
    $('#color2').css('display', 'block'); 
    
    if (correctInt%gridIncrementor == 0 && answer == 'correct') { 
        makeBoard(); 
    } 

    defineColours(correctAnswer); 
    $('#correct').text(correctInt); 
} 

function timer(){
    document.getElementById("time").innerHTML = countdown;
    if(countdown==0){
        pOst();
        clearInterval(timer);
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





