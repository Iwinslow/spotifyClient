//SERVICIOS PARA MANIPULAR EL THEMA DEL SITIO (DARK/LIGHT):
////Cambia el tema actual (toggle)
export const toggleTheTheme = (current) => {
  let newTheme = !current;
  localStorage.setItem("theme", newTheme);
  return newTheme;
};

////Toma el thema del localStorage y lo define en redux mediante payload (ver actions store/theme.js)
export const getThemeFromLocalStorage = () => {
  let storedTheme = localStorage.getItem("theme");
  return storedTheme;
};
