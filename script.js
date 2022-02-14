let sliderVol = document.getElementById('volume');
let scanner = document.getElementById('scan');
let play = false
let trackCount = records.length - 1
let trackLink = records[0].link
let kind = "rain"
let timer = 0
// let note = ""

scanner.max = trackCount


function setPlayer(num) {
    document.querySelector("#artist").innerHTML = "☂" + "&nbsp;" + records[num].name
    document.querySelector("#track").innerText = records[num].trak
    document.querySelector("#desc").innerHTML = "<marquee>" + records[num].desc + "</marquee>"

    trackLink = records[num].link
  
    kind = records[num].kind

    scanVal(num)
}

setPlayer(0)

var sound = new Howl({
  src: [trackLink],
  loop: true,
  html5: true
});

var click = new Howl({
  src: ['https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/click.m4a?v=1644535365202']
});

var close = new Howl({
  src: ['https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/close.m4a?v=1644535519400']
});

function clicksound() {
  click.play()
}

//notes with absolute simplest cookie implementation

// if (document.cookie) {
//   document.querySelector("#note").innerHTML = decodeURIComponent(document.cookie.substring(5))
// }

// function saveNote() {
//   document.cookie = "note="+encodeURIComponent(document.querySelector("#note").innerHTML);
// }

//clicky sounds

function closesound() {
  close.play()
}

function setNewSound() {
  sound.stop()
  sound = new Howl({
  src: [trackLink],
    loop: true,
    html5: true
    });
  
  if (play) {
  // sound.play();
    soundLoadnPlay()
  }

}

function soundLoadnPlay() {
  document.querySelector(".ualbumart").classList.remove("rain","wave")
  document.querySelector(".ualbumart").classList.add("loading")
  sound.play();
  sound.once('play', function(){
    
    if (kind == "rain") {
    
  document.querySelector(".ualbumart").classList.add("rain")
    } else {
      document.querySelector(".ualbumart").classList.add("wave")
    }
    
    
});
}

function soundPauseOff() {
   document.querySelector(".ualbumart").classList.remove("rain","wave")
      document.querySelector(".ualbumart").classList.remove("loading")
      play = false
      sound.pause();
}

function soundFadeOut() {
   document.querySelector(".ualbumart").classList.remove("rain","wave")
      document.querySelector(".ualbumart").classList.remove("loading")
  document.querySelector("#play").classList.add("disable")
      sound.fade(1, 0, 30000);
      setTimeout(function() {sound.pause(); playButtonSet(); sound.fade(0, 1, 0);   document.querySelector("#play").classList.remove("disable")}, 30000);
}

function scannerInit() {
  
  document.getElementById("sval").innerText = scanner.value
    document.getElementById("smax").innerText = trackCount

    setPlayer(scanner.value)
  
}

function setScanner() {


    document.getElementById("sval").innerText = scanner.value
    document.getElementById("smax").innerText = trackCount

    setPlayer(scanner.value)
    
    setNewSound()

}

var updateTimer = setInterval(function() {
  
  if (timer <= 0)  {} else {
  
    timer = timer - 1
  console.log("timer run");
  document.getElementById("timerdisplay").innerText = timer + " mins"
  
      if (timer <= 0) {
    document.getElementById("timerdisplay").innerText = "Unset"
    document.getElementById("timerstat").innerText = ""
        soundFadeOut();
  } }
}, 60 * 1000); 

function timerAdd() {
    timer = timer + 5
  document.getElementById("timerdisplay").innerText = timer + " mins"
  document.getElementById("timerstat").innerText = "◴ "
}

function timerSub() {
  
  
    timer = timer - 5
    document.getElementById("timerdisplay").innerText = timer + " mins"
    document.getElementById("timerstat").innerText = "◴ "
  
    if (timer == 0) {
    document.getElementById("timerdisplay").innerText = "Unset"
    document.getElementById("timerstat").innerText = ""
  }
}

function scanIncr() {
    scanner.value++
    setScanner()
}

function scanVal(num) {
    scanner.value = num
}

function scanDec() {
    scanner.value--
    setScanner()
}

scannerInit()

function getTime() {

    const d = new Date();
    let hour = d.getHours();
    hour = ("0" + hour).slice(-2);

    let min = d.getMinutes();
    min = ("0" + min).slice(-2);


    document.getElementById("hour").innerText = hour
    document.getElementById("minute").innerText = min
}

getTime()

const refreshTime = window.setInterval(function() {
    getTime()
}, 1000);

Howler.volume(0.5);

function changeVol() {
  
  Howler.volume(sliderVol.value/10);

    if (sliderVol.value >= 5) {
        document.getElementById("soundicon").src = "https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/sound3.gif?v=1644315892632";
    }

    if (sliderVol.value <= 4) {
        document.getElementById("soundicon").src = "https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/sound2.gif?v=1644276495827";
    }

    if (sliderVol.value == 0) {
        document.getElementById("soundicon").src = "https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/sound0.gif?v=1644315894697";
    }

}

document.querySelector("#sound").addEventListener("click", (e) => {
    sliderVol.value = 0
    changeVol()
});

function playButtonSet() {

    if (document.getElementById("playbutton").src == "https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/pause.gif?v=1644327292420") {

        document.getElementById("playbutton").src = "https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/play.gif?v=1644272901939";
       
      soundPauseOff();

    } else {
        document.getElementById("playbutton").src = "https://cdn.glitch.global/d0348cf0-2764-43de-96b5-8d953d48957d/pause.gif?v=1644327292420";

      play = true
      // sound.play();
      soundLoadnPlay()
      // document.querySelector(".ualbumart").classList.add("raining")

    }
}

document.querySelector("#play").addEventListener("click", (e) => {
    playButtonSet()
});

//manage window states

document.querySelector(".desktop").addEventListener("click", (e) => {
  let cl = e.target.getAttribute("data")
  if (cl) {
    document.querySelector("." + cl).classList.add("windowclose")
    setTimeout(() => { document.querySelector("." + cl).classList.add("minimized") }, 500);
     document.querySelector("." + cl).classList.remove("windowopen")
  }
});

document.querySelector(".tasks").addEventListener("click", (e) => {
    let cl = e.target.getAttribute("data")
    // console.log(cl)
    document.querySelector("." + cl).classList.remove("minimized")
  document.querySelector("." + cl).classList.remove("windowclose")
  document.querySelector("." + cl).classList.add("windowopen")
});

document.querySelector(".control").addEventListener("click", (e) => {
    let cl = e.target.getAttribute("data")
    // console.log(cl)
    document.querySelector("." + cl).classList.remove("minimized")
  document.querySelector("." + cl).classList.remove("windowclose")
  document.querySelector("." + cl).classList.add("windowopen")
});

//window dragging https://codepen.io/jmy3155/pen/Jpvxzq

function dragElement(elmnt, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(handle.id)) {
        document.getElementById(handle.id).onmousedown = dragMouseDown;
        document.getElementById(handle.id).ontouchstart = touchStart;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        let cx = e.clientX;
        let cy = e.clientY;
        pos1 = pos3 - cx;
        pos2 = pos4 - cy;
        pos3 = cx;
        pos4 = cy;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function touchStart(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos3 = e.clientY;
        
        document.ontouchend = touchEnd;
        document.ontouchmove = touchMove;
    }

    function touchMove(e) {
        e = e || window.event;
        pos1 = pos3 - e.targetTouches[0].clientX;
        pos2 = pos4 - e.targetTouches[0].clientY;
        pos3 = e.targetTouches[0].clientX;
        pos4 = e.targetTouches[0].clientY;

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function touchEnd() {
        document.ontouchend = null;
        document.ontouchmove = null;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dragElement(document.querySelector(".uplayer"), document.querySelector("#dragplayer"));

dragElement(document.querySelector(".unotes"), document.querySelector("#dragnotes"));
