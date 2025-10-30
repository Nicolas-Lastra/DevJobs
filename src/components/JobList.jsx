import { useState, useEffect } from "react";
import JobCard from "./JobCard";

export default function JobList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((jsonData) => setData(jsonData))
            .catch((error) => console.error("Error de fetch de data: ", error));
    });

    return (
            <>
                <h2 id="search-results-title">Resultados de búsqueda</h2>

                <div className="jobs-listings">
                    {data.map((item) => (
                        <JobCard key={item.id} data={item}/>
                    ))}
                </div>

            </>
    );
}
