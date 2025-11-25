import { useState } from "react"
import Link from "./Link"
import styles from "./JobCard.module.css"

export default function JobCard({ data }) {

    const [isApplied, setIsApplied] = useState(false)

    const handleApplyClick = () => {
        setIsApplied(true)
    }
    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

    return (
        <article
            data-technology={data.data.technology}
            data-modalidad={data.data.modalidad}
            data-nivel={data.data.nivel}
            className="job-listing-card"            
        >
            <div>
                <Link className={styles.title} href={`/jobs/${data.id}`}>{data.titulo}</Link>
                <small>{data.empresa} | {data.ubicacion}</small>
                <p>
                    {data.descripcion}
                </p>
            </div>
            <div className={styles.actions}>
                <Link href={`/jobs/${data.id}`} className={styles.details}>
                    Ver detalles
                </Link>
                <button onClick={ handleApplyClick } disabled={isApplied} className={buttonClasses}>{buttonText}</button>
            </div>
        </article>
    )
}
