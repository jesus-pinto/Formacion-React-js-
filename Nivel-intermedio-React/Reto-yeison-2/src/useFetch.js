import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetch(url)
            .then((res) => {
                if (!res.ok) { throw new Error(`Error: ${res.status} ${res.status.Error}`); }
                return res.json();
            })
            .then((data) => setData(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}
