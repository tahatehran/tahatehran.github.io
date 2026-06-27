const themeToggle = document.getElementById("themeToggle");
const yearNode = document.getElementById("year");

yearNode.textContent = String(new Date().getFullYear());

const savedTheme = localStorage.getItem("movti-theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("movti-theme", isLight ? "light" : "dark");
});
