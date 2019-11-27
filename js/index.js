(function () {
  console.log("card JS loaded");
  document.addEventListener("DOMContentLoaded", function () {
    console.log("card Document DOM Ready");
    var b = document.querySelectorAll(".cmp-card__item");
    console.log("b: "+b);
    var c = 0;
    if (b.length < 1) {
      return
    }
    b.forEach(function (g) {
      var j = g.querySelector(".cmp-card__item-front");
      var h = g.querySelector(".cmp-card__item-back");
      var d = g.offsetHeight || 0;
      var f = j ? j.offsetHeight : 0;
      var i = h ? h.offsetHeight : 0;
      var e = Math.max(d, f, i);
      if (e > c) {
        c = e
      }
      if (g.dataset.cardDisableFlip == "true") {
        return
      }
      g.addEventListener("click", function (k) {
        if (!k.target.hasAttribute("href")) {
          k.preventDefault();
          j.classList.toggle("cmp-card__item--flip-front");
          h.classList.toggle("cmp-card__item--flip-back")
        }
      })
    });

    function a() {
      b.forEach(function (d) {
        var f = d.querySelector(".cmp-card__item-front");
        var e = d.querySelector(".cmp-card__item-back");
        d.style.height = c + "px";
        if (f) {
          f.style.height = c + "px"
        }
        if (e) {
          e.style.height = c + "px"
        }
      })
    }
    a()
  })
})();