let body = document.querySelector("body");
let toggle = document.getElementById("toggleDark");
let currentMode = document.getElementById("currentMode");
toggle.addEventListener("click", function () {
    this.classList.toggle("bi-moon");
    if (this.classList.toggle("bi-brightness-high-fill")) {
        currentMode.innerHTML = "Dark Mode"
        body.style.background = "#08798c";
        body.style.color = "black";
        body.style.transition = "1s";
    } else {
        currentMode.innerHTML = "Light Mode"
        body.style.background = "black";
        body.style.color = "white";
        body.style.transition = "1s";
    }
});

// Analog Clock
//getting the canvas by id
    let canvas = document.getElementById("can");
    //getting the context
    let ctx = canvas.getContext("2d");
    //getting the radius of the clock
    var radius = canvas.height / 2;
    //put the clock at the center of the canvas
     ctx.translate(radius, radius);
     //make the radius 90% of the canva
     radius = radius * 0.90;
   //drawing the circle with color white
   function drawClock() {
     ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 10;
    ctx.fillStyle = "white";
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    clockFace();
    drawNumbers();
    drawTime();
   }
    
   function clockFace() {
         //create clock face (the dot at the middle of the clock)
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.arc(0, 0, 10, 0, 2*Math.PI);
    ctx.fill();
   }
function drawNumbers() {
    //draw the numbers
  var ang;
  var num;
  ctx.font = "20px arial"
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(num = 1; num <= 12; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num, 0, 0);
   ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

   //draw hands
function drawTime(){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(hour, radius*0.5, radius*0.07);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(minute, radius*0.8, radius*0.07);
  // second
  second = (second*Math.PI/30);
  drawHand(second, radius*0.9, radius*0.02);
}

function drawHand(pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#333";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
//call the function
setInterval(drawClock, 1000)


// Digital Clock
let clock = document.getElementById("time");
let timeFormat = document.getElementById("timeFormat");

setInterval(showTime, 1000);
 format = timeFormat.addEventListener('change', ()=> showTime())
  
  function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";
    let format = timeFormat.value
      if (hour > 12 && format == 12) {
        hour -= 12;
        am_pm = "PM";
      }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }
    
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec;
    if(format == 12){
      // console.log(am_pm)
      document.getElementById("am_pm")
          .innerHTML = am_pm;
    }
    document.getElementById("time")
        .innerHTML = currentTime;
} 
  showTime();




// //---- sTOPwATCHT fUNCTION
let startButton = document.querySelector("#startCount")
let resetButton  = document.querySelector("#resetCount")
let stopButton = document.querySelector("#stopCount")
let countResult = document.querySelector("#countResult")
let stopTime = document.getElementById('Stoptime')
  
var count = 0
var countM = 0
var countH = 0
let control = () => {
  var s = 0
  var m = 0
  var h = 0
  s = count++
  if(s === 60){
    count = 0
    countM++
  }
  m = countM
  if(m == 60){
    countM = 0
    countH++
  }
  h = countH
  if(h == 24){
    countH = 0
  }
  m = checkTime(m);
  s = checkTime(s);
  h = checkTime(h);
  stopTime.innerHTML =  h + "h:" + m + "m:" + s + "s";   
  // counting()
  let startTimer = setTimeout(control, 1000);

  // stop timmer
  function stopTimer(){
    clearInterval(startTimer)
  }
  // reset timmer
  function resetCount(){
    count = 0;  countM = 0;  countH = 0
        s = 0;    m = 0;      h = 0
    clearInterval(startTimer)
  }
  stopButton.addEventListener('click', ()=>{
      if(startButton.disabled = false){
        startButton.disabled = true
      }
      stopTimer()
  })
  resetButton.addEventListener('click', () => {
      resetCount()
      startCount.disabled = false
  })
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

startButton.addEventListener('click', () => {
      control()
      startCount.disabled = true
      if(stopButton.disabled = false){
        stopButton.disabled = true
      }
   });
resetButton.addEventListener('click', () => {
    stopTime.innerHTML = "00h:00m:00s"; 
  })

  
  // //// //---- aLARMCLOCK fUNCTION

let alarmTime = document.getElementById("alarmTime")
let setAlarm = document.getElementById("setAlarm")
let stopAlarm = document.getElementById("stopAlarm")
let countdown = document.getElementById("alarmCounter");
let soundAlert = document.getElementById("soundAlert")
let cTime = new Date();
let year = cTime.getFullYear();
let month = cTime.getMonth();
let day = cTime.getDate();
let second = cTime.getSeconds();
let setTime
alarmTime.addEventListener('change', function(){
let str = alarmTime.value
let hours = Number(str.slice(0,2));
let minutes = Number(str.slice(3,5));
setTime = new Date(year, month, day, hours, minutes, second);
let startAlarm = function(){
  var x = setInterval(function () {
    let ringTime = new Date(setTime).getTime()
    let now = new Date().getTime();
    var t = ringTime - now;
        // var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hour = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minute = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
          // console.log(`${hours}:${minutes}:${seconds}`)
          minute = checkTime(minute);
          seconds = checkTime(seconds);
          hour = checkTime(hour);
        function checkTime(i) {
            if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
            return i;
          }
          countdown.innerHTML = `${hour}:${minute}:${seconds}`;
      if (t < 0) {
        clearInterval(x);
        soundAlert.style.display = "flex"
        playAudio()
        // days = "00"
        hours = "00"
        minutes = "00"
        seconds = "00"
        countdown.innerHTML = `${hours}:${minutes}:${seconds}`;
      }
    }, 1000);
    alarmTime.addEventListener('change', function(){
      clearInterval(x);
    })
    stopAlarm.addEventListener('click', () => {
      countdown.innerHTML = "00:00:00";
      soundAlert.style.display = "none"
      alarmTime.value = ""
      clearInterval(x);
      console.log("alarm stoped")
    })
  }
  setAlarm.addEventListener('click', function(){
    startAlarm()
  })
} )
  
let alarmSound = document.getElementById("myAlert"); 
let speaker = document.getElementById("speaker");
let salient = document.getElementById("salient");
let loud = document.getElementById("loud");
function playAudio() { 
  alarmSound.play();
  loud.style.display = "block"
  salient.style.display = "none"
} 
function pauseAudio() { 
  alarmSound.pause();
  salient.style.display = "block"
  loud.style.display = "none" 
}
speaker.addEventListener('click', function(){
  let audioVolume = alarmSound.volume
  if(audioVolume === 1){
    console.log("change speaker to salient")
    alarmSound.volume = 0
    salient.style.display = "block"
    loud.style.display = "none"
  } else {
    console.log("change speaker to volume up")
    alarmSound.volume = 1
    loud.style.display = "block"
    salient.style.display = "none"
  }
})
stopAlarm.addEventListener('click', () => {
      pauseAudio()
})
alarmSound.addEventListener('ended', function(){
  if(!alarmTime.value == ""){
    setTimeout(function (){ playAudio()}, 5000)
      alarmSound.volume = 1
    // let audioVolume = alarmSound.volume
    console.log("i am still playing")
  }else{
   soundAlert.style.display = "none"
  }
})