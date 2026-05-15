// --- 1. SELECTIONS ---
var fullpage = document.querySelectorAll(".full-page");
var cards = document.querySelectorAll(".card");
var bord = document.querySelector(".dashboard");
var backButtons = document.querySelectorAll(".back"); // Sabhi back buttons ke liye
var form = document.querySelector("form");
var addInput = document.querySelector(".inputs-add input");
var addtextarea = document.querySelector(".inputs-add textarea");
var todolist = document.querySelector(".todolist");

var API_KEY = "ec01c5a8190241eca71121723261205";

// --- 2. NAVIGATION LOGIC ---
function allpages() {
  cards.forEach(function (elam, index) {
    elam.addEventListener("click", () => {
      fullpage[index].style.display = "block";
      bord.style.display = "none";
    });
  });

  // Har page ke back button ko kaam pe lagane ke liye loop
  backButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      fullpage.forEach((page) => (page.style.display = "none"));
      bord.style.display = "grid";
    });
  });
}
allpages();

// --- 3. TODO LOGIC ---
function tudopage() {
  var caretitem = [];

  // Local Storage se data nikalna
  if (localStorage.getItem("caretitem")) {
    caretitem = JSON.parse(localStorage.getItem("caretitem"));
  }

  // RENDER FUNCTION (Screen par dikhana)
  function rendartask() {
    var sum = "";
    caretitem.forEach((elam, index) => {
      sum += `
      <div class="your-todo">
        <div class="todo-text">
          <h2>${elam.task}</h2>
          <p>${elam.details}</p>
        </div>
        <button id="${index}" class="complitied">Task Completed</button>
      </div>`;
    });

    todolist.innerHTML = "<h2>Task's</h2>" + sum; // Heading ko maintain rakha
    localStorage.setItem("caretitem", JSON.stringify(caretitem));

    // DELETE LOGIC
    var allComplitedBtns = document.querySelectorAll(".complitied");
    allComplitedBtns.forEach((btn) => {
      btn.onclick = () => {
        var id = btn.getAttribute("id");
        caretitem.splice(id, 1);
        rendartask();
      };
    });
  }

  // Initial Run
  rendartask();

  // FORM SUBMIT
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (addInput.value.trim() !== "") {
      caretitem.push({
        task: addInput.value,
        details: addtextarea.value,
      });
      rendartask();
      addInput.value = "";
      addtextarea.value = "";
    }
  });
}

tudopage();

// ----Home page warchtime---//

function watchtime() {
  var tamp = document.querySelector(".tamp-digri .deg");
  var tampcondition = document.querySelector(".tamp-tamprchar .tampcondition");
  var Precipitation = document.querySelector(".Precipitation");
  var Humidity = document.querySelector(".Humidity");
  var Wind = document.querySelector(".Wind");

  var date = document.querySelector(".tamp-time h5");
  var time = document.querySelector(".tamp-time h3");

  const totalDaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const totalMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  async function weather() {
    var City = "Jaipur";

    let data = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${City}`,
    );

    let weatherdata = await data.json();

    // Weather Data
    tamp.innerHTML = weatherdata.current.temp_c;

    tampcondition.innerHTML = weatherdata.current.condition.text;

    Precipitation.innerHTML =
      "Precipitation : " + weatherdata.current.precip_mm + " mm";

    Humidity.innerHTML = "Humidity : " + weatherdata.current.humidity + "%";

    Wind.innerHTML = "Wind : " + weatherdata.current.wind_kph + " km/h";

    // Date & Time
    setInterval(() => {
      var today = new Date();

      var hours = today.getHours();
      var Minutes = today.getMinutes();
      var Seconds = today.getSeconds();

      var day = totalDaysOfWeek[today.getDay()];

      var month = totalMonths[today.getMonth()];

      var dates = today.getDate();

      var year = today.getFullYear();

      var ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;

      // 0 ko 00 banane ke liye
      Minutes = Minutes < 10 ? "0" + Minutes : Minutes;
      Seconds = Seconds < 10 ? "0" + Seconds : Seconds;
      hours = hours < 10 ? "0" + hours : hours;

      date.innerHTML = `${String(dates).padStart(2, "0")} ${month}, ${year}`;

      time.innerHTML = `${day}, ${String(hours).padStart(2, "0")}:${String(Minutes).padStart(2, "0")}:${String(Seconds).padStart(2, "0")} ${ampm}`;
    }, 1000);
  }

  weather();
}
watchtime();


// ----Thimchang---//
function thimchang() {
  var changthimebtn = document.querySelector("nav h3");
  var rootElement = document.documentElement;
  var flag = 0;

  changthimebtn.addEventListener("click", function () {
    if (flag === 0) {
      // --- DAY MODE (Light Theme) ---
      rootElement.style.setProperty("--bg-body", "#f1f5f9");
      rootElement.style.setProperty("--bg-panel", "#ffffff");
      rootElement.style.setProperty("--bg-card", "#e2e8f0");
      rootElement.style.setProperty("--text-main", "#1e293b");
      rootElement.style.setProperty("--text-muted", "#64748b");
      rootElement.style.setProperty("--nav-gradient-start", "#1e293b");

      // UI & Glass Elements for Light Mode
      rootElement.style.setProperty("--glass-white", "rgba(0, 0, 0, 0.05)");
      rootElement.style.setProperty("--glass-border", "rgba(0, 0, 0, 0.1)");
      rootElement.style.setProperty("--input-shadow", "rgba(0, 0, 0, 0.1)");
      rootElement.style.setProperty("--border-subtle", "rgba(0, 0, 0, 0.05)");
      rootElement.style.setProperty("--border-faint", "rgba(0, 0, 0, 0.02)");
      rootElement.style.setProperty("--nav-shadow", "rgba(0, 0, 0, 0.1)");

      flag = 1;
      console.log("Switched to Day Mode");
    } else {
      // --- NIGHT MODE (Dark Theme - Back to your original rootElement) ---
      rootElement.style.setProperty("--bg-body", "#0f172a");
      rootElement.style.setProperty("--bg-panel", "#1e293b");
      rootElement.style.setProperty("--bg-card", "#334155");
      rootElement.style.setProperty("--text-main", "#f8fafc");
      rootElement.style.setProperty("--text-muted", "#94a3b8");
      rootElement.style.setProperty("--nav-gradient-start", "#ffffff");

      // UI & Glass Elements for Dark Mode
      rootElement.style.setProperty(
        "--glass-white",
        "rgba(255, 255, 255, 0.1)",
      );
      rootElement.style.setProperty(
        "--glass-border",
        "rgba(255, 255, 255, 0.2)",
      );
      rootElement.style.setProperty("--input-shadow", "rgba(0, 0, 0, 0.4)");
      rootElement.style.setProperty(
        "--border-subtle",
        "rgba(255, 255, 255, 0.05)",
      );
      rootElement.style.setProperty(
        "--border-faint",
        "rgba(255, 255, 255, 0.03)",
      );
      rootElement.style.setProperty("--nav-shadow", "rgba(0, 0, 0, 0.2)");

      flag = 0;
      console.log("Switched to Night Mode");
    }
  });
}
thimchang();


// ----pomodorotimer---//
function pomodorotimer() {
  var time = document.querySelector(".time");
  var startBtn = document.querySelector(".start");
  var pauseBtn = document.querySelector(".pose");
  var resetBtn = document.querySelector(".rept");

  var totelsecndes = 25 * 60;
  time.innerHTML = "25:00";

  function updatetime() {
    var minutes = Math.floor(totelsecndes / 60);
    var seconds = totelsecndes % 60;
    time.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  var timer = null;
  var resttime = true;
  function starttimer() {
    clearInterval(timer);

    if (resttime) {
      timer = setInterval(function () {
        if (totelsecndes > 0) {
          totelsecndes--;
          updatetime();
        } else {
          resttime = false;
          time.innerHTML = "5:00";
          clearInterval(timer);
          totelsecndes = 5 * 60;
          timer = null;
        }
      }, 1000); // 1000ms = 1 second
    } else {
      timer = setInterval(function () {
        if (totelsecndes > 0) {
          totelsecndes--;
          updatetime();
        } else {
          resttime = true;
          clearInterval(timer);
          timer = null;
          time.innerHTML = "25:00";
          totelsecndes = 25 * 60;
        }
      }, 1000);
    }
  }
  function pushtime() {
    clearInterval(timer);
  }
  function restTime() {
    totelsecndes = 25 * 60;
    clearInterval(timer);
    updatetime();
  }

  startBtn.addEventListener("click", starttimer);
  pauseBtn.addEventListener("click", pushtime);
  resetBtn.addEventListener("click", restTime);
}

pomodorotimer();

// ----Motivation---//

function motivation() {
  var author = document.querySelector(".author");
  var motidata = document.querySelector(".card-moti-text h1");

  async function motivational() {
    var mati = await fetch(
      `https://motivational-spark-api.vercel.app/api/quotes/random`,
    );
    let data = await mati.json();

    motidata.innerHTML = data.quote;
    author.innerHTML = data.author;
  }
  motivational();
}
motivation();

// ----DailyPlanner---//

function dailyPlanes(){
  function dailyPlanner() {
  const maingrid = document.querySelector(".main-grid");
  let left = "";
  let right = "";

 
  const savedData = JSON.parse(localStorage.getItem("plannerData")) || {};

  for (let i = 0; i <= 23; i++) {
    let period = i < 12 ? "AM" : "PM";
    let displayHour = i % 12;
    if (displayHour === 0) displayHour = 12;

    let timeString = `${String(displayHour).padStart(2, "0")}:00 ${period}`;
    
    
    let val = savedData[`hour-${i}`] || "";

    let rowHTML = `
      <div class="row">
        <div class="time">${timeString}</div>
        <input 
          id="hour-${i}" 
          class="input-text" 
          type="text" 
          placeholder="Add task..." 
          value="${val}" 
          oninput="saveTask('hour-${i}', this.value)" 
        />
      </div>`;

    if (i < 12) {
      left += rowHTML;
    } else {
      right += rowHTML;
    }
  }

  maingrid.innerHTML = `
    <div class="column">${left}</div>
    <div class="column">${right}</div>
  `;
}

 
function saveTask(id, value) {
  // Pehle puraana data uthao
  let savedData = JSON.parse(localStorage.getItem("plannerData")) || {};
  
  // Naya data update karo
  savedData[id] = value;
  
  // Wapas LocalStorage mein string bana kar daal do
  localStorage.setItem("plannerData", JSON.stringify(savedData));
}

// Function ko call karein
dailyPlanner();

}
dailyPlanes()




