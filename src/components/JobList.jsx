import JobCard from "./JobCard";

export default function JobList({ jobs }) {

    return (
            <>
                <h2 id="search-results-title">Resultados de búsqueda</h2>

                <div className="jobs-listings">
                    {
                        jobs.length === 0 && (
                            <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>No se han encontrado empleos que coincidan con los criterios de búsqueda.</p>
                        )
                    }
                    {jobs.map((job) => (
                        <JobCard key={job.id} data={job}/>
                    ))}
                </div>

            </>
    );
}
