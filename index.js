
var rulesDisplayed = {
    animal: "",
    id: false,
    otterAdded: false,
    otterRemoved: false,
    urchinAdded: false,
    urchinRemoved: false,
    kelpAdded: false,
    kelpRemoved: false,
    jellyAdded: false,
    jellyRemoved: false
};

var board = document.getElementById('grid-container');

var spaces = board.getElementsByClassName('grid-item');

function init() {
    countPop();
}

function displayRules(elmnt) {
    
    var creature = elmnt.id;

    if ( rulesDisplayed.id == false || rulesDisplayed.animal != creature) {
        
        document.getElementById("rule-box").innerHTML = 
            `<div class="rule" id="add-rule" onclick="showPossibleAdd()">
                <h3>introduce one ${creature}</h3>
            </div>
            <div class="rule" id="remove-rule" onclick="toggleRemovable()">
                <h3>rehome one ${creature}</h3>
            </div>`;

        rulesDisplayed.id = true;
        rulesDisplayed.animal = creature;

        // show the rules for this animal and not the others
        showAddRules();
        showRemoveRules();

    } else if (rulesDisplayed.animal == creature) {

        document.getElementById('rule-box').innerHTML = "";

        rulesDisplayed.id = false;
        rulesDisplayed.animal = "";

       // hide all rules

    }

    document.getElementById("otter").classList.remove("selected");
    document.getElementById("urchin").classList.remove("selected");
    document.getElementById("kelp").classList.remove("selected");
    document.getElementById("jelly").classList.remove("selected");
    elmnt.classList.toggle("selected");
    
}

function gridClicked(box) {

    // removing a creature
    if (box.classList.contains("removable")) {
        
        box.innerHTML = "";
        toggleRemovable();
        box.classList.remove(`${rulesDisplayed.animal}s`);
        box.classList.add("empty");

        removeRules(`${rulesDisplayed.animal}`);

        showRemoveRules();

        // adding a creature
    } else if (box.classList.contains("possible")) {

        box.classList.add(`${rulesDisplayed.animal}s`);
        box.classList.remove("possible");
        box.classList.remove("empty");
        removePossibleAdd();

        addRules(`${rulesDisplayed.animal}`);

        showAddRules();
    }

    countPop();
}

function showPossibleAdd() {

    for (var i = 0; i < spaces.length; i +=1 ) {

        var currbox = spaces[i];

        if (currbox.classList.contains("empty")) {

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

function addRules(c) {

    // add 1 otter -- remove 2 urchins, add 2 kelp, add 2 jellys
    if (c == "otter") {
        
        removeCreatures("urchin", 2);
        addCreatures("kelp", 2);
        addCreatures("jelly", 2);

        rulesDisplayed.otterAdded = true;

        // add 1 urchin -- remove 2 kelps, remove 2 jellys
    } else if (c == "urchin") {

        removeCreatures("kelp", 2);
        removeCreatures("jelly", 2);

        rulesDisplayed.urchinAdded = true;

        // add 1 kelp -- add 1 jelly
    } else if (c == "kelp") {

        addCreatures("jelly", 1);

        rulesDisplayed.kelpAdded = true;

        // add 1 jelly -- nothing
    } else if (c == "jelly") {

        rulesDisplayed.jellyAdded = true;

    }

    

}

function removeRules(c) {
    
    // remove 1 otter -- add 2 urchins, remove 4 kelps, remove 4 jellys
    if (c == "otter") {

        addCreatures("urchin", 2);
        removeCreatures("kelp", 4);
        removeCreatures("jelly", 4);

        rulesDisplayed.otterRemoved = true;

    // remove 1 urchin -- add 1 kelp, add 1 jelly
    } else if (c == "urchin") {

        addCreatures("kelp", 1);
        addCreatures("jelly", 1);

        rulesDisplayed.urchinRemoved = true;

    // remove 1 kelp -- remove 1 jelly
    } else if (c == "kelp") {

        removeCreatures("jelly", 1);

        rulesDisplayed.kelpRemoved = true;

        // remove 1 jelly -- nothing
    } else if (c == "jelly") {

        rulesDisplayed.jellyRemoved = true;
        
    }
}

function removeCreatures(type, num) {

    var i = 0;

    while (num != 0 && i < spaces.length) {
        
        var box = spaces[i];

        if (box.classList.contains(`${type}s`)){
            
            box.innerHTML = "";
            box.classList.remove(`${type}s`);
            box.classList.add("empty");

            num = num - 1;
        }

        i++;

        if (i == spaces.length) {
            alert(`game over! all ${type}s are gone :'(`);
        }
    }

}

function addCreatures(type, num) {

    var i = 0;

    while (num != 0 && i < spaces.length) {

        var box = spaces[i];

        if (box.classList.contains("empty")) {

            box.innerHTML = `<img src='images/${type}_pic.png'>`;
            box.classList.add(`${type}s`);
            box.classList.remove("empty");

            num = num - 1;

        }

        i++;

        if (i == spaces.length) {
            alert("game over! no more room :'(");
        }
    }

}

function countPop() {

    var o = 0;
    var u = 0;
    var k = 0;
    var j = 0;

    for (var i = 0; i < spaces.length; i++) {

        var box = spaces[i];

        if (box.classList.contains("otters")) {
            o++;
        } else if (box.classList.contains("urchins")) {
            u++;
        } else if (box.classList.contains("kelps")) {
            k++;
        } else if (box.classList.contains("jellys")) {
            j++;
        }

    } 
    
    if (o == 0) {
        alert("game over! all otters are gone :'(");
    }
    if (u == 0) {
        alert("game over! all urchins are gone :'(");
    }
    if (k == 0) {
        alert("game over! all kelp is gone :'(");
    }
    if (j == 0) {
        alert("game over! all jellyfish are gone :'(");
    }

    document.getElementById("pop").innerHTML = `Otters: ${o}&emsp;&emsp;Urchins: ${u}&emsp;&emsp;Kelp: ${k}&emsp;&emsp;Jellyfish:${j}`;

}

function showAddRules() {
    
    if (rulesDisplayed.animal == "otter") {

        if (rulesDisplayed.otterAdded) {

            document.getElementById("add-rule").innerHTML = "<h3>introduce one otter</h3> <img src='images/add_otter.png'>";

        }

    } else if (rulesDisplayed.animal == "urchin") {

        if (rulesDisplayed.urchinAdded) {

            document.getElementById("add-rule").innerHTML = "<h3>introduce one urchin</h3> <img src='images/add_urchin.png'>";

        }

    } else if (rulesDisplayed.animal == "kelp") {

        if (rulesDisplayed.kelpAdded) {

            document.getElementById("add-rule").innerHTML = "<h3>introduce one kelp</h3><img src='images/add_kelp.png'>";

        }

    } else if (rulesDisplayed.animal == "jelly") {

        if (rulesDisplayed.jellyAdded) {

            document.getElementById("add-rule").innerHTML = "<h3>introduce one jelly</h3><img src='images/add_jelly.png'>";

        }

    }
}

function showRemoveRules() {
    
    if (rulesDisplayed.animal == "otter") {

        if (rulesDisplayed.otterRemoved) {

            document.getElementById("remove-rule").innerHTML = "<h3>rehome one otter</h3> <img src='images/remove_otter.png'>";

        }

    } else if (rulesDisplayed.animal == "urchin") {

        if (rulesDisplayed.urchinRemoved) {

            document.getElementById("remove-rule").innerHTML = "<h3>rehome one urchin</h3> <img src='images/remove_urchin.png'>";

        }

    } else if (rulesDisplayed.animal == "kelp") {

        if (rulesDisplayed.kelpRemoved) {

            document.getElementById("remove-rule").innerHTML = "<h3>rehome one kelp</h3><img src='images/remove_kelp.png'>";

        }

    } else if (rulesDisplayed.animal == "jelly") {

        if (rulesDisplayed.jellyRemoved) {

            document.getElementById("remove-rule").innerHTML = "<h3>rehome one jelly</h3><img src='images/remove_jelly.png'>";

        }

    }


}

init();