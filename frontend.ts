interface Account {
  username: string;
  password: string;
}
const STORAGE_KEY = "recipe_app_accounts";
let type: string = "";
let experience: string = "";
showScreen("loginScreen");
function getAccounts(): Account[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Account[]) : [];
}
function saveAccounts(accounts: Account[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}
function showScreen(screenId: string): void {
  const screens = document.getElementsByClassName("screen") as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < screens.length; i++) {
    screens[i].style.display = "none";
  }
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.style.display = "block";
  }
}
document.getElementById("loginButton")?.addEventListener("click", login);
document.getElementById("manageAccountsButton")?.addEventListener("click", () => {
  showScreen("accountManagementScreen");
});
document.getElementById("backToLoginFromAccountMgmt")?.addEventListener("click", () => {
  showScreen("loginScreen");
});
document.getElementById("deleteAccountButton")?.addEventListener("click", () => {
  const deleteInput = document.getElementById("deleteUsernameInput") as HTMLInputElement | null;
  if (!deleteInput) return;
  const username = deleteInput.value;
  if (username === "") {
    alert("Enter a username.");
    return;
  }
  deleteAccount(username);
  deleteInput.value = "";
  alert("Account deleted if it exists.");
});
document.getElementById("clearAccountsButton")?.addEventListener("click", () => {
  clearAccounts();
  alert("All accounts have been deleted.");
});
document.getElementById("recipe")?.addEventListener("click", () => {
  showScreen("recommendationsScreen");
  recipe();
});
document.getElementById("backButton")?.addEventListener("click", () => {
  showScreen("loginScreen");
  const nameInput = document.getElementById("nameInput") as HTMLInputElement | null;
  const passwordInput = document.getElementById("passwordInput") as HTMLInputElement | null;
  if (nameInput) nameInput.value = "";
  if (passwordInput) {
    passwordInput.value = "";
    passwordInput.placeholder = "Password";
  }
});
document.getElementById("backButton2")?.addEventListener("click", () => {
  showScreen("testScreen");
  const experienceDropdown = document.getElementById("experienceDropdown") as HTMLSelectElement | null;
  const typeDropdown = document.getElementById("typeDropdown") as HTMLSelectElement | null;
  if (experienceDropdown) experienceDropdown.value = "Select";
  if (typeDropdown) typeDropdown.value = "Select";
});
function login(): void {
  const nameInput = document.getElementById("nameInput") as HTMLInputElement | null;
  const passwordInput = document.getElementById("passwordInput") as HTMLInputElement | null;
  if (!nameInput || !passwordInput) return;
  const userU = nameInput.value;
  const userP = passwordInput.value;
  if (userU.length === 0) {
    nameInput.placeholder = "Enter a name!";
    return;
  }
  if (userP.length === 0) {
    passwordInput.placeholder = "Enter a Password!";
    return;
  }
  if (userP.length < 8) {
    passwordInput.value = "";
    passwordInput.placeholder = "8 Characters Minimum!";
    return;
  }
  const accounts = getAccounts();
  const existing = accounts.find((acc) => acc.username === userU);
  if (existing) {
    if (existing.password === userP) {
      nameInput.value = "";
      passwordInput.value = "";
      showScreen("testScreen");
    } else {
      passwordInput.value = "";
      passwordInput.placeholder = "Wrong Password!";
    }
    return;
  }
  accounts.push({ username: userU, password: userP });
  saveAccounts(accounts);
  nameInput.value = "";
  passwordInput.value = "";
  showScreen("testScreen");
}
function clearAccounts(): void {
  localStorage.removeItem(STORAGE_KEY);
}
function deleteAccount(username: string): void {
  const updated = getAccounts().filter((acc) => acc.username !== username);
  saveAccounts(updated);
}
function setRecipeDisplay(url: string, imgSrc: string, title: string, area: HTMLElement, img: HTMLImageElement, nameEl: HTMLElement): void {
  area.innerHTML = `URL:<br><br><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  img.src = imgSrc;
  nameEl.textContent = title;
}
function recipe(): void {
  const experienceDropdown = document.getElementById("experienceDropdown") as HTMLSelectElement | null;
  const typeDropdown = document.getElementById("typeDropdown") as HTMLSelectElement | null;
  const recommendationArea = document.getElementById("recommendationArea");
  const recipeImage = document.getElementById("recipeImage") as HTMLImageElement | null;
  const recipeName = document.getElementById("recipeName");
  if (!experienceDropdown || !typeDropdown || !recommendationArea || !recipeImage || !recipeName) {
    return;
  }
  experience = experienceDropdown.value;
  type = typeDropdown.value;
  if (experience === "Select" || type === "Select") {
    showScreen("testScreen");
    return;
  }
  if (experience === "Novice") {
    if (type === "Sweet") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Gingerbread", recommendationArea, recipeImage, recipeName);
    if (type === "Savory") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Caraway Rye Bread", recommendationArea, recipeImage, recipeName);
    if (type === "Spicy") setRecipeDisplay("https://theprofessionalchef.com", "https://kqed.org", "Zesty Spicy Swordfish", recommendationArea, recipeImage, recipeName);
    if (type === "Sour") setRecipeDisplay("https://dianekochilas.com", "https://dianekochilas.com", "Greek Lemon Garlic Olive Oil Pasta", recommendationArea, recipeImage, recipeName);
  }
  if (experience === "Intermediate") {
    if (type === "Sweet") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Carrot Cake", recommendationArea, recipeImage, recipeName);
    if (type === "Savory") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Cheese Ravioli", recommendationArea, recipeImage, recipeName);
    if (type === "Spicy") setRecipeDisplay("https://theprofessionalchef.com", "https://savoryspin.com", "Spicy Cauliflower Soup", recommendationArea, recipeImage, recipeName);
    if (type === "Sour") setRecipeDisplay("https://dianekochilas.com", "https://dianekochilas.com", "Crispy Cauliflower Pasta", recommendationArea, recipeImage, recipeName);
  }
  if (experience === "Advanced") {
    if (type === "Sweet") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Chocolate Mousse Cake", recommendationArea, recipeImage, recipeName);
    if (type === "Savory") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Pasta with Herb Butter", recommendationArea, recipeImage, recipeName);
    if (type === "Spicy") setRecipeDisplay("https://theprofessionalchef.com", "https://bettycrocker.com", "Beer-battered Habanero Buffalo Wings", recommendationArea, recipeImage, recipeName);
    if (type === "Sour") setRecipeDisplay("https://dianekochilas.com", "https://dianekochilas.com", "Octopus with Orange and Olives", recommendationArea, recipeImage, recipeName);
  }
  if (experience === "Expert") {
    if (type === "Sweet") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Princess Cake Princesstarta", recommendationArea, recipeImage, recipeName);
    if (type === "Savory") setRecipeDisplay("https://kingarthurbaking.com", "https://kingarthurbaking.com", "Pain de Campagne", recommendationArea, recipeImage, recipeName);
    if (type === "Spicy") setRecipeDisplay("https://omnivorescookbook.com", "https://omnivorescookbook.com", "Cumin Beef", recommendationArea, recipeImage, recipeName);
    if (type === "Sour") setRecipeDisplay("https://dianekochilas.com", "https://dianekochilas.com", "Green Risotto with Shrimp, Caramelized Tomatoes, and Yogurt Cheese", recommendationArea, recipeImage, recipeName);
  }
}
