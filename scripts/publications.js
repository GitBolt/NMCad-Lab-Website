var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
} 

function sendEmail(subject) {
    var mailtoLink = "mailto:example@mail.com?subject=" + encodeURIComponent(subject);
    window.location.href = mailtoLink;
}