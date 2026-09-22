(function () {
  var CA = "2MEUjtAynFAKroo9hkHwBL8LpMmxpJrAYXucZYZ3pump";
  var SOL = "So11111111111111111111111111111111111111112";
  var toast = document.getElementById("toast");
  var hint = document.getElementById("copy-hint");
  var board = document.getElementById("ca");
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

  function copiedUI() {
    showToast("CA copied");
    if (hint) {
      var prev = "Click the address to copy";
      hint.textContent = "Copied";
      if (board) board.classList.add("is-copied");
      setTimeout(function () {
        hint.textContent = prev;
        if (board) board.classList.remove("is-copied");
      }, 1600);
    }
  }

  function copyCa() {
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
        copiedUI();
      } catch (e) {
        showToast("Select the CA and copy");
      }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CA).then(copiedUI).catch(fallback);
    } else {
      fallback();
    }
  }

  if (board) {
    board.addEventListener("click", copyCa);
    board.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        copyCa();
      }
    });
  }

  document.querySelectorAll("[data-ca]").forEach(function (el) {
    el.addEventListener("click", copyCa);
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
