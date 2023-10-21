var dropdown = document.getElementById("myDropdown");
function toggleDropdown() {
  dropdown.classList.add("show");
}
function hideDropdown() {
  dropdown.classList.remove("show");
}

document.addEventListener("click", (e) => {
  dropdown.classList.remove("show");
});
