'use strict'

var playButton = document.getElementById("play-button");
var introVideo = document.getElementById("presentation-video");


playButton.onclick = function(){
    playButton.style.zIndex = "0";
    introVideo.play();
};

introVideo.onended = function(){
    playButton.style.zIndex = "3";
};



