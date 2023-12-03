const editicon = document.getElementById("editicon");
const btnUpdate = document.getElementById("Update");
const btnUpdatePass = document.getElementById("UpdatePass");
const updatelist = document.querySelectorAll(".update__list");

const id = document.getElementById("id").innerText;

const spanlist = document.querySelectorAll(".update__list > span");
let value = [];
spanlist.forEach((e) => {
  value.push(e.innerText);
});
console.log(value);

editicon.addEventListener("click", (evt) => {
  editicon.remove();
  spanlist.forEach((e) => {
    e.remove();
  });
  let i = 0;
  updatelist.forEach((e) => {
    const contentblock = document.createElement("div");
    contentblock.innerHTML = `<input
    class="contentUpdate"
    rows="1"
    value = "${value[i]}"
    required
  ></input>`;
    e.appendChild(contentblock);
    i++;
  });
  btnUpdate.style.display = "block";
});

btnUpdate.addEventListener("click", (e) => {
  const inputs = document.querySelectorAll(".contentUpdate");

  let content = [];
  inputs.forEach((elm) => {
    content.push(elm.value);
  });
  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(content[2]).toLowerCase())) {
    alert("Email không hợp lệ!");
  } else {
    console.log(content);

    const fn = content[0];
    const ln = content[1];
    const email = content[2];

    $.ajax({
      url: "/newfeed/updateInfor",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ fn, ln, email, id }), // Dữ liệu gửi lên server
      success: function (res) {
        alert(
          "Cập nhật thông tin thành công! Vui lòng đăng nhập lại để có hiệu lực !"
        );
        window.location.href = "http://192.168.27.1:3000/login";
      },
      error: function (error) {
        console.error("Ajax request failed:", error);
      },
    });
  }
});

btnUpdatePass.addEventListener("click", (e) => {
  const newPass = prompt("Nhập Mật khẩu mới: ");
  // console.log(newPass);
  $.ajax({
    url: "/newfeed/updateInfor/pass",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ newPass, id }), // Dữ liệu gửi lên server
    success: function (res) {
      alert(res);
    },
    error: function (error) {
      console.error("Ajax request failed:", error);
    },
  });
});
