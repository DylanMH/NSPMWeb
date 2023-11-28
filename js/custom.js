(function ($) {
  "use strict";
  const CRE = {};
  $.fn.exists = function () {
    return this.length > 0;
  };

  /*Preloader*/
  CRE.PreLoad = function () {
    document.getElementById("loading").style.display = "none";
  };

  /*Header Fixed */
  CRE.HeaderFixd = function () {
    var HscrollTop = $(window).scrollTop();
    if (HscrollTop >= 100) {
      $(".navbar-dark").addClass("navbar-light");
      $(".navbar-dark").addClass("navbar-dark-top");
      $(".navbar-dark-top").removeClass("navbar-dark");
      $(".header-main").addClass("fixed-header");
    } else {
      $(".navbar-dark-top").removeClass("navbar-light");
      $(".navbar-dark-top").addClass("navbar-dark");
      $(".navbar-dark").removeClass("navbar-dark-top");
      $(".header-main").removeClass("fixed-header");
    }
  };

  /*Header Height */
  CRE.HeaderHeight = function () {
    var HHeight = $(".header-height").outerHeight();
    var HHeightTop = $(".header-top").outerHeight();
    $(".header-height-bar").css("min-height", HHeight);
    $(".header-main").css("top", -HHeightTop);
  };

  /*ProgressBar*/
  CRE.ProgressBar = function () {
    $(".skill-bar .skill-bar-in").each(function () {
      var bottom_object = $(this).offset().top + $(this).outerHeight();
      var bottom_window = $(window).scrollTop() + $(window).height();
      var progressWidth = $(this).attr("aria-valuenow") + "%";
      if (bottom_window > bottom_object) {
        $(this).css({
          width: progressWidth,
        });
      }
    });
  };

  // Window on load
  $(window).on("load", function () {
    CRE.PreLoad();
  });
  // Document on ready
  $(document).ready(function () {
    CRE.HeaderFixd();
    CRE.HeaderHeight();
  });
  // Window on scroll
  $(window).on("scroll", function () {
    CRE.ProgressBar();
    CRE.HeaderFixd();
  });
  // Window on resize
  $(window).on("resize", function () {
    CRE.HeaderHeight();
  });
})(jQuery);

function enableSubmitButton() {
  document.getElementById("submitButton").disabled = false;
  console.log("disabled");
}
function onSubmit(token) {
  enableSubmitButton();
  console.log(token);
  console.log("submit");
}

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const notification = document.getElementById("notification");
  const headerHeight = document.querySelector(".fixed-top").offsetHeight;

  let items = document.querySelectorAll("#servicesCarousel .carousel-item");

  items.forEach((el) => {
    const minPerSlide = 4;
    let next = el.nextElementSibling;
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        // wrap carousel by using first child
        next = items[0];
      }
      let cloneChild = next.cloneNode(true);
      el.appendChild(cloneChild.children[0]);
      next = next.nextElementSibling;
    }
  });

  //function to handle scrolling to section with an offset
  function scrollToSection(event) {
    event.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }

  const navLinks = document.querySelectorAll("a[href^='#']");
  navLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const url = contactForm.getAttribute("action");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          showNotification("Your message has been sent!", "success");
          contactForm.reset();
          document.getElementById("submitButton").disabled = true;
        } else {
          showNotification(data.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function showNotification(message, type) {
    notification.textContent = message;
    notification.classList.add(type);
    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
      notification.classList.remove(type);
    }, 7000);
  }
});
