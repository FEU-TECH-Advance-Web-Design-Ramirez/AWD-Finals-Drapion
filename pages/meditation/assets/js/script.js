document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  });
  
// === MODAL HANDLING ==== //
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript Loaded!");

  const modalTriggers = document.querySelectorAll(".open-modal"); 
  const experienceModal = document.getElementById("experienceModal"); 
  const experienceButtons = document.querySelectorAll(".experience-btn"); 
  const loadingModal = document.getElementById("loadingModal"); 
  const modals = document.querySelectorAll(".modal"); 
  const closeButtons = document.querySelectorAll(".close"); 
  const backButtons = document.querySelectorAll(".back-button"); 

  let selectedModal = null; 
  let selectedMeditationType = ""; 

  if (!modalTriggers.length || !closeButtons.length || !modals.length) {
      console.error("ERROR: Modal elements not found!");
      return;
  }

  modals.forEach(modal => modal.style.display = "none");

  modalTriggers.forEach(button => {
      button.addEventListener("click", function () {
          selectedModal = this.getAttribute("data-modal"); 
          selectedMeditationType = this.innerText.trim(); 
          experienceModal.style.display = "flex"; 
          setTimeout(() => experienceModal.classList.add("show"), 10);
      });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const modal = this.closest(".modal");
        if (modal) {
            console.log("Closing Modal:", modal.id);
            modal.style.display = "none";
            modal.classList.remove("show");
            const audio = modal.querySelector("audio");
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    });
});

const experienceData = {
  "Complete Beginner": {
      "Sleep": { 
        title: "Sleeping Meditation for Beginner", 
        description: "A gentle introduction to sleep meditation, guiding you to relax and unwind.", 
        audio: "/AWD-Finals-Drapion/pages/meditation/assets/audio/beginner-sleep.mp3"
      },
      "Sadness": { 
        title: "Sadness Meditation for Beginner", 
        description: "A beginner-friendly meditation to help process and heal from sadness.", 
        audio: "/AWD-Finals-Drapion/pages/meditation/assets/audio/beginner-sadness.mp3" 
      },
      "Self Esteem": { 
        title: "Self-Esteem Meditation for Beginner", 
        description: "A meditation designed to build confidence and self-worth.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/beginner-self-esteem.mp3" 
      },
      "Manifesting": { 
        title: "Manifesting Meditation for Beginner", 
        description: "An easy guide to understanding the power of manifestation.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/beginner-maifesting.mp3" 
      },
      "Stress": { 
        title: "Stress Meditation for Beginner", 
        description: "A simple meditation to help you release daily stress and tension.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/beginner-stress.mp3" 
      },
      "Productivity": { 
        title: "Productivity Meditation for Beginner", 
        description: "A meditation to enhance focus and efficiency for beginners.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-productivity.mp3" 
      },
      "Happiness": { 
        title: "Happiness Meditation for Beginner", 
        description: "A joyful meditation to cultivate happiness and gratitude.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/beginner-happiness.mp3" 
      },
      "Spirituality": { 
        title: "Spirituality Meditation for Beginner", 
        description: "An introductory meditation to connect with your inner self.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/beginner-spirituality.mp3" 
      }
  },
  "I've Meditated a Few Times": {
      "Sleep": { 
        title: "Sleeping Meditation for Intermediate", 
        description: "A deeper meditation practice to enhance sleep quality.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-sleep.mp3" 
      },
      "Sadness": { 
        title: "Sadness Meditation for Intermediate", 
        description: "A guided meditation to navigate and transform sadness.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-sadness.mp3" 
      },
      "Self Esteem": { 
        title: "Self-Esteem Meditation for Intermediate", 
        description: "A confidence-boosting meditation to reinforce self-worth.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-self-esteem.mp3" 
      },
      "Manifesting": { 
        title: "Manifesting Meditation for Intermediate", 
        description: "An advanced guide to turning thoughts into reality.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-manifesting.mp3" 
      },
      "Stress": { 
        title: "Stress Meditation for Intermediate", 
        description: "A mindful meditation to effectively manage stress.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-stress.mp3" 
      },
      "Productivity": { 
        title: "Productivity Meditation for Intermediate", 
        description: "A meditation to align focus and energy for success.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-productivity.mp3" 
      },
      "Happiness": { 
        title: "Happiness Meditation for Intermediate", 
        description: "A meditation to deepen joy and appreciation in life.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-happiness.mp3" 
      },
      "Spirituality": { 
        title: "Spirituality Meditation for Intermediate", 
        description: "A meditation to enhance spiritual awareness and connection.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/intermediate-spirituality.mp3" 
      }
  },
  "I Meditate a Lot": {
      "Sleep": { 
        title: "Sleeping Meditation for Advanced", 
        description: "A deep, immersive sleep meditation for experienced practitioners.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-sleep.mp3" 
              },
      "Sadness": { 
        title: "Sadness Meditation for Advanced", 
        description: "An advanced meditation for deep emotional healing.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-sadness.mp3" 
      },
      "Self Esteem": { 
        title: "Self-Esteem Meditation for Advanced", 
        description: "A powerful meditation to reinforce self-love and confidence.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-self-esteem.mp3" 
      },
      "Manifesting": { 
        title: "Manifesting Meditation for Advanced", 
        description: "A focused practice for manifesting with clarity and intention.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-manifesting.mp3" 
      },
      "Stress": { 
        title: "Stress Meditation for Advanced", 
        description: "A profound meditation to dissolve deep-rooted stress.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-stress.mp3" 
      },
      "Productivity": { 
        title: "Productivity Meditation for Advanced", 
        description: "A high-level meditation to maximize efficiency and output.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-productivity.mp3" 
      },
      "Happiness": { 
        title: "Happiness Meditation for Advanced", 
        description: "A transformative meditation to cultivate lasting happiness.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-happiness.mp3" 
      },
      "Spirituality": { 
        title: "Spirituality Meditation for Advanced", 
        description: "A deep spiritual journey to connect with your highest self.", 
        audio: "/AWD-Finals-Drapion-2/pages/meditation/assets/audio/advanced-spirituality.mp3" 
      }
  }
};

experienceButtons.forEach(button => {
button.addEventListener("click", function () {
    const selectedExperience = this.innerText.trim();
    const experienceInfo = experienceData[selectedExperience][selectedMeditationType];

    experienceModal.classList.remove("show");
    setTimeout(() => {
        experienceModal.style.display = "none";
        loadingModal.style.display = "flex";
        setTimeout(() => loadingModal.classList.add("show"), 10);

        setTimeout(() => {
            loadingModal.classList.remove("show");
            setTimeout(() => loadingModal.style.display = "none", 300);

            if (selectedModal) {
                const targetModal = document.getElementById(selectedModal);
                if (targetModal) {
                    targetModal.style.display = "flex";
                    setTimeout(() => targetModal.classList.add("show"), 10);
                    targetModal.querySelector(".modal-title").textContent = experienceInfo.title;
                    targetModal.querySelector(".modal-description").textContent = experienceInfo.description;

                    // Fix audio path and load it correctly
                    const audioElement = targetModal.querySelector("audio");
                    if (audioElement) {
                        audioElement.src = `assets/audio/${experienceInfo.audio}`;
                        audioElement.load();
                        audioElement.play().catch(error => console.error("Autoplay Blocked:", error));
                    }
                    
                }
            }
        }, 3000);
    }, 300);
});
});

backButtons.forEach(button => {
  button.addEventListener("click", function () {
      const currentModal = this.closest(".modal");
      currentModal.style.display = "none";
      experienceModal.style.display = "flex";
      setTimeout(() => experienceModal.classList.add("show"), 10);
  });
});
});

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