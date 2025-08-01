$(document).ready(function () {
  $("#mobile--btn").on("click", function () {
    $("#mobile--menu").toggleClass("active");
    $("#mobile--btn").find("i").toggleClass("bi bi-x");
  });

  const sections = $("section");
  const navItems = $(".nav--item");

  $(window).on("scroll", function () {
    const header = $("header");
    const scrollPosition = $(window).scrollTop() - header.outerHeight();

    let activeSectionIndex = 0;

    if (scrollPosition <= 0) {
      header.css("box-shadow", "none");
    } else {
      header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1)");
    }

    sections.each(function (i) {
      const section = $(this);
      const sectionTop = section.offset().top - 150;
      const sectionBottom = sectionTop + section.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionIndex = i;
        return false;
      }
    });

    navItems.removeClass("active");
    $(navItems[activeSectionIndex]).addClass("active");
  });

  ScrollReveal().reveal("#cta", {
    origin: "left",
    duration: 2000,
    distance: "20%",
  });

  ScrollReveal().reveal("#section-text--aboutTheClinic", {
    origin: "left",
    duration: 2000,
    distance: "20%",
  });

  ScrollReveal().reveal(".image-AbouTheClinic", {
    origin: "right",
    duration: 2000,
    distance: "20%",
  });

  ScrollReveal().reveal(".service", {
    origin: "bottom",
    distance: "50px",
    duration: 800,
    interval: 100,
    reset: false,
  });

  ScrollReveal().reveal("#testimonials-physical-therapist", {
    origin: "left",
    duration: 1000,
    distance: "20%",
  });

  ScrollReveal().reveal("#section-text--testimonials", {
    origin: "right",
    duration: 1000,
    distance: "20%",
  });

  ScrollReveal().reveal("#contact", {
    origin: "bottom",
    distance: "50px",
    duration: 800,
    distance: "20%",
  });
});
