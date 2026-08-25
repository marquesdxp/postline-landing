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
