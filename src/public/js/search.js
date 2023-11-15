const btnSearch = document.getElementById("search__icon");

btnSearch.addEventListener("click", (evt) => {
  const contentSearch = document.getElementById("search__box").value;
  if (contentSearch.trim() == "") {
  } else {
    console.log(contentSearch);
    $.ajax({
      url: "/search",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ contentSearch }), // Dữ liệu gửi lên server
      success: function (res) {
        // console.log(res);
        if (res.length == 0) {
          var elementsToRemove = document.querySelectorAll(".post");
          elementsToRemove.forEach(function (element) {
            element.remove();
          });
          const subms = document.querySelectorAll("h1");
          if (subms.length == 0) {
            const ms = document.createElement("h1");
            document.body.appendChild(ms);
            ms.innerText = "Không có kết quả!";
          }
        } else {
          var elementsToRemove = document.querySelectorAll(".post");
          elementsToRemove.forEach(function (element) {
            element.remove();
          });
          const subms = document.querySelector("h1");
          if (subms != null) subms.remove();
          // console.log(res);
          const container = document.querySelector(".Container_posts");
          res.forEach((element) => {
            container.innerHTML += `<a class="post" href="/newfeed/${element.id}">
            <div class="Header_Post">
              <p class="userName">
                <i class="fa-solid fa-circle-user"></i>
                ${element.firstName}
                ${element.lastName}
              </p>
              <p class="location">
                <i class="fa-solid fa-location-dot"></i>
                ${element.location}
              </p>
            </div>
            <p class="title">${element.title}</p>
              <img src="${element.image}" alt="Post Image" class="image" />
          </a>`;
          });
          // location.reload();
        }
      },
      error: function (error) {
        console.error("Ajax request failed:", error);
      },
    });
  }
});
