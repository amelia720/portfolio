const typedText = document.getElementById("typed-text"); // declare the variable to hold the element from the HTML

const phrases = [
  "Software Developer",
  "Web Developer",
  "UI/UX Designer",
  "Student"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false; // flag to check if we are deleting characters or typing new ones

function typeEffect() 
{
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) 
 {
    charIndex--;
  } 
  else 
  {
    charIndex++;
  }

typedText.textContent = currentPhrase.substring(0, charIndex); // update the text content of the element

  let delay = isDeleting ? 50 : 100; // typing speed.. the question mark is used for getting the value of the variable.. 

  if (!isDeleting && charIndex === currentPhrase.length) // if the current phrase is fully typed
  {
    delay = 2000; // pause at end
    isDeleting = true;
  } 
  else if (isDeleting && charIndex === 0) // if we have deleted all characters of the current phrase
  {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length; // move to the next phrase.. modulus operator ensures we loop back to the first phrase
    delay = 500; // pause before typing new word
  }

  setTimeout(typeEffect, delay); // call the function again after the delay
}

const hamburger = document.querySelector('.hamburger');
const navWrapper = document.querySelector('.nav-wrapper');

hamburger.addEventListener('click', () => {
  navWrapper.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", typeEffect); // start the typing effect when the DOM is fully loaded
