//Se extiende o minimiza el menu de escritorio al presionar el icono 
export async function activateMenuFunctions() {
  const sidebar = document.querySelector(".sidebar");
  document.getElementById("btn").addEventListener("click", () => {
    sidebar.classList.toggle("active");
    if (btn.classList.contains("bx-menu")) {
      btn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      btn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  })
  document.querySelector(".bx-search").addEventListener("click", () => {
    sidebar.classList.toggle("active");
  })
}
