import { JSX, useEffect, useState } from "react";
import { useRef } from "react";
type Props = {
    image: string;
}

export const RandomFox = ({ image }: Props): JSX.Element => {
    const imgRef = useRef<HTMLImageElement>(null)
    const [src, setSrc] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=');

    useEffect(() => {
        // nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // onIntersection -> console.log
                if (entry.isIntersecting) {
                    setSrc(image)
                }
            })
        })

        // observe nodo
        if (imgRef.current) {
            observer.observe(imgRef.current)
        }
        
        // desconectar observador
        return () =>{
            observer.disconnect()
        }

    }, [image])

    return <img ref={imgRef} width={350} src={src} alt="img" className="rounded bg-gray-400" />;

}