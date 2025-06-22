import { createContext, useReducer } from "react";
const ThemeContexttt = createContext();

const initialData = {
  theme:
    localStorage.getItem("myTheme") === null
      ? "light"
      : localStorage.getItem("myTheme") === "light"
      ? "light"
      : "dark",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.newValue };
 
    default:
      return state;
  }
};

export function DataProvider({ children }) {
  const [allState, dispatch] = useReducer(reducer, initialData);

  const ToggleTheme = (newTheme) => {
    localStorage.setItem("myTheme", newTheme);
    dispatch({ type: "CHANGE_THEME", newValue: newTheme });
  };

  return (
    <ThemeContexttt.Provider value={{ ...allState, ToggleTheme }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
