//  Window Object

console.log(window.innerHeight); // Height of browser window
console.log(window.innerWidth);  // Width of browser window

//window.alert("Welcome to learn BOM");
//window.prompt("Enter data");
//window.confirm("Are you developer?")

let myWindow;
function openWin() {
  myWindow = window.open('', '', 'width=300,height=200');
  myWindow.document.write('<p>This is a new window</p>');
  //myWindow = window.open("https://example.com", "_blank", "width=400,height=300");
  myWindow.moveTo(300, 300);
}
function moveWin() {
  if (myWindow) myWindow.moveTo(700, 300);
}
function resizeWin() {
  if (myWindow) myWindow.resizeTo(400, 700);
}
function closeWin() {
  if (myWindow) myWindow.close();
}

//  Dialog Box
function interact() {
  let name = prompt("Enter your name:");

  if (name) {
    let confirmMsg = confirm("Is your name " + name + "?");
    if (confirmMsg) {
      alert("Welcome, " + name + "!");
      document.getElementById("userOutput").textContent = `Hello, ${name}!`;
    }
  }
}


// Timer Method
let count = 0;
let intervalID;

function startTimer() {
  intervalID = setInterval(() => {
    document.getElementById("timer").textContent = ++count;
  }, 1000);
  setTimeout(() => alert("Timer running for 5 seconds!"), 5000);
}

function stopTimer() {
  clearInterval(intervalID);
}


// Navigator Object 

let ul = document.getElementById("nav")
let browser = document.createElement("li")
browser.textContent = `Browser : ${navigator.userAgent}`

let app = document.createElement("li")
app.textContent = `Browser : ${navigator.appName}`

let platform = document.createElement("li")
platform.textContent = `Platform : ${navigator.platform}`

let lang = document.createElement("li")
lang.textContent = ` Language : ${navigator.language}`

let online = document.createElement("li")
online.textContent = `Online : ${navigator.onLine}`

//nav.append(ul);
ul.append(browser, app, platform, lang, online);


if (navigator.cookieEnabled) {
  window.alert ('⚠️ Cookies are Enabled in your browser!');
}

//    Screen

function showScreenInfo() {
  let info = `
            Screen width: ${screen.width}px
            Screen height: ${screen.height}px
            Available width: ${screen.availWidth}px
            Available height: ${screen.availHeight}px
            Color depth: ${screen.colorDepth}-bit
            Pixel depth: ${screen.pixelDepth}-bit `;

  document.getElementById("info").innerText = info;
}

//    Location

console.log("URL : " + location.href);       // Full URL
console.log("Hostname : " + location.hostname);   // example.com
console.log("Path of the file : " + location.pathname);   // /about.html
console.log("Protocol : " + location.protocol);   // https:
// console.log(location.reload());
//console.log(location.href = "https://google.com")
function replace() {
  let rep = location.replace("https://google.com");
}

//    History
function goBack() {
  history.back();
}

function goForward() {
  history.forward();
}
document.getElementById("history-length").textContent = history.length;


//    Dialog Box


