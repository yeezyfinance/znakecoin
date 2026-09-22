(function () {
  var CA = "2MEUjtAynFAKroo9hkHwBL8LpMmxpJrAYXucZYZ3pump";
  var SOL = "So11111111111111111111111111111111111111112";
  var toast = document.getElementById("toast");
  var toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg || "Copied";
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 1600);
  }

  function copyCa(btn) {
    function done() {
      if (btn) {
        var prev = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = prev;
          btn.classList.remove("copied");
        }, 1400);
      }
      showToast("CA copied");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CA).then(done).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = CA;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } catch (e) {
        showToast("Copy failed — select the CA");
      }
      document.body.removeChild(ta);
    }
  }

  var mainBtn = document.getElementById("copy-ca");
  if (mainBtn) mainBtn.addEventListener("click", function () { copyCa(mainBtn); });

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () { copyCa(btn); });
  });

  document.querySelectorAll(".ca-text").forEach(function (el) {
    el.addEventListener("click", function () { copyCa(mainBtn || el); });
  });

  function bootJupiter() {
    if (!window.Jupiter || typeof window.Jupiter.init !== "function") return false;
    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "jupiter-plugin",
      branding: {
        name: "ZNAKE",
        logoUri: "snake.jpg"
      },
      formProps: {
        initialInputMint: SOL,
        initialOutputMint: CA,
        fixedMint: CA
      }
    });
    return true;
  }

  function waitJupiter() {
    if (bootJupiter()) return;
    var n = 0;
    var id = setInterval(function () {
      n += 1;
      if (bootJupiter() || n > 40) clearInterval(id);
    }, 250);
  }

  if (document.readyState === "complete") waitJupiter();
  else window.addEventListener("load", waitJupiter);
})();
