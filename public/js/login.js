$("#signInBtn").on("click", function() {
  var LoginAccess = {
    username: $("#usernameSignIn")
      .val()
      .trim(),
    password: $("#passwordSignIn")
      .val()
      .trim()
  };

  //console.log(LoginAccess);

  $.ajax("/api/login", {
    type: "POST",
    data: LoginAccess
  }).then(function(res) {
    //console.log("in then client side");
    //console.log(res);
    if (res.url !== undefined) {
      window.location = res.url;
    } else if (res.error !== undefined) {
      // alert(res.error);
      $("#modalTitle").text("Error");
      $("#modalBody").text(res.error);
      $('.modal').modal('show');
    } else {
      location.reload();
    }
    //location.href = res;
    //console.log("login");
  });
});

$("#logout").on("click", function() {
  $.ajax("/api/logout", {
    type: "DELETE"
  }).then(function() {
    window.location = "/login";
  });
});

$("#changepass").on("click", function() {
  if (
    $("#newpassword1")
      .val()
      .trim() !== "" &&
    $("#newpassword2")
      .val()
      .trim() !== "" &&
    $("#newpassword1")
      .val()
      .trim() ===
      $("#newpassword2")
        .val()
        .trim()
  ) {
    var cpassword = {
      oldpass: $("#oldpassword")
        .val()
        .trim(),
      newpass: $("#newpassword1")
        .val()
        .trim()
    };
    $.ajax("/api/change", {
      type: "PUT",
      data: cpassword
    }).then(function() {
      window.location = "/";
    });
  } else {
    //alert("New passwords do not match");
    $("#modalTitle").text("Password Error");
    $("#modalBody").text("New passwords do not match");
    $('.modal').modal('show');
  }
});
