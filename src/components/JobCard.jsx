import { useState } from "react";

export default function JobCard({ data }) {

    const [isApplied, setIsApplied] = useState(false)

    const text = isApplied ? 'Aplicado' : 'Aplicar'
    const buttonClass = isApplied ? 'is-applied' : ''

    function handleClick() {

        // setIsApplied(true)

        // Efecto interruptor
        setIsApplied(!isApplied)
    }

    return (
        <article
            data-technology={data.data.technology}
            data-modalidad={data.data.modalidad}
            className="job-listing-card"            
        >
            <div>
                <h3>{data.titulo}</h3>
                <small>{data.empresa} | {data.ubicacion}</small>
                <p>
                    {data.descripcion}
                </p>
            </div>
            <button onClick={ handleClick } disabled={isApplied} className={`button-apply-job ${buttonClass}`}>{text}</button>
        </article>
    );
}
