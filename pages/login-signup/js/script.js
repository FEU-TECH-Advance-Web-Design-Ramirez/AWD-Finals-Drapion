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
  
  const registerButton = document.getElementById("register");
  const loginButton = document.getElementById("loginButton");
  const doubleSlider = document.getElementById("doubleSlider");
  
  registerButton.addEventListener("click", () => {
      doubleSlider.classList.add("right-panel-active");
  });
  
  loginButton.addEventListener("click", () => {
      doubleSlider.classList.remove("right-panel-active");
  });
  
  function signupUser(event) {
      event.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
  
      if (localStorage.getItem(email)) {
          document.getElementById('signup-message').textContent = "Account already exists. Please login.";
          return;
      }
  
      const userData = {
          email,
          password,
      };
  
      localStorage.setItem(email, JSON.stringify(userData));
      document.getElementById('signup-message').textContent = "Your account has been successfully created! Redirecting to login page...";
      setTimeout(() => window.location.href = '/AWD-Finals-Drapion/pages/login-signup/index.html', 1500);
  }
  
  
  function loginUser(event) {
      event.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      const userData = JSON.parse(localStorage.getItem(email));
  
      if (!userData || userData.password !== password) {
          document.getElementById('login-message').textContent = "Invalid email or password.";
          return;
      }
  
      // Store the logged-in user in sessionStorage (simulating a login session)
      sessionStorage.setItem('loggedInUser', email);
      window.location.href = './pages/dashboard/index.html'; // Redirect to account page after successful login
  }
  
  function checkLogin() {
      if (!sessionStorage.getItem('loggedInUser')) {
          window.location.href = '/AWD-Finals-Drapion/pages/login-signup/index.html'; // Redirect to login if not logged in
      }
  }
  
  function logoutUser() {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = '/AWD-Finals-Drapion/index.html'; // Redirect to login after logout
  }