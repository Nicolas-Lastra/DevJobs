export default function JobCard({ data }) {

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
            <button className="button-apply-job">Aplicar</button>
        </article>
    );
}
