import dataJson from "./dati.json" assert { type: "json" };

var numDati = dataJson.ringraziamenti.length;
console.log(numDati);

var nome = null;

function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      save_canvas(canvas)
    } else {
      console.log("errore w0 h0 ");
    }
  }

function save_canvas(c) {
    console.log("sono qui");
    var b64Image = c.toDataURL("image/png");
    var formData = new FormData();
    formData.append("nome", nome);
    formData.append("img", b64Image);
    fetch("../php/salvaImmagini.php", {
        method: "POST",
        mode: "no-cors",
        body: formData
    })  .then(response => response.text())
        .then(success => console.log(success))
        .catch(error => console.log(error));
}

function faiFoto() {
    divCamera = document.getElementById('camera');
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    startbutton = document.getElementById('startbutton');
    annulla = document.getElementById('annullaFoto');

    newButton.style.display = "none";

    annulla.onclick = function () {
        divCamera.style.display = "none";
        newButton.style.display = "block";
        video.srcObject.getTracks().forEach(function (track) {
            if (track.readyState == 'live') {
                track.stop();
                flagVideo = false;
            }
        }
        );
    }

    startbutton.addEventListener(
        "click",
        (ev) => {
            takepicture();
            ev.preventDefault();
        },
        false,
    );


    divCamera.style.display = "block";

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            flagVideo = true;
        })
        .catch((err) => {
            console.error(`An error occurred: ${err}`);
        });

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
    );
}


var flagVideo = false;

function caricaDati() {

    if (!frst && !canc && newButton != null) {
        newButton.remove();
        canc = true;
    }

    frst = false;

    titolo.innerHTML = dataJson.ringraziamenti[i].titolo;
    testo.innerHTML = dataJson.ringraziamenti[i].testo;
    photo.setAttribute("src", "img/"+dataJson.ringraziamenti[i].titolo+".png");
    //photo.onerror= function(){this.style.display='none';};
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

    var nv = query.split("=", 2);
    //console.log(nv);
    for (var j = 0; j < numDati; j++) {
        if (dataJson.ringraziamenti[j].titolo == nv[1])
        {
            nome = nv[1];
            return j;
        }
    }

    return 0;
}

var i, titolo, testo, img, bA, bI, codUte
const width = 500;


let height = 0;     // This will be computed based on the input stream
var streaming = false;

let video = null;
let canvas = null;
let photo = null;
let startbutton = null;
let divCamera = null;
let annulla = null;

let canc = false;
let newButton = null;
let frst = true;

function startup() {


    i = 0;

    titolo = document.getElementById("titolo");
    testo = document.getElementById("testo");
    img = document.getElementById("img");
    photo = document.getElementById("photo");
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
    var flagParam = document.URL.indexOf('?');
    if (flagParam != -1) {//accesso tramite link
        console.log("? " + flagParam);
        codUte = parseURLParams(document.URL);
        i = codUte;
        console.log("brav " + i);
        if (i != 0) {
            newButton = document.createElement('div');
            newButton.textContent = 'Aggiungi una tua foto';
            newButton.className = 'tastoFoto'
            newButton.onclick = function () { faiFoto() };
            document.body.insertBefore(newButton, titolo);
        }
    }
    else console.log("benvenuto");

    caricaDati();
}




window.addEventListener("load", startup, false);

