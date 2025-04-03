const API_URL = "https://demo-api-skills.vercel.app/api/MentalWellness/hospitals";
const SEARCH_API_URL = "https://demo-api-skills.vercel.app/api/MentalWellness/hospitals/search";

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

// Register Facility
document.getElementById("registerFacilityForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("facilityName").value;
  const region = document.getElementById("facilityRegion").value;
  const province = document.getElementById("facilityProvince").value;
  const city = document.getElementById("facilityCity").value;
  const contactInfo = document.getElementById("facilityContact").value;
  const type = document.getElementById("facilityType").value;

  if (!city || !province || !region) {
    document.getElementById("registerFacilityMessage").textContent = "❌ Please select a valid location!";
    document.getElementById("registerFacilityMessage").style.color = "red";
    return;
}

if (!type) {
    document.getElementById("registerFacilityMessage").textContent = "❌ Please select a facility type!";
    document.getElementById("registerFacilityMessage").style.color = "red";
    return;
}
});