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
  let startTimer = setTimeout(control, 500);

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
const countdown = document.getElementById("alarmCounter");
const message = document.getElementById("message")
let getTime = function() {
  let cTime = new Date();
  let year = cTime.getFullYear();
  let month = cTime.getMonth();
  let day = cTime.getDay();
  let setTime = `${year} ${month} ${day} ${alarmTime.value}`
  startAlarm(setTime)
}
let startAlarm = function(setTime){
  let deadline = new Date(`${setTime}`).getTime();
  var x = setInterval(function () {
      var now = new Date().getTime();
      var t = deadline - now;
      console.log(t)
      // console.log(currentTime)
      // var days = Math.floor(t / (1000 * 60 * 60 * 24));
      var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((t % (1000 * 60)) / 1000);
      // document.getElementById("day").innerHTML = days;
      console.log(`${hours}:${minutes}:${seconds}`)
      countdown.innerHTML = `${hours}:${minutes}:${seconds}`;
      if (t < 0) {
        clearInterval(x);
        message.innerHTML = "TIME UP";
        countdown.innerHTML = `${hours = 00}:${minutes = 00}:${seconds = 00}`;
      }
  }, 1000); 
}

setAlarm.addEventListener('click', function(){
  getTime()
})
    // console.log(currentTime)

stopAlarm.addEventListener('click', () => {
    countdown.innerHTML ="00:00:00"; 
    console.log(alarmTime)
  })
// const startingPoint = 16;

// let time = startingPoint * 60;

// const countdown = document.getElementById("alarmCounter");

// setInterval(updateCounter, 1000);

// function updateCounter() {

//     let hours = 00
//     const minutes = Math.floor(time / 60);
//     let seconds = time % 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     countdown.innerHTML = `${hours}:${minutes}:${seconds}`;
//     time !== 0 ? time-- : time;    

// }

// function restart(){   
//     window.location.reload();
// } 
