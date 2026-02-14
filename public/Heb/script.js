document.addEventListener('DOMContentLoaded', () => {
  const revealButton = document.getElementById('reveal-button');
  const letter = document.getElementById('letter');
  const heartsContainer = document.getElementById('hearts-container');

  // Function to create falling hearts
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${2 + Math.random() * 3}s`; // Random fall duration
    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  revealButton.addEventListener('click', () => {
    letter.style.display = 'block';
    revealButton.style.display = 'none';

    // Start falling hearts
    setInterval(createHeart, 200);
  });
});
