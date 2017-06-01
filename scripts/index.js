// var audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav');

// audio.preload = "auto";
var AudioContext = window.AudioContext || window.webkitAudioContext;

var ctx = new AudioContext();
var source = ctx.createBufferSource();


// file.onload = function(e) {
//     e.target.result;
// };

fetch(
    'https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav'
).then(function(response) {
    response.arrayBuffer().then(function(buff) {
        ctx.decodeAudioData(buff).then(function(audiobuff) {
            source.connect(ctx.destination);
            source.buffer = audiobuff;
            source.start();
        });
    });
}).catch(function(error) { console.error(error)});