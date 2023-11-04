// Lấy tất cả các phần tử có class là 'deleteIcon' và 'updateIcon'
const deleteIcons = document.querySelectorAll(".deleteIcon");
const updateIcons = document.querySelectorAll(".updateIcon");

deleteIcons.forEach((el) => {
  el.addEventListener("click", (e) => {
    const postID = el.querySelector("span").innerText;
    var result = confirm("Bạn có chắc chắn muốn xóa bài viết?");
    if (result) {
      // Người dùng nhấn OK
      console.log("User confirmed: ", postID);

      // Gửi id về máy chủ bằng Ajax
      $.ajax({
        url: "/newfeed/individualpost",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ id: postID }), // Dữ liệu gửi lên server
        success: function (res) {
          console.log(res);
          location.reload();
        },
        error: function (error) {
          console.error("Ajax request failed:", error);
        },
      });
    } else {
      // Người dùng nhấn Cancel
      console.log("User canceled: ", postID);
    }
  });
});

updateIcons.forEach((el) => {
  el.addEventListener("click", (e) => {
    const postID = el.querySelector("span").innerText;
    const url = "/newfeed/individualPost/" + postID;
    console.log(url);

    window.location.replace(url);
  });
});
