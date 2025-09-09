import { useState } from "react"

const Contador = () => {
    const [count, setCount] = useState(0)

    return(
        <div>
            <p>El contador esta en: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
            <button onClick={() => setCount(count - 1)}>Desminuir</button>
        </div>
    )
}

export default Contador