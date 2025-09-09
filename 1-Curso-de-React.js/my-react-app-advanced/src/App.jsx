import { useContext, createContext, useState } from "react"
import CounterWithCustomHook from "./components/CounterWithCustomHook/CounterWithCustomHook"
import CounterWithReactMemo from "./components/CounterWithReactMemo/CounterWithReactMemo"
import "./App.css"

// Creamos el contexto
const ThemeContext = createContext()

// Provider que maneja el estado del tema
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Botón que consume el contexto
function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === "light" ? "#FFF" : "#333",
        color: theme === "light" ? "#000" : "#FFF",
      }}
    >
      Cambiar tema
    </button>
  )
}

// App principal
function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
      <CounterWithCustomHook/>
      <CounterWithReactMemo/>
    </>

  )
}

export default App
