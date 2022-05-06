export const toggleTheTheme = (current) => {
  let newTheme = !current;

  console.log("current en services", current);
  console.log("new en services", newTheme);
  localStorage.setItem("theme", newTheme);
  return newTheme;
};

export const getThemeFromLocalStorage = () => {
  let storedTheme = localStorage.getItem("theme");
  console.log(storedTheme);
  return storedTheme;
};
