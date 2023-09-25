import dataJson from "./dati.json" assert { type: "json" };

var numDati = dataJson.ringraziamenti.length;
console.log(numDati);

function caricaDati() {

    if(!frst && !canc && newButton != null)
    {
        newButton.remove();
        canc = true;
    }

    frst = false;

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

var i, titolo, testo, img, bA, bI, codUte
const width = window.screen.width;


const height = 0;     // This will be computed based on the input stream

const streaming = false;

let video = null;
let canvas = null;
let photo = null;
let startbutton = null;

let canc = false;
let newButton = null;
let frst = true;

function startup() {


    i = 0;
/*
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
*/
    titolo = document.getElementById("titolo");
    testo = document.getElementById("testo");
    img = document.getElementById("img");
    bA = document.getElementById("avanti");
    bI = document.getElementById("indietro");
    bA.onclick = function () { avanti() };
    bI.onclick = function () { indietro() };
    document.addEventListener('swiped-left', function (e) {
        //titolo.animate(fadeOut, fedeTime);
        avanti();
        titolo.animate(
            {
                opacity: [0, 1], // [ from, to ]
            },
            1000,
        );
    });
    document.addEventListener('swiped-right', function (e) {
        indietro();
        titolo.animate(
            {
                opacity: [0, 1], // [ from, to ]
            },
            1000,
        );
    });
    var myReferrer = document.referrer;
    if (myReferrer != "") {//accesso tramite link
        console.log(myReferrer);
        codUte = parseURLParams(myReferrer);
        i = codUte;
        console.log("brav " + i);
        if(i!= 0){
            newButton = document.createElement('div');
            newButton.textContent = 'Aggiungi una tua foto';
            newButton.className = 'tastoFoto'
            newButton.onclick = {

            }
            document.body.appendChild(newButton);
        }
    }
    else console.log("non so come sei arrivato qui");

    caricaDati();
}
/*
video.addEventListener(
    "canplay",
    (ev) => {
      if (!streaming) {
        height = (video.videoHeight / video.videoWidth) * width;
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },
    false,
  );*/

window.addEventListener("load", startup, false);

/*
navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.error(`An error occurred: ${err}`);
        });*/