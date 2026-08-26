(function () {
  "use strict";
  var banner = document.querySelector(".banner");
  function syncBannerHeight() {
    if (!banner) return;
    document.documentElement.style.setProperty("--banner-h", banner.getBoundingClientRect().height + "px");
  }
  syncBannerHeight();
  window.addEventListener("resize", syncBannerHeight);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncBannerHeight);
})();

(function () {
  "use strict";
  var PHASE_ORDER = ["prep", "edit", "media", "deliver"];
  var active = "prep";
  var autoRotate = true;
  var reducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".pl-tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".mock__body[data-phase]"));

  function render() {
    tabs.forEach(function (t) {
      var isOn = t.getAttribute("data-phase") === active;
      t.classList.toggle("is-on", isOn);
      t.setAttribute("aria-selected", isOn ? "true" : "false");
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute("data-phase") !== active;
    });
  }

  var rotateTimer;
  function selectPhase(id) {
    active = id;
    autoRotate = false;
    if (rotateTimer) clearInterval(rotateTimer);
    render();
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { selectPhase(t.getAttribute("data-phase")); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectPhase(t.getAttribute("data-phase"));
      }
    });
  });

  if (!reducedMotion) {
    rotateTimer = setInterval(function () {
      if (!autoRotate) return;
      var i = PHASE_ORDER.indexOf(active);
      active = PHASE_ORDER[(i + 1) % PHASE_ORDER.length];
      render();
    }, 4500);
  }

  render();

  // reveal on scroll
  var rvEls = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  if (rvEls.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      rvEls.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      rvEls.forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 60 + "ms";
        io.observe(el);
      });
    }
  }
})();

(function () {
  "use strict";
  var mount = document.getElementById("proofToast");
  if (!mount) return;
  var reducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  var ITEMS = [
    { name: "Marcos R.", city: "Ciudad de México", text: "se unió a la Founders Beta" },
    { name: "Valeria S.", city: "Bogotá", text: "acaba de comprar Postline" },
    { name: "Diego F.", city: "Buenos Aires", text: "descargó la versión gratis" },
    { name: "Camila T.", city: "Lima", text: "ahorró 2h en su última edición 🔥" },
    { name: "Javier M.", city: "Santiago", text: "activó su acceso de por vida" },
    { name: "Lucía G.", city: "Madrid", text: "automatizó su primer proyecto" },
    { name: "Andrés P.", city: "Barcelona", text: "probó Auto Caption por primera vez" },
    { name: "Sofía N.", city: "Medellín", text: "montó su timeline en minutos" },
    { name: "Rodrigo V.", city: "Guadalajara", text: "sincronizó sus medios con Media Sync" },
    { name: "Paula H.", city: "Montevideo", text: "organizó sus bins con un clic" },
    { name: "Nicolás E.", city: "Quito", text: "entregó su proyecto sin salir de Premiere" },
    { name: "Renata C.", city: "San José", text: "encontró su B-Roll con Clips Advisor 🔥" },
    { name: "Álvaro D.", city: "Panamá", text: "se pasó a Postline PRO" },
    { name: "Isabela K.", city: "La Paz", text: "redujo su tiempo de montaje a la mitad" },
    { name: "Tomás L.", city: "Asunción", text: "probó Postline gratis dentro de Premiere" },
    { name: "Martina B.", city: "Sevilla", text: "usó Lock para proteger su montaje" },
    { name: "Emiliano O.", city: "Rosario", text: "generó subtítulos corregidos con IA" },
    { name: "Daniela W.", city: "Monterrey", text: "terminó su entrega antes de lo previsto 🔥" },
    { name: "Bruno A.", city: "Cali", text: "empezó el método de 4 fases con Postline" },
    { name: "Florencia Q.", city: "Valencia", text: "reservó su plaza Founders Beta" }
  ];
  var AVATAR_COLORS = ["#ffcc00", "#20dc62", "#1ee0c0", "#6fb2ff", "#ff84d1"];
  var lastIndex = -1;
  var hideTimer = null;

  function pickItem() {
    var i;
    do { i = Math.floor(Math.random() * ITEMS.length); } while (i === lastIndex && ITEMS.length > 1);
    lastIndex = i;
    return ITEMS[i];
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function show() {
    var item = pickItem();
    var firstName = item.name.split(" ")[0];
    var color = AVATAR_COLORS[lastIndex % AVATAR_COLORS.length];
    mount.innerHTML =
      '<div class="proof-card" role="status">' +
      '<span class="proof-card__av" style="background:' + color + '">' + escapeHtml(item.name.charAt(0)) + '</span>' +
      '<div class="proof-card__body">' +
      '<b class="proof-card__name">' + escapeHtml(item.name) + '</b>' +
      '<p class="proof-card__text"><svg class="proof-card__check" width="13" height="13" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<span>' + escapeHtml(firstName) + ", de " + escapeHtml(item.city) + ", " + escapeHtml(item.text) + '</span></p>' +
      '</div>' +
      '<button class="proof-card__close" type="button" aria-label="Cerrar notificación">&times;</button>' +
      '</div>';

    var card = mount.querySelector(".proof-card");
    var closeBtn = mount.querySelector(".proof-card__close");

    function hide() {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      card.classList.remove("is-in");
      setTimeout(function () { if (mount.firstChild) mount.innerHTML = ""; }, reducedMotion ? 0 : 420);
    }

    closeBtn.addEventListener("click", hide);
    requestAnimationFrame(function () { card.classList.add("is-in"); });
    hideTimer = setTimeout(hide, 6500);
  }

  function scheduleNext(minMs, maxMs) {
    var delay = minMs + Math.random() * (maxMs - minMs);
    setTimeout(function () {
      show();
      scheduleNext(25000, 70000); // ~45s de media, siempre por debajo del tope de 2 minutos
    }, delay);
  }

  scheduleNext(9000, 18000); // primera aparición, algo antes para que se note pronto
})();

(function () {
  "use strict";
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".ftab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".fpanel"));
  if (!tabs.length || !panels.length) return;

  function select(cat) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-cat") === cat;
      t.classList.toggle("is-on", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute("data-cat") !== cat;
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { select(t.getAttribute("data-cat")); });
  });
})();
