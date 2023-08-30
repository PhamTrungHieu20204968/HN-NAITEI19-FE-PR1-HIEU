let slides = document.querySelectorAll(".carousel-item");
let dots = document.querySelectorAll(".carousel-control__btn");

for (var x = 0; x < dots.length; x++) {
  const slide = x;
  dots[x].addEventListener("click", function () {
    let i;
    for (i = 0; i < slides.length; i++) {
      slides[i].className = slides[i].className.replace(" active", "");
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slide].className += " active";
    dots[slide].className += " active";
  });
}
