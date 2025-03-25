document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".platform-checkbox");
    const selectAllCheckbox = document.querySelector(".checkbox-all");
    const logoContainer = document.getElementById("logos");
    const selectAllButton = document.getElementById("selectAllButton");

    const platformLinks = {
        netflix: "https://www.netflix.com/dk/",
        disney: "https://www.disneyplus.com/da-dk",
        hbo: "https://play.max.com/",
        prime: "https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root",
        viaplay: "https://viaplay.dk/dk-da/",
        tv2: "https://play.tv2.dk/",
        dr1: "https://www.dr.dk/drtv/"
    };

    // Load saved selections from localStorage
    const savedPlatforms = JSON.parse(localStorage.getItem("selectedPlatforms")) || [];

    // Restore checked state from saved selections
    checkboxes.forEach(checkbox => {
        if (savedPlatforms.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    // Function to update displayed logos and save selection
    function updateLogos() {
        logoContainer.innerHTML = ""; // Clear existing logos
        let selectedPlatforms = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedPlatforms.push(checkbox.value);
            }
        });

        const logoCount = selectedPlatforms.length;
        const logoWidth = logoCount > 0 ? Math.min(15, 15 / Math.sqrt(logoCount + 2) + 5) : 15;

        const website = ["dr1", "tv2", "disney", "viaplay", "hbo", "netflix", "prime"];

        // Display logos
        selectedPlatforms.forEach(platform => {
            const imgContainer = document.createElement("a");
            imgContainer.className = "logo-container";
            imgContainer.href = platformLinks[platform] || "#";
            logoContainer.appendChild(imgContainer);
            const img = document.createElement("img");
            img.src = `img/${platform}.svg`; // Path to logo images
            img.alt = platform;
            img.style.width = `${logoWidth}dvw`;
            imgContainer.appendChild(img);
        });

        // Save to localStorage
        localStorage.setItem("selectedPlatforms", JSON.stringify(selectedPlatforms));

        // Update the selectAllCheckbox state
        updateSelectAllState();
    }

    // Handle Select All / Deselect All
    selectAllCheckbox.addEventListener("change", function () {
        const allChecked = selectAllCheckbox.checked;
        checkboxes.forEach(checkbox => {
            checkbox.checked = allChecked;
        });
        updateLogos();
    });

    // Update the state of the select all checkbox and its label
    function updateSelectAllState() {
        const allChecked = [...checkboxes].every(checkbox => checkbox.checked);
        selectAllCheckbox.checked = allChecked;
        selectAllButton.innerText = allChecked ? "Fravælg alle" : "Vælg alle";
    }

    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateLogos);
    });

    // Initial update to display saved logos on load
    updateLogos();
});
