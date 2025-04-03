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

  // Constructing the full location format: "City, Province, Region"
  const location = `${city}, ${province}, ${region}`;

  console.log("Submitting Facility:", { name, location, contactInfo, type });

  axios.post(API_URL, { name, location, contactInfo, type })
        .then(response => {
            console.log("Response:", response.data);
            document.getElementById("registerFacilityMessage").textContent = "✅ Facility registered successfully!";
            document.getElementById("registerFacilityMessage").style.color = "green";
            document.getElementById("registerFacilityForm").reset();
        })
        .catch(error => {
            console.error("Registration Error:", error.response ? error.response.data : error);
            document.getElementById("registerFacilityMessage").textContent = "❌ Registration failed!";
            document.getElementById("registerFacilityMessage").style.color = "red";
        });
});

// Fetch All Facilities
function fetchFacilities() {
  axios.get(API_URL)
      .then(response => {
          console.log("Fetched Facilities:", response.data);
          const facilities = response.data;
          const list = document.getElementById("facilitiesList");
          list.innerHTML = "";

          facilities.forEach(facility => {
              const li = document.createElement("li");
              li.className = "list-group-item";
              li.textContent = `${facility.name} - ${facility.location} (${facility.type})`;
              list.appendChild(li);
          });
      })
      .catch(error => console.error("Error fetching facilities:", error));
}

// Display Facilities in List
function displayFacilities(facilities) {
  const list = document.getElementById("facilitiesList");
  list.innerHTML = "";

  if (facilities.length === 0) {
      list.innerHTML = "<li class='list-group-item text-danger'>No facilities found.</li>";
      return;
  }

  facilities.forEach(facility => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${facility.name} - ${facility.location} (${facility.type})`;
      list.appendChild(li);
  });
}