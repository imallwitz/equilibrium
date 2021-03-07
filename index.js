
var rulesDisplayed = {
    animal: "",
    id: false
};

var board = document.getElementById('grid-container');

var spaces = board.getElementsByClassName('grid-item');


function displayRules(elmnt) {
    
    var creature = elmnt.id;

    if ( rulesDisplayed.id == false || rulesDisplayed.animal != creature) {
        
        document.getElementById("rule-box").innerHTML = 
            `<div class="rule" onclick="showPossibleAdd()">
                <h3>add one ${creature}</h3>
                <img src="images/add_${creature}.png">
            </div>
            <div class="rule" onclick="toggleRemovable()">
                <h3>remove one ${creature}</h3>
                <img src="images/remove_${creature}.png">
            </div>`;

        rulesDisplayed.id = true;
        rulesDisplayed.animal = creature;

    } else if (rulesDisplayed.animal == creature) {

        document.getElementById('rule-box').innerHTML = "";

        rulesDisplayed.id = false;
        rulesDisplayed.animal = "";
    }
    
}

function gridClicked(box) {

    if (box.classList.contains("removable")) {
        
        box.innerHTML = "";
        toggleRemovable();
        box.classList.remove(`${rulesDisplayed.animal}s`);

    } else if (box.classList.contains("possible")) {

        box.classList.add(`${rulesDisplayed.animal}s`);
        box.classList.remove("possible");
        removePossibleAdd();
    }
}

function showPossibleAdd() {

    for (var i = 0; i < spaces.length; i +=1 ) {

        var currbox = spaces[i];

        if (currbox.innerHTML.trim().length == 0) {

            currbox.classList.add("possible");

            currbox.innerHTML = `<img src='images/${rulesDisplayed.animal}_pic.png'>`;

        }
    }

}

function removePossibleAdd() {
   
    for (var f = 0; f < spaces.length; f++) {
       
        var currbox = spaces[f];

        if (currbox.classList.contains("possible")) {

            currbox.innerHTML = "";

            currbox.classList.remove("possible");

        }
    }
}

function toggleRemovable() {
    
    for (var j = 0; j < spaces.length; j ++) {

        var currbox = spaces[j];

        if (currbox.classList.contains(`${rulesDisplayed.animal}s`)) {
            
            currbox.classList.toggle("removable");

        }
    }
}
