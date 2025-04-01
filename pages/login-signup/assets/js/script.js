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

document.getElementById("createUserForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(`${API_URL}`, { name, email, password }, {
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        document.getElementById("createUserMessage").textContent = "✅ User created successfully!";
        document.getElementById("createUserForm").reset();
    })
    .catch(error => {
        console.error("Error creating user:", error.response ? error.response.data : error.message);
        document.getElementById("createUserMessage").textContent = "❌ Error: " + (error.response ? error.response.data.error : "Unknown error");
    });
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


function fetchUserByEmail() {
    const email = document.getElementById("searchEmail").value.trim().toLowerCase();
    const messageBox = document.getElementById("fetchUserMessage");

    if (!email) {
        messageBox.textContent = "❌ Please enter an email.";
        return;
    }

    axios.get(`${API_URL}?email=${email}`)
        .then(response => {
            if (response.data.length === 0) {
                messageBox.textContent = "❌ User not found.";
            } else {
                const user = response.data[0]; // Assuming API returns an array of matches
                messageBox.textContent = `✅ User Found: ${user.name} (ID: ${user.id}, Email: ${user.email})`;
            }
        })
        .catch(error => {
            messageBox.textContent = "❌ Error fetching user.";
            console.error("Error fetching user:", error.response ? error.response.data : error.message);
        });
}



// ✅ Update User Name
function updateUser() {
    const id = document.getElementById("updateUserId").value.trim();
    const name = document.getElementById("newUserName").value.trim();
    const messageBox = document.getElementById("updateUserMessage");

    if (!id || !name) {
        messageBox.textContent = "❌ Please enter User ID and new name.";
        return;
    }

    axios.put(`${API_URL}/${id}`, { name }, {
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        messageBox.textContent = `✅ Name updated successfully to "${response.data.name}"`;
    })
    .catch(error => {
        messageBox.textContent = "❌ Error updating name.";
        console.error("Error updating user:", error.response ? error.response.data : error.message);
    });
}


function deleteUser() {
    const id = document.getElementById("deleteUserId").value.trim();
    const messageBox = document.getElementById("deleteUserMessage");

    if (!id) {
        messageBox.textContent = "❌ Please enter User ID.";
        return;
    }

    axios.delete(`${API_URL}/${id}`)
        .then(response => {
            messageBox.textContent = "✅ User deleted successfully!";
        })
        .catch(error => {
            messageBox.textContent = "❌ Error deleting user.";
            console.error("Error deleting user:", error.response ? error.response.data : error.message);
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
        
        // 🔴 Store user data in localStorage (⚠️ Unsafe)
        localStorage.setItem("user", JSON.stringify({ name, email, password }));

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
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const messageBox = document.getElementById("login-message");

    // 🔴 Check if user exists in localStorage first
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        window.location.href = "/AWD-Finals-Drapion/pages/dashboard/index.html";
        return;
    }

    // 🔹 If not found in localStorage, check the API
    axios.post(`${API_URL}/login`, { email, password })
        .then(response => {
            if (response.data.success) {
                // Store user in sessionStorage for active session
                sessionStorage.setItem("loggedInUser", JSON.stringify(response.data.user));

                // 🔴 Store user data in localStorage (⚠️ Unsafe, but as requested)
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // Redirect to dashboard
                window.location.href = "/AWD-Finals-Drapion/pages/dashboard/index.html";
            } else {
                messageBox.textContent = "❌ Login failed: " + (response.data.message || "Incorrect credentials.");
            }
        })
        .catch(error => {
            console.error("Login Error:", error);

            if (error.response) {
                // Server responded with an error
                if (error.response.status === 400) {
                    messageBox.textContent = "❌ Invalid email or password.";
                } else if (error.response.status === 404) {
                    messageBox.textContent = "❌ User not found. Please check your email.";
                } else if (error.response.status === 500) {
                    messageBox.textContent = "❌ Server error. Please try again later.";
                } else {
                    messageBox.textContent = "❌ " + error.response.data.message;
                }
            } else if (error.request) {
                // No response received from server
                messageBox.textContent = "❌ No response from server. Check your internet connection.";
            } else {
                // Other errors
                messageBox.textContent = "❌ Login failed: " + error.message;
            }
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
