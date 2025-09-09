import Button from './components/Button'
import Counter from './components/Counter'
import './App.css'

function saludo(name: string): string {
  return `Hola ${name}`
}

function App() {
  const handleClick = () => alert("Ya estoy clickeado !")
  console.log(saludo("Teff"))

  return (
    <>
      <Button onclick={handleClick} label="Click me" />
      <Counter />
    </>
  )

}

export default App
