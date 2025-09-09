import { useState } from "react"

const NameForm = () => {
    const [name, setName] = useState('')

    return(
        <div>
            <input 
                type="text" 
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <p>Hola, {name || 'Visitante'}</p>
        </div>
    )
}

export default NameForm