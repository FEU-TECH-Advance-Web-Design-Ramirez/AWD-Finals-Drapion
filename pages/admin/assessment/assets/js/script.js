const API_URL = "https://demo-api-skills.vercel.app/api/MentalWellness/users";

function getUserData() {
    let userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
        userData = JSON.parse(userData);
        return userData;
    } else {
        console.error("User not logged in.");
        return null;
    }
}

// ✅ Display User Info in Any Page
document.addEventListener("DOMContentLoaded", async function () {
    const user = getUserData();
    if (!user) {
        window.location.href = "/AWD-Finals-Drapion/pages/login-signup/index.html"; // Redirect if not logged in
        return;
    }

    // Display user email and ID
    const userInfoContainer = document.getElementById("userInfo");
    if (userInfoContainer) {
        userInfoContainer.innerHTML = `<strong>Email:</strong> ${user.email} <br> <strong>User ID:</strong> ${user.id}`;
    }
});

// ✅ Logout Function (Call this on logout button click)
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "/AWD-Finals-Drapion/index.html"; // Redirect to home
}
