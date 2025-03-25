document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".platform-checkbox");
    const logoContainer = document.getElementById("logos");

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

                // Create and append the logo image
                const img = document.createElement("img");
                img.src = `img/${checkbox.value}.png`; // Path to logo images
                img.alt = checkbox.value;
                img.style.width = "100px";
                img.style.margin = "5px";
                logoContainer.appendChild(img);
            }
        });

        // Save to localStorage
        localStorage.setItem("selectedPlatforms", JSON.stringify(selectedPlatforms));
    }

    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateLogos);
    });

    // Initial update to display saved logos on load
    updateLogos();
});
