'use strict';

const lightbox = GLightbox({
  selector: '.glightbox'
});



const filterBtns = document.querySelectorAll("[data-filter-btn]");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // toggle active class
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.textContent.trim();

    projectCards.forEach(card => {
      const tag = card.querySelector(".card-tag").textContent.trim();

      if (tag === category) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  });
});
//  News
const form = document.getElementById('newsletterForm');
const successMsg = document.getElementById('newsletterSuccess');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = form.querySelector('input[name="email"]').value.trim();

  if (!email) return alert('Please enter a valid email.');

  try {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScgpLSJpdh9e5CldFGBVqxLftItWYm2Q05MAniewPewFn7ygA/formResponse';

    const params = new URLSearchParams();
    params.append('entry.1893605483', email);

    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    form.reset();
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);

  } catch (err) {
    console.error(err);
    alert('Error submitting form.');
  }
});


/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);