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

// Search Facilities
function searchFacilities() {
  const region = document.getElementById("searchRegion").value;
  const province = document.getElementById("searchProvince").value;
  const city = document.getElementById("searchCity").value;
  const type = document.getElementById("searchType").value;

  if (!region && !province && !city && !type) {
      alert("❌ Please provide at least one search criterion (region, province, city, or type).");
      return;
  }

  // Construct search location string
  let location = "";
  if (city) location = city;
  if (province) location = location ? `${location}, ${province}` : province;
  if (region) location = location ? `${location}, ${region}` : region;

  console.log("Searching for:", { location, type });

  axios.get(SEARCH_API_URL, { params: { location, type } })
      .then(response => {
          console.log("Search API Results:", response.data);
          displaySearchResults(response.data);
      })
      .catch(error => {
          console.error("Search API Error:", error.response ? error.response.data : error);
          console.warn("❗ Using Local Filtering as Fallback");

          // If API search fails, fetch all and filter manually
          axios.get(API_URL)
              .then(response => {
                  console.log("Fetched All Facilities for Local Filtering:", response.data);
                  const filtered = response.data.filter(facility =>
                      (!location || facility.location.includes(location)) &&
                      (!type || facility.type === type)
                  );
                  displaySearchResults(filtered);
              })
              .catch(err => console.error("Fallback Error Fetching All Facilities:", err));
      });
}

// Display Search Results
function displaySearchResults(results) {
  const list = document.getElementById("searchResults");
  list.innerHTML = "";

  if (results.length === 0) {
      list.innerHTML = "<li class='list-group-item text-danger'>No results found.</li>";
      return;
  }

  results.forEach(facility => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${facility.name} - ${facility.location} (${facility.type})`;
      list.appendChild(li);
  });
}

let selectedHospitals = [];

// Fetch hospitals from API and display them
function fetchAndDisplayHospitals() {
  axios.get(API_URL)
      .then(response => {
          console.log("Fetched Hospitals:", response.data);
          displayHospitalsToPick(response.data); // Pass data to display function
      })
      .catch(error => {
          console.error("Error fetching hospitals:", error);
          document.getElementById("hospitalList").innerHTML = 
              "<li class='list-group-item text-danger'>Failed to load hospitals.</li>";
      });
}

// Display hospitals to be selected for the appointment list
function displayHospitalsToPick(hospitals) {
  const list = document.getElementById("hospitalList");
  list.innerHTML = ""; // Clear the list before rendering

  hospitals.forEach((hospital, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>${hospital.name} - ${hospital.location} (${hospital.type})</span>
          <button class="btn btn-success btn-sm" onclick="selectHospital(${index}, '${hospital.name}', '${hospital.location}', '${hospital.type}')">Select</button>
      `;
      list.appendChild(li);
  });
}

// Select a hospital and store it in localStorage
function selectHospital(index, name, location, type) {
  if (!selectedHospitals) {
      selectedHospitals = [];
  }

  if (selectedHospitals.some(hospital => hospital.name === name && hospital.location === location)) {
      alert("❌ This hospital is already selected!");
      return;
  }

  selectedHospitals.push({ name, location, type });

  saveSelectedHospitals();
  alert("✅ Hospital selected for appointment!");
  displaySelectedHospitals();
}

// Save selected hospitals to localStorage
function saveSelectedHospitals() {
  localStorage.setItem("selectedHospitals", JSON.stringify(selectedHospitals));
}

// Load selected hospitals from localStorage
function loadSelectedHospitals() {
  const savedHospitals = localStorage.getItem("selectedHospitals");
  selectedHospitals = savedHospitals ? JSON.parse(savedHospitals) : [];
  displaySelectedHospitals();
}

// Call fetchAndDisplayHospitals on page load
fetchAndDisplayHospitals();
loadSelectedHospitals();

// Display selected hospitals in the appointment list
function displaySelectedHospitals() {
  const list = document.getElementById("selectedHospitalsList");
  list.innerHTML = ""; // Clear the list before rendering

  selectedHospitals.forEach(function (hospital, index) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>${hospital.name} - ${hospital.location} (${hospital.type})</span>
          <button class="btn btn-warning btn-sm" onclick="editHospital(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteHospital(${index})">Delete</button>
      `;
      list.appendChild(li);
  });
}

// Edit hospital details
function editHospital(index) {
  const hospital = selectedHospitals[index];
  const newName = prompt("Enter new name:", hospital.name);
  const newLocation = prompt("Enter new location:", hospital.location);
  const newType = prompt("Enter new type (Hospital/Clinic):", hospital.type);

  if (newName && newLocation && newType) {
      selectedHospitals[index] = { name: newName, location: newLocation, type: newType };
      saveSelectedHospitals();
      displaySelectedHospitals();
      alert("✅ Hospital details updated!");
  } else {
      alert("❌ All fields must be filled!");
  }
}

// Delete selected hospital
function deleteHospital(index) {
  if (!confirm("Are you sure you want to delete this hospital?")) return;

  selectedHospitals.splice(index, 1); // Remove hospital from the array
  saveSelectedHospitals();
  displaySelectedHospitals();
  alert("✅ Hospital deleted from appointment list!");
}

const locationData = {
  "Metro Manila": {
      "Metro Manila": ["Binondo", "Caloocan City", "Ermita", "Intramuros", "Las Pinas City", "Makati City", "Malabon City", "Malate", "Mandaluyong City", "Marikina City", "Muntinlupa City", "Navotas City", "Paco", "Pandacan", "Paranaque City", "Pasay City", "Pasig City", "Pateros", "Port Area", "Quezon City", "Quiapo", "Sampaloc", "San Juan City", "San Miguel", "San Nicolas", "Santa Ana", "Santa Cruz", "Taguig City", "Tondo", "Valenzuela City"]
  },
  "Mindanao": {
      "Agusan Del Norte": ["Buenavista", "Butuan City", "Cabadbaran City", "Carmen", "Jabonga", "Kitcharao", "Las Nieves", "Magallanes", "Nasipit", "Remedios T. Romualdez", "Santiago", "Tubay"],
      "Agusan Del Sur": ["Bayugan City", "Bunawan", "Esperanza", "La Paz", "Loreto", "Prosperidad", "Rosario", "San Francisco", "San Luiz", "Santa Josefa", "Sibagat", "Talacogon", "Trento", "Veruela"] ,
      "Basilan": ["Akbar", "Al-Barka", "Hadji Mohammad Ajul", "Hadji Muhtamad", "Isabela City", "Lamitan City", "Lantawan", "Maluso", "Sumisip", "Tabuan-Lasa", "Tipo-Tipo", "Tuburan", "Ungkaya Pukan"],
      "Bukidnon": ["Malaybalay City", "Valencia City", "Maramag", "Quezon", "Don Carlos"] ,
      "Camiguin": ["Mambajao", "Mahinog", "Guinsiliban", "Sagay", "Catarman"],
      "Compostela Valley": ["Compostela", "Monkayo", "Mawab", "Nabunturan", "Pantukan"],
      "Cotabato": ["Kidapawan City", "Matalam", "Midsayap", "Kabacan", "Pikit"],
      "Davao Del Norte": ["Tagum City", "Panabo City", "Samal City", "Carmen", "Kapalong"],
      "Davao Del Sur": ["Davao City", "Digos"],
      "Davao Oriental": ["Mati City", "Baganga", "Boston", "Caraga", "Cateel"],
      "Dinagat Islands": ["San Jose", "Dinagat", "Libjo", "Tubajon"],
      "Lanao Del Norte": ["Iligan City", "Kapatagan", "Lala", "Sultan Naga Dimaporo"],
      "Lanao Del Sur": ["Marawi City", "Malabang", "Wao"],
      "Maguindanao": ["Cotabato City", "Datu Odin Sinsuat", "Buluan"],
      "Misamis Occidental": ["Oroquieta City", "Ozamiz City", "Tangub City"],
      "Misamis Oriental": ["Cagayan de Oro", "Gingoog"],
      "North Cotabato": ["Kidapawan City", "Midsayap"],
      "Sarangani": ["Alabel", "Glan"],
      "South Cotabato": ["General Santos City", "Koronadal City"],
      "Sultan Kudarat": ["Isulan", "Tacurong City"],
      "Sulu": ["Jolo", "Patikul"],
      "Surigao Del Norte": ["Surigao City", "Dapa"],
      "Surigao Del Sur": ["Tandag City", "Bislig City"],
      "Tawi-Tawi": ["Bongao", "Sitangkai"],
      "Zamboanga Del Norte": ["Dipolog City", "Dapitan City"],
      "Zamboanga Del Sur": ["Pagadian City", "Zamboanga City"],
      "Zamboanga Sibugay": ["Ipil"]
  },
  "North Luzon": {
      "Pangasinan": ["Dagupan", "Lingayen", "Alaminos", "Urdaneta"],
      "Benguet": ["Baguio City", "La Trinidad"],
      "Ilocos Norte": ["Laoag City", "Batac"],
      "Ilocos Sur": ["Vigan City", "Candon"],
      "La Union": ["San Fernando City", "Bauang"]
  },
  "South Luzon": {
      "Laguna": ["Calamba", "Santa Rosa", "San Pablo", "Biñan"],
      "Batangas": ["Batangas City", "Lipa", "Tanauan", "Nasugbu"],
      "Quezon": ["Lucena City", "Tayabas"],
      "Cavite": ["Tagaytay", "Dasmariñas", "Bacoor", "Imus"]
  },
  "Visayas": {
      "Cebu": ["Cebu City", "Mandaue", "Lapu-Lapu", "Talisay"],
      "Iloilo": ["Iloilo City", "Passi", "Oton"],
      "Leyte": ["Tacloban", "Ormoc"],
      "Negros Occidental": ["Bacolod", "San Carlos"],
      "Bohol": ["Tagbilaran", "Ubay"]
  }
};

document.getElementById("facilityRegion").addEventListener("change", function() {
  const region = this.value;
  const provinceSelect = document.getElementById("facilityProvince");
  const citySelect = document.getElementById("facilityCity");
  provinceSelect.innerHTML = '<option value="">Select Province</option>';
  citySelect.innerHTML = '<option value="">Select City</option>';
  
  if (region && locationData[region]) {
      Object.keys(locationData[region]).forEach(province => {
          let option = document.createElement("option");
          option.value = province;
          option.textContent = province;
          provinceSelect.appendChild(option);
      });
  }
});