const API_URL = "https://demo-api-skills.vercel.app/api/MentalWellness/users"; // Change to your Vercel API
const group = "admin";

// Fetch all users
function fetchUsers() {
  axios.get(API_URL)
      .then(response => {
          console.log("Fetched users:", response.data); // Debugging step
          const users = response.data;

          if (!Array.isArray(users)) {
              document.getElementById("output").innerHTML = "No users found or invalid API response.";
              return;
          }

          let outputHTML = "<ul>";
          users.forEach(user => {
              outputHTML += `<li><strong>${user.id}</strong> - ${user.email} (Group: ${user.group})</li>`;
          });
          outputHTML += "</ul>";
          document.getElementById("output").innerHTML = outputHTML;
      })
      .catch(error => {
          document.getElementById("output").innerHTML = "Error fetching users";
          console.error("Error:", error);
      });
}


// Add a new user
document.getElementById("userForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(API_URL, { name, email, password, group: "admin" })
        .then(response => {
            alert("User added successfully!");
            fetchUsers(); // Refresh the user list
            document.getElementById("userForm").reset(); // Clear the form
        })
        .catch(error => {
            alert("Error adding user");
            console.error("Error:", error);
        });
});

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

    fetchUsers(); // Automatically fetch users when the page loads
});

const registerButton = document.getElementById("register");
const loginButton = document.getElementById("loginButton");
const doubleSlider = document.getElementById("doubleSlider");

registerButton?.addEventListener("click", () => {
    doubleSlider.classList.add("right-panel-active");
});

loginButton?.addEventListener("click", () => {
    doubleSlider.classList.remove("right-panel-active");
});

window.addEventListener("resize", function () {
    const lsbSection = document.querySelector(".lsbsection");
    if (window.innerWidth <= 900) {
        lsbSection.style.display = "none";
    } else {
        lsbSection.style.display = "block";
    }
});

window.addEventListener("resize", function () {
    const smlSection = document.querySelector(".sml-section");
    if (window.innerWidth >= 901) {
        smlSection.style.display = "none";
    } else {
        smlSection.style.display = "block";
    }
});

function toggleSmlForm(type) {
    if (type === "signup") {
        document.getElementById("sml-login-form").classList.add("sml-hidden");
        document.getElementById("sml-signup-form").classList.remove("sml-hidden");
        document.getElementById("sml-form-title").innerText = "Signup Form";
    } else {
        document.getElementById("sml-signup-form").classList.add("sml-hidden");
        document.getElementById("sml-login-form").classList.remove("sml-hidden");
        document.getElementById("sml-form-title").innerText = "Login Form";
    }
}

function signupUser(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (localStorage.getItem(email)) {
        document.getElementById('signup-message').textContent = "Account already exists. Please login.";
        return;
    }

    const userData = { email, password };

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
    window.location.href = '/AWD-Finals-Drapion/pages/dashboard/index.html'; // Redirect to account page after successful login
}

function checkLogin() {
    if (!sessionStorage.getItem('loggedInUser')) {
        window.location.href = '/AWD-Finals-Drapion/pages/login-signup/index.html'; // Redirect to login if not logged in
    }
}

function logoutUser() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = '/AWD-Finals-Drapion/index.html'; // Redirect to landing after logout
}
