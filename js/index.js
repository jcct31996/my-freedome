var myButton = function () {
  console.log("$A" + $A);
  console.log("document" + document);
  var myBtn = document.querySelector('#fbbf8631-c663-43de-b9a0-27a7c5e31bf7').shadowRoot.querySelectorAll('.myBtn');
  var i;
  if (myBtn.length) {
    for (i=0; i<myBtn.length; i++){
      myBtn[i].addEventListener("click", function() {
        console.log("clicked");
      })
    }
  }
}();

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.querySelectorAll(".cmp-card__item");
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

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function (b) {
    var a = this;
    if (!document.documentElement.contains(a)) {
      return null
    }
    do {
      if (a.matches(b)) {
        return a
      }
      a = a.parentElement || a.parentNode
    } while (a !== null && a.nodeType === 1);
    return null
  }
}(function () {
  var f = "cmp";
  var g = "tabs";
  var c = {
    END: 35,
    HOME: 36,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40
  };
  var d = {
    self: "[data-" + f + '-is="' + g + '"]',
    active: {
      tab: "cmp-tabs__tab--active",
      tabpanel: "cmp-tabs__tabpanel--active"
    }
  };

  function a(i) {
    var m = this;
    if (i && i.element) {
      q(i)
    }

    function q(s) {
      s.element.removeAttribute("data-" + f + "-is");
      r(s.element);
      m._active = h(m._elements.tab);
      if (m._elements.tabpanel) {
        o();
        l()
      }
      if (window.Granite && window.Granite.author && window.Granite.author.MessageChannel) {
        new window.Granite.author.MessageChannel("cqauthor", window).subscribeRequestMessage("cmp.panelcontainer", function (t) {
          if (t.data && t.data.type === "cmp-tabs" && t.data.id === m._elements.self.dataset.cmpPanelcontainerId) {
            if (t.data.operation === "navigate") {
              j(t.data.index)
            }
          }
        })
      }
    }

    function h(t) {
      if (t) {
        for (var s = 0; s < t.length; s++) {
          if (t[s].classList.contains(d.active.tab)) {
            return s
          }
        }
      }
      return 0
    }

    function r(y) {
      m._elements = {};
      m._elements.self = y;
      var s = m._elements.self.querySelectorAll("[data-" + f + "-hook-" + g + "]");
      for (var v = 0; v < s.length; v++) {
        var w = s[v];
        if (w.closest("." + f + "-" + g) === m._elements.self) {
          var x = g;
          x = x.charAt(0).toUpperCase() + x.slice(1);
          var u = w.dataset[f + "Hook" + x];
          if (m._elements[u]) {
            if (!Array.isArray(m._elements[u])) {
              var t = m._elements[u];
              m._elements[u] = [t]
            }
            m._elements[u].push(w)
          } else {
            m._elements[u] = w
          }
        }
      }
    }

    function l() {
      var t = m._elements.tab;
      if (t) {
        for (var s = 0; s < t.length; s++) {
          (function (u) {
            t[s].addEventListener("click", function (v) {
              k(u)
            });
            t[s].addEventListener("keydown", function (v) {
              n(v)
            })
          })(s)
        }
      }
    }

    function n(t) {
      var s = m._active;
      var u = m._elements.tab.length - 1;
      switch (t.keyCode) {
        case c.ARROW_LEFT:
        case c.ARROW_UP:
          t.preventDefault();
          if (s > 0) {
            k(s - 1)
          }
          break;
        case c.ARROW_RIGHT:
        case c.ARROW_DOWN:
          t.preventDefault();
          if (s < u) {
            k(s + 1)
          }
          break;
        case c.HOME:
          t.preventDefault();
          k(0);
          break;
        case c.END:
          t.preventDefault();
          k(u);
          break;
        default:
          return
      }
    }

    function o() {
      var s = m._elements.tabpanel;
      var u = m._elements.tab;
      if (s) {
        if (Array.isArray(s)) {
          for (var t = 0; t < s.length; t++) {
            if (t === parseInt(m._active)) {
              s[t].classList.add(d.active.tabpanel);
              s[t].removeAttribute("aria-hidden");
              u[t].classList.add(d.active.tab);
              u[t].setAttribute("aria-selected", true);
              u[t].setAttribute("tabindex", "0")
            } else {
              s[t].classList.remove(d.active.tabpanel);
              s[t].setAttribute("aria-hidden", true);
              u[t].classList.remove(d.active.tab);
              u[t].setAttribute("aria-selected", false);
              u[t].setAttribute("tabindex", "-1")
            }
          }
        } else {
          s.classList.add(d.active.tabpanel);
          u.classList.add(d.active.tab)
        }
      }
    }

    function p(t) {
      var s = window.scrollX || window.pageXOffset;
      var u = window.scrollY || window.pageYOffset;
      t.focus();
      window.scrollTo(s, u)
    }

    function j(s) {
      m._active = s;
      o()
    }

    function k(s) {
      j(s);
      p(m._elements.tab[s])
    }
  }

  function b(k) {
    var m = k.dataset;
    var i = [];
    var n = g;
    n = n.charAt(0).toUpperCase() + n.slice(1);
    var h = ["is", "hook" + n];
    for (var j in m) {
      if (m.hasOwnProperty(j)) {
        var l = m[j];
        if (j.indexOf(f) === 0) {
          j = j.slice(f.length);
          j = j.charAt(0).toLowerCase() + j.substring(1);
          if (h.indexOf(j) === -1) {
            i[j] = l
          }
        }
      }
    }
    return i
  }

  function e() {
    var m = document.querySelectorAll(d.self);
    for (var k = 0; k < m.length; k++) {
      new a({
        element: m[k],
        options: b(m[k])
      })
    }
    var l = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var h = document.querySelector("body");
    var j = new l(function (i) {
      i.forEach(function (n) {
        var o = [].slice.call(n.addedNodes);
        if (o.length > 0) {
          o.forEach(function (p) {
            if (p.querySelectorAll) {
              var q = [].slice.call(p.querySelectorAll(d.self));
              q.forEach(function (r) {
                new a({
                  element: r,
                  options: b(r)
                })
              })
            }
          })
        }
      })
    });
    j.observe(h, {
      subtree: true,
      childList: true,
      characterData: true
    })
  }
  if (document.readyState !== "loading") {
    e()
  } else {
    document.addEventListener("DOMContentLoaded", e)
  }
}());
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var h = document.getElementsByClassName("cmp-tabs__tab--collapsible");
    if (h) {
      for (var c = 0; c < h.length; c++) {
        if (h[c].classList.contains("cmp-tabs__tab--active")) {
          h[c].classList.remove("cmp-tabs__tab--active")
        }
        h[c].addEventListener("click", function () {
          this.classList.toggle("cmp-tabs__tab--active");
          this.nextElementSibling.classList.toggle("cmp-tabs__panel--hidden")
        })
      }
    }
    var f = document.getElementsByClassName("cmp-tabs__tab--twoSelector");
    if (f) {
      for (var c = 0; c < f.length; c++) {
        if (f[c].classList.contains("cmp-tabs__tab--active")) {
          f[c].classList.remove("cmp-tabs__tab--active")
        }
        f[c].addEventListener("click", function () {
          this.nextElementSibling.classList.remove("cmp-tabs__panel--hidden")
        })
      }
    }
    var e = document.querySelectorAll('[href^="#"]:not([href="#"])');
    if (e.length) {
      e.forEach(function (a) {
        a.addEventListener("click", function (k) {
          k.preventDefault();
          var l = this.hash.substring(1);
          var i = document.getElementById(l);
          if (i && i.closest(".cmp-tabs__tabpanel")) {
            var j = i.closest(".cmp-tabs__tabpanel").previousElementSibling;
            j.click()
          }
        })
      })
    }
    var b = fs.helpers.getUrlParam("a");
    if (b) {
      var d = document.getElementById(b);
      if (d && d.closest(".cmp-tabs__tabpanel")) {
        var g = d.closest(".cmp-tabs__tabpanel").previousElementSibling;
        g.click();
        d.scrollIntoView({
          block: "start",
          behavior: "smooth"
        })
      }
    }
  })
})();

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var a = document.querySelectorAll("[data-lazy-video-id]") || null;
    if (document.querySelectorAll("[data-lazy-video-id]").length) {
      a.forEach(function (c) {
        if (c.dataset.target !== "fs-modal-video") {
          var d = document.createElement("img");
          d.className = "cmp-video__video-wrapper-image";
          d.alt = "video";
          d.src = "https://img.youtube.com/vi/" + c.dataset.lazyVideoId + "/sddefault.jpg";
          d.onload = function (f) {
            var g = f.path || (f.composedPath && f.composedPath());
            var e = 0;
            if (g != undefined) {
              e = g[0].naturalWidth
            } else {
              e = f.target.naturalWidth
            }
            if (e == 120) {
              return
            }
            if (e < 480) {
              this.src = "https://img.youtube.com/vi/" + c.dataset.lazyVideoId + "/hqdefault.jpg"
            }
          };
          var b = document.createElement("div");
          b.className = "cmp-video__video-wrapper-play-button";
          c.appendChild(d);
          c.appendChild(b);
          c.addEventListener("click", function () {
            var e = document.createElement("iframe");
            e.className = "cmp-video__video-wrapper-iframe";
            e.setAttribute("id", c.dataset.lazyVideoId);
            e.setAttribute("frameborder", "0");
            e.setAttribute("allowfullscreen", "");
            e.setAttribute("allow", "autoplay");
            e.setAttribute("src", "https://www.youtube.com/embed/" + c.dataset.lazyVideoId + "?rel=0&showinfo=0&autoplay=1&enablejsapi=1&origin=https://www.f-secure.com");
            c.innerHTML = "";
            c.appendChild(e)
          })
        } else {
          c.addEventListener("click", function (h) {
            h.preventDefault();
            var f = document.createElement("div");
            f.setAttribute("class", "cmp-video__modal");
            f.setAttribute("tabindex", "-1");
            f.setAttribute("role", "dialog");
            f.innerHTML = '<div class="cmp-video__modal-header bg-black font-white"><span class="cmp-video__modal-header-close fsg-icon icon-close-alt icon-26"></span></div><div class="cmp-video__modal-body"><iframe allowfullscreen class="cmp-video__video-wrapper-iframe" allow="autoplay" frameborder="0" id="' + c.dataset.lazyVideoId + '" src="https://www.youtube.com/embed/' + c.dataset.lazyVideoId + '?rel=0&showinfo=0&autoplay=1&enablejsapi=1&origin=https://www.f-secure.com"></iframe></div>';
            document.getElementsByTagName("body")[0].appendChild(f);
            var g = document.querySelector(".cmp-video__modal-header-close");
            g.addEventListener("click", function () {
              f.outerHTML = ""
            });
            window.onkeydown = function (i) {
              if (i.keyCode == 27) {
                f.outerHTML = ""
              }
            }
          })
        }
      })
    }
  })
})();