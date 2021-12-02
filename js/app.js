let words = [
    "witcher",
    "skyrim",
    "supernatural",
    "wwe",
    "claymore",
    "chat",
    "odin",
    "thor",
    "freya",
    "loki",
    "hache",
    "goule",
    "dragon",
    "vampire",
    "alduin",
    "impala",
    "playstation",
    "xbox",
    "nintendo",
    "ordinateur",
    "valhala",
    "midgard",
    "cheval",
    "ablette",
    "dovah",
    "novigrad",
    "droskall",
    "nxt",
    "kayak",
    "aew",
    "foureaux",
    "manette",
    "titre",
    "championat",
    "jarl",
    "chef",
    "ragnar",
    "eivor",
    "dutch",
    "lucifer"
]

let alphaB = "";
let error;
let remain = document.getElementById("remain").getElementsByTagName("p")[1];
let find  = "";
let findCopy = "";
let wordDiv = [];
let buttonValid = document.getElementById("text").getElementsByTagName("button")[0];
let buttonReset = document.getElementById("text").getElementsByTagName("button")[1];
let findLetterEmpty;
init();


document.addEventListener("click" , function (e){
    switch (e.target){
        case buttonValid :
            testWord(document.getElementById("inputWord").value.toLowerCase());
            testLetter(document.getElementById("input").value.toLowerCase());
            document.getElementById("input").value = "";
            break;
        case buttonReset :
            reinit();
            break;
    }
});

document.addEventListener("keypress" , function (e){
    switch (e.key){
        case "Enter" :
            testWord(document.getElementById("inputWord").value.toLowerCase());
            testLetter(document.getElementById("input").value.toLowerCase());
            document.getElementById("input").value = "";
            break;
    }
});

function randomWord(){
    return words[Math.floor(Math.random()*words.length)];
}

function init(){
    let word = document.getElementById("word");
    let newDiv;
    alphaB = "abcdefghijklmnopqrstuvwxyz";
    remain.innerHTML = alphaB.toUpperCase();
    error = 1;
    findLetterEmpty = 0;
    buttonValid.hidden = false;
    changeImage(error);
    find = randomWord();
    findCopy = find;
    for (let i = 0 ; i < find.length ; i++){
        newDiv = document.createElement("div");
        newDiv.style.width = Math.floor(100/ find.length)-0.1+"%";
        word.append(newDiv);
    }
    wordDiv = document.getElementById("word").getElementsByTagName("div");
    document.getElementById("input").value = "";
    document.getElementById("inputWord").value = "";
}

function reinit(){
    for (let i = wordDiv.length-1 ; i >=0 ; i--){
        wordDiv[i].remove();
    }
    init();
}

function changeImage(nbError){
    document.getElementById("image").querySelector("img").src = "/img/pendu_" + nbError + ".png";
    document.getElementById("image").querySelector("img").alt = nbError;
}

function replaceLetter(letter){
    find = Array.from(find);
    find[find.indexOf(letter)] = " ";
    find = find.join('');
    findLetterEmpty ++;
}

function placeLetter(index,letter){
    wordDiv[index].innerHTML = letter.toUpperCase();
}

function testLetter(letter){
    if (letter !== "") {
        if (alphaB.indexOf(letter) !== -1) {
            if (find.indexOf(letter) === -1) {
                if (error > 5) {
                    error++;
                    changeImage(error);
                    buttonValid.hidden = true;
                }

                else {
                    error++;
                    changeImage(error);
                }

            }

            else {
                for (let i = 0; i < find.length; i++) {

                    if (find.indexOf(letter) === -1) {
                    }
                    else {
                        placeLetter(find.indexOf(letter), letter);
                        replaceLetter(letter);
                    }
                }
                if (findLetterEmpty === find.length) {
                    buttonValid.hidden = true;
                    changeImage("victory");
                }
            }
            alphaB = Array.from(alphaB);
            alphaB.splice(alphaB.indexOf(letter), 1);
            alphaB = alphaB.join('');
            remain.innerHTML = alphaB.toUpperCase();
        }
    }
}

function testWord(word){
    if (word !== ""){
        if (word === findCopy){
            buttonValid.hidden = true;
            changeImage("victory");
        }
        else {
            changeImage(6);
            buttonValid.hidden = true;
        }
    }
}