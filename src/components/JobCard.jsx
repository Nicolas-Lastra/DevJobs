import { useState } from "react";

export default function JobCard({ data }) {

    const [isApplied, setIsApplied] = useState(false)

    // const text = isApplied ? 'Aplicado' : 'Aplicar'
    // const buttonClass = isApplied ? 'is-applied' : ''

    // function handleClick() {

    //     // setIsApplied(true)

    //     // Efecto interruptor
    //     setIsApplied(!isApplied)
    // }

    const handleApplyClick = () => {
        setIsApplied(true)
    }
    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

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
            <button onClick={ handleApplyClick } disabled={isApplied} className={buttonClasses}>{buttonText}</button>
        </article>
    );
}
