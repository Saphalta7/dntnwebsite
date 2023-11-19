var validate = function(e) {
  var fields = document.querySelectorAll('.form-container textarea, .form-container input[type="text"]');
  var regEx;
  var removeSpan;
  var par;
  var check = true; // Set initial check to true
  var val;
  var errArr = [];

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value === "") {
      if (fields[i].nextElementSibling && fields[i].nextElementSibling.classList.contains('error')) {
        removeSpan = fields[i].nextElementSibling;
        par = fields[i].parentNode;
        par.removeChild(removeSpan);
      }
      fields[i].nextElementSibling.innerHTML = fields[i].placeholder + " is required.";
      fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
      check = false;
      errArr.push(fields[i]);
    } else {
      // Check if message and name values contain valid characters.
      if (fields[i].id !== 'email' && fields[i].id !== 'phone') {
        val = isValidChar(fields[i]);
        if (val === false) {
          fields[i].nextElementSibling.innerHTML = "Enter valid information.";
          fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
          check = false;
          errArr.push(fields[i]);
        } else {
          fields[i].nextElementSibling.innerHTML = "";
          fields[i].style.boxShadow = "none";
        }
      }

      if (fields[i].id === 'name') {
        val = isValidName(fields[i]);
        if (val === false) {
          fields[i].nextElementSibling.innerHTML = "Your name is not valid.";
          fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
          check = false;
          errArr.push(fields[i]);
        } else {
          fields[i].nextElementSibling.innerHTML = "";
          fields[i].style.boxShadow = "none";
        }
      }

      // Phone validation
      if (fields[i].id === 'phone') {
        val = isValidPhone(fields[i]);
        if (val === false) {
          fields[i].nextElementSibling.innerHTML = "Your phone number is not valid.";
          fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
          check = false;
          errArr.push(fields[i]);
        } else {
          fields[i].nextElementSibling.innerHTML = "";
          fields[i].style.boxShadow = "none";
        }
      }

      // Email validation
      if (fields[i].id === 'email') {
        val = isValidEmail(fields[i]);
        if (val === false) {
          fields[i].nextElementSibling.innerHTML = "Your email address is not valid.";
          fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
          check = false;
          errArr.push(fields[i]);
        } else {
          fields[i].nextElementSibling.innerHTML = "";
          fields[i].style.boxShadow = "none";
        }
      }
    }
  }

  if (check === false) {
    var count = 0;
    var toErr = setInterval(function() {
      var e = errArr[0].offsetTop - 25;
      var pos = Math.abs(e);
      if (count < pos) {
        count++;
        window.scrollTo(0, count);
      } else {
        clearInterval(toErr);
      }
    }, 1);
  }

  return check;

  // Helper functions.
  function isValidEmail(e) {
    regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = e.value;
    return regEx.test(email);
  }

  function isValidChar(e) {
    regEx = /^[a-zA-Z@#$%!?^&*()_+\-=\[\]{};':"\\|,.\/? ]*$/;
    var value = e.value;
    return regEx.test(value);
  }

  function isValidPhone(e) {
    regEx = /^[+]?[(]?[+]?\d{2,4}[)]?[-\s]?\d{2,8}[-\s]?\d{2,8}$/;
    var value = e.value;
    return regEx.test(value);
  }

  function isValidName(e) {
    regEx = /^[a-zA-Z ]*$/; // Allow spaces for names
    var value = e.value;
    return regEx.test(value);
  }
};
