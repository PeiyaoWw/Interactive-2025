function updateImage() {
  const img = document.getElementById('pixelArt');
  const width = window.innerWidth;

  if (width <= 600) {
    img.src = 'Love.png';
    img.style.width = '90vw';
  } else if (width <= 991) {
    img.src = 'Starfruit.png';
    img.style.width = '85vw';
  } else {
    img.src = 'Cat.gif';
    img.style.width = '70vw';
  }
}

// Run on load and resize
window.addEventListener('DOMContentLoaded', updateImage);
window.addEventListener('resize', updateImage);
