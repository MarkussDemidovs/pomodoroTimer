const elem = {
  startBtn: document.getElementById('start'),
  stopBtn: document.getElementById('stop'),
  resetBtn: document.getElementById('reset'),
  timer: document.getElementById('timer'),
  cycleCounter: document.getElementById("cycleCounter"),
  skipBtn: document.getElementById('skip'),
  applyBtn: document.getElementById('apply'),

  // Input
  workLen: document.getElementById("workLen"),
  shortLen: document.getElementById("shortLen"),
  longLen: document.getElementById("longLen"),
  cyclesBreak: document.getElementById("cyclesBreak"),

  // Option menu buttons
  //musicBtn : document.getElementById("musicBtn")

  darkBtn: document.getElementById("dark"),
  // menuBtn: document.getElementById("menuButton"),

  // divs
  optionsMenu: document.getElementById("optionsMenu"),
}


let start = {
  min: 25,
  sec: 0
}

// s = short l = long
const lengths = {
  workMin: 25,
  sBreakMin: 5,
  lBreakMin: 15
}
let minutes = lengths.workMin;
let seconds = 0;
let timerId;
let isStarted;
let currentPhase = "Work";
let cycles = 0;
let shortBreaks = 0;
let clickedTimes = 0;

let skips = 0;
let cyclesNeeded = 4;
let timerCreated = false;

let shortLen;
let longLen;
let workLen;
let cycleBreak;

let showMenu = true;

// pieveinot krasas -- pievienot krasas rezimiem??

function setElementBackgroundColors(breakLen) {
  if (breakLen == "short") {
    elem.applyBtn.style.backgroundColor = "skyblue";
    elem.darkBtn.style.backgroundColor = "#3a7e99";
    elem.startBtn.style.backgroundColor = "skyblue";
    elem.stopBtn.style.backgroundColor = "#3a7e99";
    elem.resetBtn.style.backgroundColor = "#3a7e99";
    elem.skipBtn.style.backgroundColor = "#3a7e99";
  } else if (breakLen == "long") {

    elem.applyBtn.style.backgroundColor = "#5ed156";
    elem.darkBtn.style.backgroundColor = "#3ba633"
    elem.startBtn.style.backgroundColor = "#5ed156"
    elem.stopBtn.style.backgroundColor = "#3ba633"
    elem.resetBtn.style.backgroundColor = "#3ba633"
    elem.skipBtn.style.backgroundColor = "#3ba633"
  } else {

    elem.applyBtn.style.backgroundColor = "#ff7f7f";
    elem.darkBtn.style.backgroundColor = "#ca5151"
    elem.startBtn.style.backgroundColor = "#ff7f7f"
    elem.stopBtn.style.backgroundColor = "hsl(0, 68%, 62%)"
    elem.resetBtn.style.backgroundColor = "hsl(0, 68%, 62%)"
    elem.skipBtn.style.backgroundColor = "hsl(0, 68%, 62%)"

  }
}

console.log(timer, "timer");

function darkMode() {
  document.body.classList.toggle("dark-mode");
}


function resetTimer() {
  minutes = lengths.workMin;
  seconds = 0
  clearInterval(timerId);
  elem.timer.innerHTML = `${minutes}:0${seconds}`;
}


function showTime() {
  //console.log(seconds);
  //console.log(minutes);
  timer.innerHTML = `${minutes}:${seconds}`;
}


// Break length vajadzētu būt integeram! 1==short 2==long
function breakPhase(breakLength) {
  if (breakLength == 1) {
    currentPhase = "Short"
    minutes = lengths.sBreakMin;

    seconds = 0;
    shortBreaks++;

    setElementBackgroundColors("short");

  } if (shortBreaks > cyclesNeeded) {
    breakLength = 2;
  } if (breakLength == 2) {
    currentPhase = "Long"
    minutes = lengths.lBreakMin;
    seconds = 0;

    setElementBackgroundColors("long")

    shortBreaks = 0
  }

  showTime();

}



function WorkPhase() {
  if (seconds === 0) {
    seconds = 59;
    if (minutes !== 0) {
      minutes--;
    }
  } else {
    seconds--;
  }
  showTime();

}



/*function stopTimer() {
    clearInterval(timerId);
    isStarted = false;

    elem.startBtn.removeEventListener;

    elem.startBtn.onclick = function() {timerInterval};
}*/



function StartEvent() {
  WorkPhase();

  if (clickedTimes == 1) {
    setElementBackgroundColors("work");
    WorkPhase();
  } else if (clickedTimes >= 2) {
    clearInterval(timerId);
    clickedTimes = 0;
  }
  //   elem.startBtn.onclick = function() {stopTimer()};

}

function onButtonFunction() {
  console.log(shortBreaks);
  elem.cycleCounter.innerHTML = cycles;
  if (isStarted == true) {
    StartEvent();


    if (minutes == 0 & seconds == 0 && currentPhase == "Work") {
      currentPhase = "Short";
      alert("Work phase done!");
      breakPhase(1);
    } else if (minutes == 0 & seconds == 0) {
      alert("Break phase done!");
      currentPhase = "Work"
      minutes = lengths.workMin;
      seconds = 0;
      cycles++;
      WorkPhase();
    }

  } else {
    clearInterval(timerId); // IZDZĒS PRIEKS ATSAKSANAS!!!! GRIBAS
  }

}

///////////////////////////////////////////////////
elem.startBtn.addEventListener('click', () => {
  isStarted = true;
  //clickedTimes++;
  // elem.startBtn.disabled = true;

  if (timerCreated == false) {
    timerCreated = true;

    timerId = setInterval(() => {

      onButtonFunction();
    }, 1000);
  } else {
    isStarted = false;
    resetTimer();
    timerCreated = false;
  }

});
///////////////////////////////////////////////////


elem.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
});

elem.resetBtn.addEventListener('click', () => {
  resetTimer();
})

skips = 0;

elem.skipBtn.addEventListener('click', () => {
  console.log(skips);

  if (skips == 0) {
    setElementBackgroundColors("work")
    minutes = lengths.workMin;
    seconds = 0;

    skips++;
  } else if (skips == 1) {
    setElementBackgroundColors("short")
    minutes = lengths.sBreakMin;
    seconds = 0;

    skips++;
  } else if (skips <= 2) {
    setElementBackgroundColors("long")
    minutes = lengths.lBreakMin;
    seconds = 0;
    skips = 0;
  }
});

elem.applyBtn.addEventListener('click', () => {
  const workLenValue = parseInt(elem.workLen.value);
  if (!isNaN(workLenValue) && workLenValue > 0) {
    lengths.workMin = workLenValue;
  } else {
    console.error("Invalid input for work length");
  }

  const shortLenValue = parseInt(elem.shortLen.value);
  if (!isNaN(shortLenValue) && shortLenValue > 0) {
    lengths.sBreakMin = shortLenValue;
  } else {
    console.error("Invalid input for work length");
  }

  const longLenValue = parseInt(elem.longLen.value);
  if (!isNaN(longLenValue) && longLenValue > 0) {
    lengths.lBreakMin = longLenValue;
  } else {
    console.error("Invalid input for work length");
  }

  const cyclesValue = parseInt(elem.cyclesBreak.value);
  if (!isNaN(cyclesValue) && cyclesValue > 0) {
    cyclesNeeded = cyclesValue;
  } else {
    console.error("Invalid input for work length");
  }
});

function playMusic() {
  slot1.play();
}

elem.darkBtn.addEventListener('click', () => {
  darkMode();
})
