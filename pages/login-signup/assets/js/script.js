const API_URL = "https://demo-api-skills.vercel.app/api/MentalWellness/users"; // Change to your Vercel API
const group = "admin";

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

function fetchUsers() {
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            const list = document.getElementById("usersList");
            list.innerHTML = "";

            users.forEach(user => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.innerHTML = `<strong>${user.name}</strong> (ID: ${user.id}, Email: ${user.email}) - Created: ${user.createdAt}`;
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            document.getElementById("usersList").innerHTML = `<li class="list-group-item text-danger">❌ Error: ${error.message}</li>`;
        });
}


document.getElementById("createUserForm").addEventListener("submit", signupUser);
document.getElementById("loginUserForm").addEventListener("submit", loginUser);

// ✅ SIGNUP FUNCTION
function signupUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageBox = document.getElementById("createUserMessage");

    axios.post(API_URL, { name, email, password }, {
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        messageBox.textContent = "✅ Account created! Redirecting to login...";

        document.getElementById("createUserForm").reset();
        setTimeout(() => window.location.href = "/AWD-Finals-Drapion/pages/login-signup/index.html", 1500);
    })
    .catch(error => {
        console.error("Signup Error:", error.response ? error.response.data : error.message);
        messageBox.textContent = "❌ Signup failed: " + (error.response ? error.response.data.error : "Unknown error");
    });
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();  // Ensure password is captured here
    const messageBox = document.getElementById("login-message");

    const adminEmail = "admin@example.com";
    const adminPassword = "admin1234";

    // Admin login check
    if (email === adminEmail && password === adminPassword) {
        sessionStorage.setItem("loggedInUser", JSON.stringify({ email, role: "admin" }));
        window.location.href = "../../../admin/users/index.html";  // Redirect to admin panel
        return;
    }

    const API_URL = "https://demo-api-skills.vercel.app/api/MentalWellness/users/login/";

    axios.get(API_URL + email)
        .then(response => {
            if (response.data) {
                sessionStorage.setItem("loggedInUser", JSON.stringify(response.data));
                document.getElementById("loginUserForm").reset();  // Reset form fields after success
                alert("Login Success");
                window.location.href = "/AWD-Finals-Drapion/pages/dashboard/index.html";  // Redirect to dashboard
            } else {
                messageBox.textContent = "❌ Login failed: Invalid email.";
            }
        })
        .catch(error => {
            console.error("Login Error:", error);
            messageBox.textContent = "❌ Failed to login. Please check your email.";
        });
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
