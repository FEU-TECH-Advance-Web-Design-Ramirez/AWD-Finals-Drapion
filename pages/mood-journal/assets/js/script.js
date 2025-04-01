document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
      } else {
          navbar.classList.remove("scrolled");
      }
  });
});

// DOM Elements
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input");
  journalDay = document.querySelector(".journal-day"),
  journalDate = document.querySelector(".journal-date"),
  journalsContainer = document.querySelector(".journals"),
  addEntryBtn = document.querySelector(".add-entry"),
  addJournalWrapper = document.querySelector(".add-journal-wrapper"),
  addJournalCloseBtn = document.querySelector(".close-journal-btn"),
  addJournalTitle = document.querySelector(".journal-name"),
  addJournalContent = document.querySelector(".journal-text"),
  addJournalSubmit = document.querySelector(".save-journal-btn");

// Variables
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
let selectedJournal = null;
let selectedMood = "";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const eventsArr = [];
getEntries();

// Initialize Calendar
initCalendar();

// Event Listeners
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
todayBtn.addEventListener("click", goToToday);
gotoBtn.addEventListener("click", gotoDate);
dateInput.addEventListener("input", formatDateInput);
document.addEventListener("DOMContentLoaded", () => {
  addJournalWrapper.classList.remove("active"); // Ensure journal wrapper is hidden on load
  });

  document.addEventListener("DOMContentLoaded", function () {
  const emojiIcons = document.querySelectorAll(".emoji-icon");
  emojiIcons.forEach((emoji) => {
    emoji.addEventListener("click", function () {
        selectedMood = emoji.alt.toLowerCase().replace(" emoji", ""); 
        highlightSelectedMood(emoji);
        console.log("Selected Mood:", selectedMood); 
    });
  });
  });

  addEntryBtn.addEventListener("click", () => {
    addJournalWrapper.classList.add("active"); // Show the journal wrapper
    });
    
  addJournalCloseBtn.addEventListener("click", () => {
  addJournalWrapper.classList.remove("active"); // Hide the journal wrapper
    });

    addJournalSubmit.addEventListener("click", saveJournalEntry);
    journalsContainer.addEventListener("click", handleJournalClick);
    

// Functions
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = `${months[month]} ${year}`;
  let days = "";

  for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
      const isToday = i === today.getDate() && year === today.getFullYear() && month === today.getMonth();
      if (isToday) {
          activeDay = i;
          days += `<div class="day today active">${i}</div>`;
      } else {
          days += `<div class="day">${i}</div>`;
      }
  }

  for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addDayListeners();
}

function addDayListeners() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
      day.addEventListener("click", (e) => {
          const dayNumber = Number(e.target.innerHTML);
          if (e.target.classList.contains("prev-date")) {
              prevMonth();
              setTimeout(() => setActiveDay(dayNumber), 100);
          } else if (e.target.classList.contains("next-date")) {
              nextMonth();
              setTimeout(() => setActiveDay(dayNumber), 100);
          } else {
              setActiveDay(dayNumber);
          }
      });
  });
}

function setActiveDay(day) {
  activeDay = day;
  const days = document.querySelectorAll(".day");
  days.forEach((day) => day.classList.remove("active"));
  days.forEach((day) => {
      if (Number(day.innerHTML) === activeDay && !day.classList.contains("prev-date") && !day.classList.contains("next-date")) {
          day.classList.add("active");
      }
  });
}

function prevMonth() {
  month--;
  if (month < 0) {
      month = 11;
      year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
      month = 0;
      year++;
  }
  initCalendar();
}

function goToToday() {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
}

function formatDateInput(e) {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) dateInput.value += "/";
  if (dateInput.value.length > 7) dateInput.value = dateInput.value.slice(0, 7);
  if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
  }
}

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2 && dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
  } else {
      alert("Invalid Date");
  }
}
function getActiveDay(date) {
  const day = new Date(year, month, date);
  journalDay.innerHTML = day.toString().split(" ")[0];
  journalDate.innerHTML = `${date} ${months[month]} ${year}`;
  }