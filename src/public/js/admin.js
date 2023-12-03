// JS WELCOME
document.addEventListener("DOMContentLoaded", function () {
  // Delay the animation to make it more noticeable
  setTimeout(function () {
    animateWelcomeText();
  }, 500);
});

function animateWelcomeText() {
  const welcomeText = document.getElementById("welcomeText");
  welcomeText.style.opacity = 1;
  welcomeText.style.transform = "translateY(0)";
}

const statuser = document.getElementById("statUser");
const statpost = document.getElementById("statPost");
const h1statuser = document.getElementById("statuser");
const h1statpost = document.getElementById("statpost");
const wctext = document.getElementById("welcomeText");

h1statuser.style.display = "none";
document.getElementById("tableUser").style.display = "none";
h1statpost.style.display = "none";
document.getElementById("chart-container").style.display = "none";

document.getElementById("logoLink").addEventListener("click", function (event) {
  // Ngăn chặn hành vi mặc định của liên kết
  event.preventDefault();
  // Các xử lý khác nếu cần
});

document
  .getElementById("NameOFUser")
  .addEventListener("click", function (event) {
    // Ngăn chặn hành vi mặc định của liên kết
    event.preventDefault();
    // Các xử lý khác nếu cần
  });

statuser.addEventListener("click", (evt) => {
  h1statuser.style.display = "block";
  document.getElementById("tableUser").style.display = "table";

  wctext.style.display = "none";
  h1statpost.style.display = "none";
  document.getElementById("chart-container").style.display = "none";
  const tr = document.querySelectorAll(".tempTr");
  if (tr != null) {
    tr.forEach((e) => {
      e.remove();
    });
  }

  $.ajax({
    url: "/admin/statuser",
    method: "POST",
    contentType: "application/json",
    // data: JSON.stringify({ id: postID }), // Dữ liệu gửi lên server
    success: function (res) {
      console.log(res.users);
      const userList = document.getElementById("users");

      res.users.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td class="tempTr">${user.id}</td>
              <td class="tempTr">${user.firstName} ${user.lastName}</td>
              <td class="tempTr">${user.Email}</td>
            `;
        userList.appendChild(tr);
      });
      const userCount = document.getElementById("userCount");
      userCount.textContent = `Total Users: ${res.userCount}`;
    },
    error: function (error) {
      console.error("Ajax request failed:", error);
    },
  });
});

statpost.addEventListener("click", (evt) => {
  h1statpost.style.display = "block";
  document.getElementById("chart-container").style.display = "block";

  wctext.style.display = "none";
  h1statuser.style.display = "none";
  document.getElementById("tableUser").style.display = "none";

  $.ajax({
    url: "/admin/statpost",
    method: "POST",
    contentType: "application/json",
    success: function (res) {
      console.log(res.locations);

      // Đếm số lượng bài viết cho mỗi địa điểm
      const countByLocation = {};
      res.locations.forEach((post) => {
        countByLocation[post.location] =
          (countByLocation[post.location] || 0) + 1;
      });

      // Lấy danh sách các địa điểm và số lượng bài viết tương ứng
      const locations = Object.keys(countByLocation);
      const counts = Object.values(countByLocation);

      // Tính tổng số lượng bài viết
      const totalPosts = res.postCount;

      // Thêm tổng số lượng vào biểu đồ
      locations.push("Tổng");
      counts.push(totalPosts);

      // Sử dụng thư viện Chart.js để vẽ biểu đồ
      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: locations,
          datasets: [
            {
              label: "Số lượng bài viết",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    error: function (error) {
      console.error("Ajax request failed:", error);
    },
  });
});
