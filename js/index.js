(function () {
    function e() {
    var myBtn = document.querySelectorAll(".myBtn");
    for (var k = 0; k < myBtn.length; k++) {
      myBtn[k].addEventListener("click", function () {
        alert("clicked");
      });
    }
  }
  if (document.readyState !== "loading") {
    e()
  } else {
    document.addEventListener("DOMContentLoaded", e)
  }
}());

/*
window.PPAemConnector = (function () {

  var myBtn = function () {
    var myBtn = document.querySelectorAll(".myBtn");
    console.log("myBtn: " + myBtn);
    var i;
    for (i = 0; i < myBtn.length; i++) {
      console.log("myBtn[i]: " + myBtn[i]);
      myBtn[i].addEventListener("click", function () {
        alert("clicked");
      });
    }
  };

  return {
    myBtn: myBtn
  }

}());

*/