import useCounter from "../../hooks/useCounter"

const CounterWithCustomHook = () => {
    const {
        count,
        increment,
        decrement,
        reset,
    } = useCounter(0)

    return (
        <>
            <p>Contador: {count}</p>
            <button onClick={increment}>Incrementar</button>
            <button onClick={decrement}>Desminuir</button>
            <button onClick={reset}>Reiniciar</button>
        </>
    )
}

export default CounterWithCustomHook