//compatibilité pour safari et autre
var AudioContext = window.AudioContext || window.webkitAudioContext;
//On crée un array qui contiendra les différents audios
var arrayAudio = [];
//On crée une instance de zip
var zip = new JSZip();


//On utilise le JSZipUtils pour récupérer le fichier zip en ajax
JSZipUtils.getBinaryContent('test.zip', function(error, data) {
    if(error) {
        throw error;
    }
    //On charge le flux de donnée dans l'objet zip
    zip.loadAsync(data).then(function() {
        //Pour chaque fichier du zip on crée une source audio
        zip.forEach(function(path, file){
            
            var ctx = new AudioContext();
            var source = ctx.createBufferSource();
            file.async('arraybuffer').then(function(arrayBuff){
                ctx.decodeAudioData(arrayBuff, function(audiobuff) {
                    source.connect(ctx.destination);
                    source.buffer = audiobuff;
                    arrayAudio.push(source);
                    console.log(path);
                });
            });
        });
    });
})

// file.onload = function(e) {
//     e.target.result;
// };

// var ajax = new XMLHttpRequest();

// ajax.onreadystatechange = function() {
//     if(ajax.readyState === 4) {
//         if(ajax.status >= 200 && ajax.status < 300)  {
//             ctx.decodeAudioData(ajax.response, function(audiobuff) {
//                 source.connect(ctx.destination);
//                 source.buffer = audiobuff;
//                 source.start(0);
//             });
//         }else {
//             console.error(ajax.response);
//         }
//     }
// };
// ajax.open('GET', 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav', true);
// ajax.responseType = 'arraybuffer';

// ajax.send();

// fetch(
//     'https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav'
// ).then(function(response) {
//     response.arrayBuffer().then(function(buff) {
//         ctx.decodeAudioData(buff).then(function(audiobuff) {
//             source.connect(ctx.destination);
//             source.buffer = audiobuff;
//             source.start();
//         });
//     });
// }).catch(function(error) { console.error(error)});