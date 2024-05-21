document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('navlinks');

    menuIcon.addEventListener('click', function () {
        menuIcon.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
});


let slideIndex = 1;
showSlides(slideIndex);

function updateSlide(n) {
  showSlides(slideIndex += n);
}


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  console.log(slides.length)
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
} 