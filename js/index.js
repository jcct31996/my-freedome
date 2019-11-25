"use strict";
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    console.log('Your document is ready!');
    var myBtn = document.querySelectorAll(".myBtn");
    console.log("myBtn: " + myBtn);
    console.log("myBtn[0]: " + myBtn[0]);
    console.log("myBtn[1]: " + myBtn[1]);
    var i;
    for (i = 0; i < myBtn.length; i++) {
      console.log("myBtn[i]: " + myBtn[i]);
      myBtn[i].addEventListener("click", function () {
        alert("clicked");
      });
    }
  });
})();