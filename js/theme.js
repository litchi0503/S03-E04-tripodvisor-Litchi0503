const theme = {
  init: function () {
    const buttonLune = document.querySelector("#theme-switch");
    buttonLune.addEventListener("click", theme.handleFormClick);
    body = document.querySelector("body");

    const buttonsColorArray = document.querySelectorAll(".theme-button");
    for (const button of buttonsColorArray) {
      button.addEventListener("click", theme.handleClickButtonColor);
    }
  },

  handleFormClick: function (event) {
    event.preventDefault();
    body.classList.toggle("theme-dark");
  },

  handleClickButtonColor: function (event) {
    let idName = event.target.id;

    if (body.classList.contains(idName)) {
      body.classList.remove(idName);
      theme.lockThemeDark();
    } else {
      // Si idName n'est pas présent, remplace la classe actuelle par idName
      body.classList.add(idName);
      theme.lockThemeDark();
    }
  },

  lockThemeDark: function () {
    if (body.classList.contains("theme-dark")) {
      body.classList.add("theme-dark");
    } else {
      body.classList.remove("theme-dark");
    }
  },
};
