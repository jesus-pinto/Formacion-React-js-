import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import "./scss/App.scss";

export function DataList() {
    const { data, error, loading } = useFetch("https://jsonplaceholder.typicode.com/users");

    const [inputValue, setInputValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState(""); 

    // setDebouncedValue se actualiza en 500s después de que el usuario deja de escribir
    useEffect(() => {
        const time = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 1000); 

        return () => clearTimeout(time); 
    }, [inputValue]);

    //  Filtramos sobre "data" usando debouncedValue
    const buscarUsuarios = data?.filter((user) =>
        user.name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        user.username.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    // ✅ Función para resaltar coincidencias
    const resaltador = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.split(regex).map((part, i) =>
            regex.test(part) ? (
                <mark key={i} style={{ backgroundColor: "#a0aec0" }}>{part}</mark>
            ) : (
                part
            )
        );
    };

    return (
        <div className="filter-search-container">
            <h2>Buscar usuarios...</h2>

            <div className="search-input-container">
                <input
                    className="input-filter-search"
                    type="text"
                    placeholder="Buscar..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                {!loading && data && (
                    <p className="infoList__filtrados">
                        <strong>{buscarUsuarios?.length}</strong> de{" "}
                        <strong>{data.length}</strong>
                    </p>
                )}
            </div>

            {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
            {loading && <p>Cargando...</p>}

            <ul className="infoList__ul">
                {buscarUsuarios?.map((user) => (
                    <li className="infoList__li" key={user.id}>
                        <strong>{resaltador(user.name, debouncedValue)}</strong>{" "}
                        ({resaltador(user.username, debouncedValue)}): "
                        {resaltador(user.email, debouncedValue)}"
                    </li>
                ))}
            </ul>

            {!loading && buscarUsuarios?.length === 0 && (
                <p>No se encontraron usuarios...</p>
            )}
        </div>
    );
}
