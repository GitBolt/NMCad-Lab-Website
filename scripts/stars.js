function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const numStars = 100;
  
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      const size = Math.random() * 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Assign random speeds to each star
      star.dataset.speedX = (Math.random() - 0.5) * 0.2;
      star.dataset.speedY = (Math.random() - 0.5) * 0.4;
  
      starsContainer.appendChild(star);
    }
  }
  
  function animateStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      let x = parseFloat(star.style.left);
      let y = parseFloat(star.style.top);
      
      // Use the star's individual speed
      x += parseFloat(star.dataset.speedX);
      y += parseFloat(star.dataset.speedY);
      
      // Wrap around edges
      if (x > 100) x = 0;
      if (x < 0) x = 100;
      if (y > 100) y = 0;
      if (y < 0) y = 100;
      
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
    });
    
    // Slow down the animation frame rate
    setTimeout(() => {
      requestAnimationFrame(animateStars);
    }, 50); // 50ms delay between frames
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    createStars();
    animateStars();
  });