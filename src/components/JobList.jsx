// import { useState, useEffect } from "react";
import JobCard from "./JobCard";

export default function JobList({ jobs }) {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch("/data.json")
    //         .then((response) => response.json())
    //         .then((jsonData) => setData(jsonData))
    //         .catch((error) => console.error("Error de fetch de data: ", error));
    // });

    return (
            <>
                <h2 id="search-results-title">Resultados de búsqueda</h2>

                <div className="jobs-listings">
                    {jobs.map((job) => (
                        <JobCard key={job.id} data={job}/>
                    ))}
                </div>

            </>
    );
}
