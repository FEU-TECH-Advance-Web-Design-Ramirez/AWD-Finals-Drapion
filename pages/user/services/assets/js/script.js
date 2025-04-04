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