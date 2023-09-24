import dataJson from "./dati.json" assert { type: "json" };

var numDati = dataJson.ringraziamenti.length;
console.log(numDati);

function caricaDati() {
    titolo.innerHTML = dataJson.ringraziamenti[i].titolo;
    testo.innerHTML = dataJson.ringraziamenti[i].testo;
    if (dataJson.ringraziamenti[i].titolo != null)
        img.innerHTML = dataJson.ringraziamenti[i].img;
    else
        console.log("nullo");
}

function avanti() {
    i++;
    if (i == numDati) i = 0;
    console.log(i);
    caricaDati();
}
function indietro() {
    i--;
    if (i < 0) i = (numDati - 1);
    console.log(i);
    caricaDati();
}

function parseURLParams(url) {//url particolari riconoscimento
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1);

    if (query === url || query === "") return 0;

    nv = query.split("=", 2);
    for (var j = 0; j < numDati; j++) {
        if (dataJson.ringraziamenti[j] == nv[1])
            return j;
    }

    return 0;
}


var i = 0;

var titolo = document.getElementById("titolo");
var testo = document.getElementById("testo");
var img = document.getElementById("img");
var bA = document.getElementById("avanti");
var bI = document.getElementById("indietro");

bA.onclick = function () { avanti() };
bI.onclick = function () { indietro() };

var myReferrer = document.referrer;
if (myReferrer != "") {//accesso tramite link
    console.log(myReferrer);
    i = parseURLParams(myReferrer);
    console.log("brav "+i);
}
else console.log("non so come sei arrivato qui");


caricaDati();

