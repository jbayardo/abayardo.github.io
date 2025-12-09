/* ============================================
   SCRIPT GENERAL — OPTIMIZADO Y SIN DUPLICADOS
   ============================================ */


   
document.addEventListener("DOMContentLoaded", function () {

  /* ============================= */
  /* FOOTER — AÑO DINÁMICO         */
  /* ============================= */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============================= */
  /* SCROLL SUAVE DESDE EL NAV     */
  /* ============================= */
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // altura del navbar
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top,
          behavior: "smooth"
        });
      }
    });
  });

  /* =============================================== */
  /* ACTIVAR LINK DEL NAV SEGÚN SECCIÓN EN VIEWPORT  */
  /* =============================================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .btn-av-outlinehablemos");


  function setActiveLink() {
    let currentId = "";
    const scrollY = window.pageYOffset;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();


  /* ============================= */
  /* FAVICON MODO CLARO / OSCURO   */
  /* ============================= */
  function setFavicon(theme) {
    const link = document.querySelector('#favicon');
    if (!link) return;

    link.href = theme === 'dark'
      ? 'favicon-Andyvisual-negro.png'
      : 'favicon-Andyvisual-gris.png';
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  setFavicon(prefersDark.matches ? 'dark' : 'light');

  prefersDark.addEventListener('change', (event) => {
    setFavicon(event.matches ? 'dark' : 'light');
  });


  /* ============================= */
  /* REVEALS — IntersectionObserver */
  /* ============================= */
  const revealItems = document.querySelectorAll(".reveal-item");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // solo animar una vez
        }
      });
    }, {
  threshold: 0.35,
  rootMargin: "0px 0px -30% 0px"    });

    revealItems.forEach((el) => observer.observe(el));
  } else {
    // fallback: todo visible
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

}); // cierre del DOMContentLoaded



/* ============================================
   AJUSTE DINÁMICO DEL LOGO EN MOVILES
   ============================================ */
function ajustarLogo() {
  const logo = document.querySelector('.av-logo-img');
  if (!logo) return;

  const width = window.innerWidth;

  if (width <= 321) {
    const nuevoTamaño = Math.max(70, width * 0.37);
    logo.style.maxWidth = nuevoTamaño + 'px';
  } else {
    logo.style.maxWidth = '';
  }
}

window.addEventListener('load', ajustarLogo);
window.addEventListener('resize', ajustarLogo);


  const track = document.getElementById('infinite-carousel');
  // Duplica el contenido para lograr el bucle sin saltos
  track.innerHTML += track.innerHTML;