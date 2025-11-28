import { useState } from "react"
import Link from "./Link"
import styles from "./JobCard.module.css"
import { useFavoritesStore } from "../store/favoritesStore"
import { useAuthStore } from "../store/authStore"

function JobCardFavoriteButton({ jobId }) {
    const { isLoggedIn } = useAuthStore()
    const { toggleFavorite, isFavorite } = useFavoritesStore()

    return (
        <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
            {isFavorite(jobId) ? '❤️' : '🤍'}
        </button>
    )
}

function JobCardApplyButton({ jobId }) {
    const [isApplied, setIsApplied] = useState(false)
    const { isLoggedIn } = useAuthStore()

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

    const handleApplyClick = () => {
        setIsApplied(true)
    }

    return (
        <button onClick={ handleApplyClick } disabled={!isLoggedIn} className={buttonClasses}>{buttonText}</button>
    )
}

export default function JobCard({ job }) {

    return (
        <article
            data-technology={job.data.technology}
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            className="job-listing-card"            
        >
            <div>
                <Link className={styles.title} href={`/jobs/${job.id}`}>{job.titulo}</Link>
                <small> {job.empresa} | {job.ubicacion}</small>
                <p>
                    {job.descripcion}
                </p>
            </div>
            <div className={styles.actions}>
                <Link href={`/jobs/${job.id}`} className={styles.details}>
                    Ver detalles
                </Link>
                <JobCardApplyButton jobId={job.id}/>
                <JobCardFavoriteButton jobId={job.id}/>
            </div>
        </article>
    )
}
