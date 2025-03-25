const logos = {
    netflix: 'img/netflix_logo.png',
    disney: 'img/disney_logo.png',
    hbo: 'img/hbo_logo.png',
    dr: 'img/dr_logo.png',
    tv2: 'img/tv2_logo.png',
    viaplay: 'img/viaplay_logo.png',
    prime: 'img/prime_logo.png',
};

function saveSelection() {
    const selectedPlatforms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    localStorage.setItem('selectedPlatforms', JSON.stringify(selectedPlatforms));
}

function loadSelection() {
    const savedPlatforms = JSON.parse(localStorage.getItem('selectedPlatforms')) || [];
    savedPlatforms.forEach(platform => {
        const checkbox = document.querySelector(`input[value="${platform}"]`);
        if (checkbox) checkbox.checked = true;
    });
    displayLogos();
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const logosContainer = document.getElementById('logos');
        logosContainer.innerHTML = '';
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checked => {
            const img = document.createElement('img');
            img.src = logos[checked.value];
            img.alt = checked.value;
            logosContainer.appendChild(img);
        });
    });
});