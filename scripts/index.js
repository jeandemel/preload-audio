// let audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav');

// audio.preload = "auto";
var AudioContext = window.AudioContext || window.webkitAudioContext;

let ctx = new AudioContext();
let source = ctx.createBufferSource();


// file.onload = function(e) {
//     e.target.result;
// };

fetch(
    'https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav'
).then((response) => {
    response.arrayBuffer().then((buff) => {
        ctx.decodeAudioData(buff).then((audiobuff) => {
            source.connect(ctx.destination);
            source.buffer = audiobuff;
            source.start();
        });
    });
}).catch((error) => console.error(error));