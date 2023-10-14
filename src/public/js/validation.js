const input = document.querySelectorAll('input[type="text"');
const emailinput = document.querySelector('input[type="email"]');
const pass = document.querySelector('input[type="password"');
const passAgain = document.getElementById("password-again");
const form = document.getElementById("form-1");

function errorMsg(element, massage) {
  if (element.parentElement.classList.contains("success")) {
    element.parentElement.classList.remove("success");
    element.parentElement.classList.add("invalid");
  } else {
    element.parentElement.classList.add("invalid");
  }
  element.parentElement.querySelector("span").innerText = massage;
}
function successMsg(element, massage) {
  if (element.parentElement.classList.contains("invalid")) {
    element.parentElement.classList.remove("invalid");
    element.parentElement.classList.add("success");
  } else {
    element.parentElement.classList.add("success");
  }
  element.parentElement.querySelector("span").innerText = massage;
}

arrInput = Array.from(input);

arrInput.forEach((e) => {
  e.onblur = (e) => {
    if (e.target.value.trim() === "") {
      errorMsg(e.target, "Vui lòng nhập trường này!");
    } else {
      successMsg(e.target, "Thành công!");
    }
  };
});

emailinput.onblur = (e) => {
  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (e.target.value === "") {
    errorMsg(e.target, "Vui lòng nhập trường này!");
  } else if (!emailRegex.test(String(e.target.value).toLowerCase())) {
    errorMsg(e.target, "Email không hợp lệ. Vui lòng nhập lại email!");
  } else {
    successMsg(e.target, "Thành công!");
  }
};

function checkPassAgain(e1, e2) {
  return e1.value === e2.value;
}

pass.onblur = (e) => {
  if (e.target.value === "") {
    errorMsg(e.target, "Vui lòng nhập trường này!");
  } else if (e.target.value.length < 6) {
    errorMsg(e.target, "Mật khẩu phải từ 6 chữ số.");
  } else {
    successMsg(e.target, "Thành công!");
  }
};

passAgain.onblur = (e) => {
  if (e.target.value === "") {
    errorMsg(e.target, "Vui lòng nhập trường này!");
  } else if (checkPassAgain(pass, passAgain)) {
    successMsg(e.target, "Thành công!");
  } else {
    errorMsg(e.target, "Mật khẩu nhập lại sai!");
  }
};

form.addEventListener("submit", (e) => {
  const formGr = document.querySelectorAll(".form__group");
  let arrFG = Array.from(formGr);
  let isValid = true;
  arrFG.forEach((e) => {
    if (e.classList.contains("invalid")) isValid = false;
  });
  if (isValid) {
    console.log("------------------Người dùng nhập đúng và đủ các trường!");
  } else {
    alert("Có lỗi, Vui lòng xem lại dữ liệu bạn đã cung cấp");
  }
});
