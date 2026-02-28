const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const questionContainer = document.getElementById("question-container");
const successContainer = document.getElementById("success-container");

const noTexts = [
    "No", 
    "Are you sure?", 
    "Really sure?", 
    "Think about it!",
    "Think again!", 
    "Last chance!", 
    "Surely not?",  
    "Give it another thought!", 
    "Are you absolutely certain?", 
    "This could be a mistake!", 
    "Have a heart!", 
    "Don't be so cold!", 
    "Change of heart?", 
    "Wouldn't you reconsider?", 
    "Is that your final answer?", 
    "You're breaking my heart ;(", 
    "Plsss? :(("
];

let noCount = 0;
let yesFontSize = 1.2;
let yesPadding = 15;

function moveNoButton(e) {
    if (e) e.preventDefault(); 

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    noBtn.style.position = 'fixed'; 
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    noCount++;
    if (noCount < noTexts.length) {
        noBtn.innerText = noTexts[noCount];
    } else {
        noBtn.innerText = noTexts[noTexts.length - 1]; 
    }

    yesFontSize += 0.4; 
    yesPadding += 5;
    yesBtn.style.fontSize = `${yesFontSize}rem`;
    yesBtn.style.padding = `${yesPadding}px ${yesPadding * 2}px`;
}

noBtn.addEventListener('touchstart', moveNoButton, { passive: false });

noBtn.addEventListener('mouseover', moveNoButton); 
noBtn.addEventListener('click', moveNoButton); 

yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
    triggerConfetti();
});

function triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}