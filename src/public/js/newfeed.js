function addComment(commentListId, newCommentId) {
  var commentList = document.getElementById(commentListId);
  var newCommentInput = document.getElementById(newCommentId);
  var commentText = newCommentInput.value.trim();

  if (commentText !== "") {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(commentText));
    commentList.appendChild(li);

    // Clear the input field
    newCommentInput.value = "";
  }
}

// Rating
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  const result = document.getElementById("result");

  stars.forEach((star) => {
    star.addEventListener("click", setRating);
    star.addEventListener("mouseover", hoverRating);
  });

  function setRating(e) {
    const clickedStar = e.target;
    const rating = clickedStar.getAttribute("data-value");
    result.innerHTML = `Bạn đã đánh giá ${rating} sao.`;

    // stars.forEach((star) => {
    //   star.classList.remove("active", "prev-active");
    // });

    clickedStar.classList.add("active");

    // Thêm lớp 'prev-active' cho tất cả ngôi sao đứng trước
    let prevStar = clickedStar.previousElementSibling;
    while (prevStar) {
      prevStar.classList.add("prev-active");
      prevStar = prevStar.previousElementSibling;
    }
  }

  function hoverRating(e) {
    const hoveredStar = e.target;
    const rating = hoveredStar.getAttribute("data-value");
    result.innerHTML = `Đánh giá ${rating} sao.`;

    stars.forEach((star) => {
      star.classList.remove("active", "prev-active");
    });

    hoveredStar.classList.add("active");

    // Thêm lớp 'prev-active' cho tất cả ngôi sao đứng trước
    let prevStar = hoveredStar.previousElementSibling;
    while (prevStar) {
      prevStar.classList.add("prev-active");
      prevStar = prevStar.previousElementSibling;
    }
  }
});
