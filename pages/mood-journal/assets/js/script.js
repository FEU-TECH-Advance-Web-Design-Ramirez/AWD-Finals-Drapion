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
  const emojiIcons = document.querySelectorAll(".emoji-icon");
  emojiIcons.forEach((emoji) => {
      emoji.addEventListener("click", function () {
          selectedMood = emoji.alt.toLowerCase().replace(" emoji", ""); 
          highlightSelectedMood(emoji); 
          console.log("Selected Mood:", selectedMood); // for debugging
      });
  })

  addEntryBtn.addEventListener("click", () => {
    addJournalWrapper.classList.add("active"); // Show the journal wrapper
    });
    
  addJournalCloseBtn.addEventListener("click", () => {
  addJournalWrapper.classList.remove("active"); // Hide the journal wrapper
    });

    addJournalSubmit.addEventListener("click", saveJournalEntry);
    journalsContainer.addEventListener("click", handleJournalClick);
    

// Functions
// Initialize the calendar
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
  
  // Previous month's days
  for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }
  
  // Current month's days
  for (let i = 1; i <= lastDate; i++) {
      const isToday =
          i === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth();
  
      const journalEntry = eventsArr.find(
          (event) => event.day === i && event.month === month + 1 && event.year === year
      );
  
      let moodColors = {
          "glad": "#00a8a8",
          "happy": "#9dcd5a",
          "disappointed": "#76b9f0",
          "sad": "#e39751",
          "mad": "#c4391d"
      };
  
      let moodColor = journalEntry && journalEntry.journals.length > 0 ? 
                moodColors[journalEntry.journals[0].mood] || "" : "";

  
      if (isToday) {
          activeDay = i;
          getActiveDay(i);
          updateJournals(i);
          days += `<div class="day today active" style="background-color: ${moodColor};">${i}</div>`;
      } else {
          days += `<div class="day" style="background-color: ${moodColor};">${i}</div>`;
      }
  }
  
  // Next month's days
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
    
    days.forEach((dayEl) => dayEl.classList.remove("active"));
    days.forEach((dayEl) => {
        if (Number(dayEl.innerHTML) === activeDay && !dayEl.classList.contains("prev-date") && !dayEl.classList.contains("next-date")) {
            dayEl.classList.add("active");
        }
    });

    getActiveDay(activeDay);
    updateJournals(activeDay); 
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

    updateJournals(date); 
}


  function applyMoodColorsToCalendar() {
    document.querySelectorAll(".calendar-day").forEach(day => {
        const dayNumber = parseInt(day.innerText);
        const currentMonth = month + 1;
        const currentYear = year;
    
        const entry = eventsArr.find(event =>
            event.day === dayNumber &&
            event.month === currentMonth &&
            event.year === currentYear
        );
    
        if (entry && entry.journals.length > 0) {
            const moodColor = getMoodColor(entry.journals[0].mood);
            day.style.backgroundColor = moodColor;
            console.log(`Applied ${moodColor} to day ${dayNumber}`); // for debugging
        } else {
            day.style.backgroundColor = "";
        }
    });
    }

    function updateJournals(day) {
        const journalEntry = eventsArr.find(event => event.day === day && event.month === month + 1 && event.year === year);
    
        // Update the journal fields (title, content, mood)
        if (journalEntry && journalEntry.journals.length > 0) {
            selectedJournal = journalEntry.journals[0];
    
            addJournalTitle.value = selectedJournal.title;
            addJournalContent.value = selectedJournal.content;
            selectedMood = selectedJournal.mood;
    
            // Highlight the selected mood emoji
            document.querySelectorAll(".emoji-icon").forEach((emoji) => {
                if (emoji.getAttribute("alt").toLowerCase() === selectedMood) {
                    highlightSelectedMood(emoji);
                }
            });
        } else {
            selectedJournal = null;
        }
    
        // Update the journal entries container
        let journals = "";
        eventsArr.forEach((journal) => {
            if (journal.day === day && journal.month === month + 1 && journal.year === year) {
                journal.journals.forEach((entry) => {
                    // Define mood colors
                    let moodColors = {
                        "glad": "#00a8a8",
                        "happy": "#9dcd5a",
                        "disappointed": "#76b9f0",
                        "sad": "#e39751",
                        "mad": "#c4391d"
                    };
    
                    let moodColor = moodColors[entry.mood] || "#e6e6e6";
    
                    // Create the journal entry HTML
                    journals += `<div class="journal" style="background-color: ${moodColor}; border-radius: 8px; padding: 10px; margin: 5px 0; color: #fff;">
                                    <div class="journal-title">
                                        <i class="fas fa-circle"></i>
                                        <h3 class="journal-title">${entry.title}</h3>
                                    </div>
                                    <div class="journal-time">
                                        <span class="event-time">${entry.time}</span>
                                    </div>
                                </div>`;
                });
            }
        });
    
        // Update the journal container
        journalsContainer.innerHTML = journals || `<div class="no-journal"><h3>No Entries</h3></div>`;
        
        saveEntries();
        applyMoodColorsToCalendar();
    }
    
        function highlightSelectedMood() {
            document.querySelectorAll(".emoji-icon").forEach((emoji) => {
                emoji.classList.remove("selected");
                if (emoji.alt.toLowerCase().replace(" emoji", "") === selectedMood) {
                    emoji.classList.add("selected");
                }
            });
        }
         function getMoodColor(mood) {
          const moodColors = {
              "glad": "#00a8a8",
               "happy": "#9dcd5a",
               "disappointed": "#76b9f0",
              "sad": "#e39751",
              "mad": "#c4391d"
          };
          return moodColors[mood] || "#E5E1DA"; 
          }
// Save journal entry (one entry per day)
function saveJournalEntry() {
    const title = addJournalTitle.value.trim();
    const content = addJournalContent.value.trim();
    
    if (!title || !content || !selectedMood) {
        alert("Please fill all fields and select a mood.");
        return;
    }

    let journalIndex = eventsArr.findIndex(journal => 
        journal.day === activeDay && journal.month === month + 1 && journal.year === year
    );

    if (journalIndex !== -1) {
        eventsArr[journalIndex].journals[0] = {
            title,
            content,
            mood: selectedMood,
            time: new Date().toLocaleTimeString()
        };
    } else {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year,
            journals: [{
                title,
                content,
                mood: selectedMood,
                time: new Date().toLocaleTimeString()
            }],
        });
    }
    

    saveEntries();
    updateJournals(activeDay); // Refresh UI after saving

    addJournalWrapper.classList.remove("active");
    addJournalTitle.value = "";
    addJournalContent.value = "";
}




  // Prevents opening the journal entry form again if an entry exists
addEntryBtn.addEventListener("click", () => {
  let entryExists = eventsArr.some(journal => 
      journal.day === activeDay && journal.month === month + 1 && journal.year === year
  );
  
  if (entryExists) {
      alert("Your journal entry for today has been recorded already.");
      return;
  }
  
  addJournalWrapper.classList.add("active");
  });

  
// Handle journal click
function handleJournalClick(e) {
  if (e.target.closest(".journal")) {
      const journalElement = e.target.closest(".journal");
      const entryTitle = journalElement.querySelector(".journal-title").innerText;
      const entryTime = journalElement.querySelector(".event-time").innerText;
  
      eventsArr.forEach((journal) => {
          if (journal.day === activeDay && journal.month === month + 1 && journal.year === year) {
              selectedJournal = journal.journals.find(
                  (entry) => entry.title === entryTitle && entry.time === entryTime
              );
  
              if (selectedJournal) {
                  addJournalTitle.value = selectedJournal.title;
                  addJournalContent.value = selectedJournal.content;
                  selectedMood = selectedJournal.mood; 
                  highlightSelectedMood(); 
                  addJournalWrapper.classList.add("active");
              }
          }
      });
  }
  }
  
  // Save entries to localStorage
  function saveEntries() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
  }
  
  // Retrieve entries from localStorage
  function getEntries() {
  const storedEntries = localStorage.getItem("events");
  if (storedEntries) {
    eventsArr.push(...JSON.parse(storedEntries));
  }
  }
  
  // Convert time to 12-hour format
  function convertTime(time) {
  const [hour, minute] = time.split(":");
  const timeFormat = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute} ${timeFormat}`;
  }
  
  // ✅ CHECK IF USER IS LOGGED IN
function checkLogin() {
  if (!sessionStorage.getItem("loggedInUser")) {
      window.location.href = "/AWD-Finals-Drapion/pages/login-signup/index.html";
  }
}

// ✅ LOGOUT FUNCTION
function logoutUser() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "/AWD-Finals-Drapion/index.html";
}