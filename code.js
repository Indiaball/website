/*Code written by Kashyap I.
  Also FINALLY the school IT 
  department doesn't fucking 
  block my access to the internet */
var type;
var experience;
var acc = 0;
if (localStorage.getItem("accounts") === null) {
  localStorage.setItem("accounts", JSON.stringify([]));
}
showScreen("loginScreen");
function showScreen(screenId) {
  var screens = document.getElementsByClassName("screen");
  for (var i = 0; i < screens.length; i++) {
    screens[i].style.display = "none";
  }
  document.getElementById(screenId).style.display = "block";
}
document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("manageAccountsButton")
  .addEventListener("click", function () {
    showScreen("accountManagementScreen");
  });
document.getElementById("backToLoginFromAccountMgmt")
  .addEventListener("click", function () {
    showScreen("loginScreen");
  });
document.getElementById("deleteAccountButton")
  .addEventListener("click", function () {
    var username =
      document.getElementById("deleteUsernameInput").value;
    if (username === "") {
      alert("Enter a username.");
      return;
    }
    deleteAccount(username);
    document.getElementById("deleteUsernameInput").value = "";
    alert("Account deleted if it exists.");
  });
document.getElementById("clearAccountsButton")
  .addEventListener("click", function () {
    clearAccounts();
    alert("All accounts have been deleted.");
  });
document.getElementById("recipe").addEventListener("click", function () {
  showScreen("recommendationsScreen"); 
  recipe();
});
document.getElementById("backButton").addEventListener("click", function () {
showScreen("loginScreen");
document.getElementById("nameInput").value = "";
document.getElementById("passwordInput").value = "";
document.getElementById("passwordInput").placeholder = "Password";
});
document.getElementById("backButton2").addEventListener("click", function () {
  showScreen("testScreen"); 
  document.getElementById("experienceDropdown").value = "Select";
  document.getElementById("typeDropdown").value = "Select";
});
function login() {
  var userU = document.getElementById("nameInput").value;
  var userP = document.getElementById("passwordInput").value;
  if (userU.length === 0) {
    document.getElementById("nameInput").placeholder = "Enter a name!";
    return;
  }
  if (userP.length === 0) {
    document.getElementById("passwordInput").placeholder =
      "Enter a Password!";
    return;
  }
  if (userP.length < 8) {
    document.getElementById("passwordInput").value = "";
    document.getElementById("passwordInput").placeholder =
      "8 Characters Minimum!";
    return;
  }
  var accounts =
    JSON.parse(localStorage.getItem("accounts")) || [];
  acc = accounts.length;
  var found = false;
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].username === userU) {
      found = true;
      if (accounts[i].password === userP) {
        document.getElementById("nameInput").value = "";
        document.getElementById("passwordInput").value = "";
        showScreen("testScreen");
      } else {
        document.getElementById("nameInput").value = "Username";
        document.getElementById("passwordInput").value = "";
        document.getElementById("passwordInput").placeholder =
          "Wrong Password!";
      }
      break;
    }
  }
  if (!found) {
    accounts.push({
      username: userU,
      password: userP
    });
    localStorage.setItem(
      "accounts",
      JSON.stringify(accounts)
    );
    acc = accounts.length;
    document.getElementById("nameInput").value = "";
    document.getElementById("passwordInput").value = "";
    showScreen("testScreen");
  }
}
function clearAccounts() {
  localStorage.setItem(
    "accounts",
    JSON.stringify([])
  );
  acc = 0;
}
function deleteAccount(username) {
  var accounts =
    JSON.parse(localStorage.getItem("accounts")) || [];
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].username === username) {
      accounts.splice(i, 1);
      acc = acc - 1;
      localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
      );
      break;
    }
  }
}
function recipe() {
  experience = document.getElementById("experienceDropdown").value;
  type = document.getElementById("typeDropdown").value;
  var recommendationArea =
    document.getElementById("recommendationArea");
  var recipeImage =
    document.getElementById("recipeImage");
  var recipeName =
    document.getElementById("recipeName");
  if (experience === "Select" || type === "Select") {
    showScreen("testScreen");
    return;
  }
  if (experience === "Novice") {
    if (type === "Sweet") {
      recommendationArea.textContent = "URL:\n\nhttps://www.kingarthurbaking.com/recipes/gingerbread-recipe";
      recipeImage.src =     "https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/recipe_legacy/7-3-large.jpg?itok=CoLEXYWd";
      recipeName.textContent = "Gingerbread";
    }
    if (type === "Savory") {
      recommendationArea.textContent =
"URL:\n\nhttps://www.kingarthurbaking.com/recipes/caraway-rye-bread-recipe";
      recipeImage.src =   "https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/2025-05/Caraway-Rye-Bread.jpg?itok=rfIbNC5v";
      recipeName.textContent = "Caraway Rye Bread";
    }
    if (type === "Spicy") {
      recommendationArea.textContent =
        "URL:\n\nhttps://theprofessionalchef.com/zesty-spicy-swordfish";
      recipeImage.src = "https://ww2.kqed.org/app/uploads/sites/56/2011/09/swordfish560.jpg";
      recipeName.textContent = "Zesty Spicy Swordfish";
    }
    if (type === "Sour") {
      recommendationArea.textContent =
        "URL:\n\nhttps://www.dianekochilas.com/easy-greek-lemon-garlic-olive-oil-pasta/";
      recipeImage.src =
        "https://www.dianekochilas.com/wp-content/uploads/2026/03/Easy-Greek-Lemon-Garlic-Olive-Oil-Pasta.png";
      recipeName.textContent =
        "Greek Lemon Garlic Olive Oil Pasta";
    }
  }
  if (experience === "Intermediate") {
    if (type === "Sweet") {
      recommendationArea.textContent = "URL:\n\nhttps://www.kingarthurbaking.com/recipes/king-arthurs-carrot-cake-recipe";
      recipeImage.src = "https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/2025-04/King-Arthurs-Carrot-Cake-2.jpg?itok=cUWABAgs";
      recipeName.textContent = "Carrot Cake";
    }
    if (type === "Savory") {
      recommendationArea.textContent =
"URL:\n\nhttps://www.kingarthurbaking.com/recipes/homemade-cheese-ravioli-recipe";
      recipeImage.src =       "https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/2023-06/Ravioli_1382.jpg?itok=Esl5GrHs";
      recipeName.textContent = "Cheese Ravioli";
    }
    if (type === "Spicy") {
      recommendationArea.textContent =
        "URL:\n\nhttps://theprofessionalchef.com/spicy-cauliflower-soup";
      recipeImage.src =
        "https://savoryspin.com/wp-content/uploads/2022/01/Two-bowls-with-spicy-cauliflower-soup-vegan-gluten-free-1169x1536.jpg";
      recipeName.textContent = "Spicy Cauliflower Soup";
    }
    if (type === "Sour") {
      recommendationArea.textContent =
        "URL:\n\nhttps://www.dianekochilas.com/crispy-cauliflower-pasta-with-feta-lemon-garlicky-breadcrumbs/";
      recipeImage.src =
        "https://www.dianekochilas.com/wp-content/uploads/2026/10/cauliflower-pasta-with-feta.png";
      recipeName.textContent = "Crispy Cauliflower Pasta";
    }
  }
  if (experience === "Advanced") {
    if (type === "Sweet") {
      recommendationArea.textContent =  "URL:\n\nhttps://www.kingarthurbaking.com/recipes/chocolate-mousse-cake-with-raspberries-recipe";
      recipeImage.src =     "https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/2021-03/chocolate-mousse-cake-with-raspberries.jpg?itok=GvEfZzOx";
      recipeName.textContent = "Chocolate Mousse Cake";
    }
    if (type === "Savory") {
      recommendationArea.textContent =  "URL:\n\nhttps://www.kingarthurbaking.com/recipes/homemade-pasta-with-herb-butter-recipe";
      recipeImage.src =
"https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/2025-07/Homemade-Pasta-w-Herb-Butter_Fall-Direct-Shoot_2025_Shot-5_009.jpg?itok=U4iqBzcO";
      recipeName.textContent = "Pasta with Herb Butter";
    }
    if (type === "Spicy") {
      recommendationArea.textContent =
        "URL:\n\nhttps://theprofessionalchef.com/beer-battered-habanero-buffalo-wings";
      recipeImage.src =
        "https://www.bettycrocker.com/_next/image?url=https%3A%2F%2Fmojo.generalmills.com%2Fapi%2Fpublic%2Fcontent%2FEK_M-9346k2bC2j3F5aC_A_gmi_hi_res_jpeg.jpeg";
      recipeName.textContent =
        "Beer-battered Habanero Buffalo Wings";
    }
    if (type === "Sour") {
      recommendationArea.textContent =
        "URL:\n\nhttps://www.dianekochilas.com/octopus-with-orange-and-olives/";
      recipeImage.src =
        "https://www.dianekochilas.com/wp-content/uploads/2023/01/Octopus-2-1536x1026.jpg";
      recipeName.textContent =
        "Octopus with Orange and Olives";
    }
  }
  if (experience === "Expert") {
    if (type === "Sweet") {
      recommendationArea.textContent =
"URL:\n\nhttps://www.kingarthurbaking.com/recipes/princess-cake-prinsesstarta-recipe";
      recipeImage.src =     "https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/2023-08/Princess-Cake_0493.jpg?itok=2GjKENYL";
      recipeName.textContent =
        "Princess Cake Princesstarta";
    }
    if (type === "Savory") {
      recommendationArea.textContent =
"URL:\n\nhttps://www.kingarthurbaking.com/recipes/pain-de-campagne-country-bread-recipe";
      recipeImage.src =   "https://www.kingarthurbaking.com/sites/default/files/styles/lg_1x_1360px/public/2023-03/Pain-De-Campagne_0961.jpg?itok=bOVhcO20";
      recipeName.textContent =
        "Pain de Campagne";
    }
    if (type === "Spicy") {
      recommendationArea.textContent =
        "URL:\n\nhttps://omnivorescookbook.com/cumin-beef/";
      recipeImage.src =
        "https://omnivorescookbook.com/wp-content/uploads/2025/11/251106_Cumin-Beef_2.jpg";
      recipeName.textContent =
        "Cumin Beef";
    }
    if (type === "Sour") {
      recommendationArea.textContent =
        "URL:\n\nhttps://www.dianekochilas.com/green-risotto-with-shrimp-caramelized-tomatoes-and-yogurt-cheese/";
      recipeImage.src =
        "https://www.dianekochilas.com/wp-content/uploads/2022/11/5.-Green-risotto-with-shrimp-caramelized-tomatoes-and-yogurt-cheese_b.jpg";
      recipeName.textContent =
        "Green Risotto with Shrimp, Caramelized Tomatoes, and Yogurt Cheese";
    }
  }
}