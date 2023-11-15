const editcmt = document.querySelectorAll(".editCmtIcon");
const delcmt = document.querySelectorAll(".delCmtIcon");

delcmt.forEach((elm) => {
  elm.addEventListener("click", (evt) => {
    const idCmt =
      elm.parentElement.parentElement.querySelector("li > span").innerText;
    var result = confirm("Bạn có chắc chắn muốn xóa bình luận?");

    if (result) {
      // Người dùng nhấn OK
      console.log("User confirmed: ", idCmt);

      // Gửi id về máy chủ bằng Ajax
      $.ajax({
        url: "/newfeed/delcmt",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ idCmt }), // Dữ liệu gửi lên server
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
      console.log("User canceled: ", idCmt);
    }
  });
});
editcmt.forEach((elm) => {
  elm.addEventListener("click", (evt) => {
    const li = elm.parentElement.parentElement;
    const idCmt = li.querySelector("li > span").innerText;

    const content = li.querySelector("li > .content__cmt > span").innerText;
    // console.log(content);
    li.innerHTML = `
    <div id="editCmt">
            <textarea
              name="cmtEdited"
              id="comment-edited"
              rows="1"
              required
            >${content}</textarea>
            <button type="submit">update Comment</button>
    </div>
    `;

    li.querySelector("button").addEventListener("click", (e) => {
      const contentEdited = li.querySelector("#comment-edited").value;
      //   console.log(contentEdited);
      // Gửi id về máy chủ bằng Ajax
      $.ajax({
        url: "/newfeed/edit",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ idCmt, contentEdited }), // Dữ liệu gửi lên server
        success: function (res) {
          console.log(res);
          location.reload();
        },
        error: function (error) {
          console.error("Ajax request failed:", error);
        },
      });
    });
  });
});

// Rating
function submitRating() {
  var result = confirm(
    "Bài đánh giá sẽ không chỉnh sửa được sao khi bạn đồng ý?"
  );
  if (result) {
    const selectedRating = document.querySelector(
      'input[name="rating"]:checked'
    );

    if (selectedRating) {
      const rating = selectedRating.value;
      // Lấy URL hiện tại
      var currentUrl = window.location.href;

      // Sử dụng biểu thức chính quy để lấy slug cuối cùng
      var postID = currentUrl.match(/\/([^\/]+)\/?$/)[1];
      // console.log(rating, postID);

      // Gửi id về máy chủ bằng Ajax
      $.ajax({
        url: "/newfeed/rating",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ rating, postID }), // Dữ liệu gửi lên server
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
      alert("Bạn chưa đánh giá!!!");
    }
  }
}

// const rating = document.getElementById("rating");
// console.log(rating);
