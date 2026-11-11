
/* ------------------------------
   1. VEHICLE INFORMATION
------------------------------ */

const vehicles = [
    {
        id: 1,
        name: "City Glide S1",
        type: "scooter",
        price: 95000,
        range: 120,
        battery: "3.2 kWh",
        speed: "80 km/h",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=700"
    },
    {
        id: 2,
        name: "Urban Move X",
        type: "scooter",
        price: 110000,
        range: 150,
        battery: "3.8 kWh",
        speed: "90 km/h",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700"
    },
    {
        id: 3,
        name: "Volt Street Pro",
        type: "bike",
        price: 145000,
        range: 160,
        battery: "4.1 kWh",
        speed: "100 km/h",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=700"
    },
    {
        id: 4,
        name: "Eco Rider 5",
        type: "bike",
        price: 135000,
        range: 140,
        battery: "3.7 kWh",
        speed: "95 km/h",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700"
    },
    {
        id: 5,
        name: "Eon Compact",
        type: "car",
        price: 850000,
        range: 250,
        battery: "25 kWh",
        speed: "110 km/h",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700"
    },
    {
        id: 6,
        name: "Nova Electric",
        type: "car",
        price: 1200000,
        range: 320,
        battery: "35 kWh",
        speed: "125 km/h",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=700"
    }
];


/* ------------------------------
   2. PAGE NAVIGATION
------------------------------ */

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const navMenu = document.getElementById("navLinks");

function showPage() {
    let pageName = window.location.hash.substring(1);

    if (!pageName) {
        pageName = "home";
    }

    const selectedPage = document.getElementById(pageName);

    if (!selectedPage) {
        pageName = "home";
    }

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");

    navLinks.forEach(function(link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + pageName) {
            link.classList.add("active");
        }
    });

    navMenu.classList.remove("show");
    window.scrollTo(0, 0);
}

window.addEventListener("hashchange", showPage);
window.addEventListener("DOMContentLoaded", showPage);


/* ------------------------------
   3. MOBILE NAVIGATION
------------------------------ */

const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("show");
});


/* ------------------------------
   4. DISPLAY VEHICLES
------------------------------ */

const vehicleGrid = document.getElementById("vehicleGrid");

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function displayVehicles(list) {

    vehicleGrid.innerHTML = "";

    if (list.length === 0) {
        vehicleGrid.innerHTML = "<p>No vehicles found. Try another search.</p>";
        return;
    }

    list.forEach(function(vehicle) {

        const card = document.createElement("article");
        card.className = "vehicle-card";

        card.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.name}">
            <div class="vehicle-card-content">
                <span class="vehicle-type-label">${vehicle.type}</span>
                <h3>${vehicle.name}</h3>
                <div class="vehicle-price">${formatPrice(vehicle.price)}</div>

                <div class="vehicle-specs">
                    <span>${vehicle.range} km range</span>
                    <span>${vehicle.battery}</span>
                </div>

                <div class="vehicle-specs">
                    <span>Top speed</span>
                    <span>${vehicle.speed}</span>
                </div>

                <button type="button" onclick="selectForComparison(${vehicle.id})">
                    Add to comparison
                </button>
            </div>
        `;

        vehicleGrid.appendChild(card);
    });
}

displayVehicles(vehicles);


/* ------------------------------
   5. SEARCH AND FILTER
------------------------------ */

const searchInput = document.getElementById("vehicleSearch");
const typeFilter = document.getElementById("vehicleType");

function filterVehicles() {

    const searchText = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    const filteredList = vehicles.filter(function(vehicle) {

        const matchesName = vehicle.name.toLowerCase().includes(searchText);

        const matchesType =
            selectedType === "all" || vehicle.type === selectedType;

        return matchesName && matchesType;
    });

    displayVehicles(filteredList);
}

searchInput.addEventListener("input", filterVehicles);
typeFilter.addEventListener("change", filterVehicles);


/* ------------------------------
   6. VEHICLE COMPARISON
------------------------------ */

const vehicleOne = document.getElementById("vehicleOne");
const vehicleTwo = document.getElementById("vehicleTwo");

function fillComparisonOptions() {

    vehicles.forEach(function(vehicle) {

        const optionOne = document.createElement("option");
        optionOne.value = vehicle.id;
        optionOne.textContent = vehicle.name;

        const optionTwo = optionOne.cloneNode(true);

        vehicleOne.appendChild(optionOne);
        vehicleTwo.appendChild(optionTwo);
    });

    vehicleTwo.selectedIndex = 1;
}

fillComparisonOptions();


function selectForComparison(id) {

    const firstSelection = vehicleOne.value;
    const secondSelection = vehicleTwo.value;

    if (Number(firstSelection) === id) {
        vehicleOne.value = id;
    } else if (Number(secondSelection) === id) {
        vehicleTwo.value = id;
    } else {
        vehicleOne.value = id;
    }

    window.location.hash = "compare";
    compareVehicles();
}


function compareVehicles() {

    const first = vehicles.find(function(vehicle) {
        return vehicle.id === Number(vehicleOne.value);
    });

    const second = vehicles.find(function(vehicle) {
        return vehicle.id === Number(vehicleTwo.value);
    });

    const result = document.getElementById("comparisonResult");

    if (!first || !second) {
        result.textContent = "Please select two vehicles.";
        return;
    }

    if (first.id === second.id) {
        result.textContent = "Please choose two different vehicles.";
        return;
    }

    result.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Specification</th>
                    <th>${first.name}</th>
                    <th>${second.name}</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Price</td>
                    <td>${formatPrice(first.price)}</td>
                    <td>${formatPrice(second.price)}</td>
                </tr>

                <tr>
                    <td>Range</td>
                    <td>${first.range} km</td>
                    <td>${second.range} km</td>
                </tr>

                <tr>
                    <td>Battery</td>
                    <td>${first.battery}</td>
                    <td>${second.battery}</td>
                </tr>

                <tr>
                    <td>Top speed</td>
                    <td>${first.speed}</td>
                    <td>${second.speed}</td>
                </tr>

                <tr>
                    <td>Vehicle type</td>
                    <td>${first.type}</td>
                    <td>${second.type}</td>
                </tr>
            </tbody>
        </table>
    `;
}

document.getElementById("compareButton").addEventListener("click", compareVehicles);


/* ------------------------------
   7. CHARGING COST CALCULATOR
------------------------------ */

const calculateButton = document.getElementById("calculateButton");

calculateButton.addEventListener("click", function() {

    const units = Number(document.getElementById("units").value);
    const rate = Number(document.getElementById("rate").value);

    const result = document.getElementById("calculationResult");

    if (
        document.getElementById("units").value === "" ||
        document.getElementById("rate").value === "" ||
        !Number.isFinite(units) ||
        !Number.isFinite(rate) ||
        units <= 0 ||
        rate <= 0
    ) {
        result.textContent = "Please enter valid positive values in both fields.";
        return;
    }

    const totalCost = units * rate;

    result.textContent =
        "Estimated charging cost: ₹" + totalCost.toFixed(2);
});


/* ------------------------------
   8. CONTACT FORM
------------------------------ */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value;
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !interest || !message) {
        formMessage.textContent = "Please complete all the fields.";
        return;
    }

    formMessage.textContent =
        "Thank you, " + name + "! Your enquiry has been recorded in this demo.";

    contactForm.reset();
});
