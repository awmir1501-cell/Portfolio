const typedTextEl = document.getElementById('typed-text');
const wordsToType = ['Web Developer', 'Software Developer', 'Web Designer'];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop(){
    const currentWord = wordsToType[wordIndex];

    if(isDeleting){
        charIndex--;
    } else {
        charIndex++;
    }

    typedTextEl.textContent = currentWord.substring(0, charIndex);

    let typingSpeed = isDeleting ? 60 : 120;

    if(!isDeleting && charIndex === currentWord.length){
        // finished typing the word, pause then start deleting
        typingSpeed = 1400;
        isDeleting = true;
    } else if(isDeleting && charIndex === 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % wordsToType.length;
        typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
}

if(typedTextEl){
    typeLoop();
}


const skillBars = document.querySelectorAll('.skills .layout .bar');

skillBars.forEach(bar => {
    bar.dataset.target = bar.getAttribute('data-width') || bar.style.width;
    bar.style.width = '0';
});

const skillsSection = document.querySelector('.skills');
let barsAnimated = false;

function animateBars(){
    if(barsAnimated) return;
    barsAnimated = true;
    skillBars.forEach(bar => {
        bar.style.width = bar.dataset.target;
    });
}

if(skillsSection){
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                animateBars();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}
