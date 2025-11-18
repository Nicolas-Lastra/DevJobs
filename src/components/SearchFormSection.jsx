import { useId, useState } from "react";

const useSearchForm = ({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter }) => {
  const [searchText, setSearchText] = useState('') 
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const filters = {
      search: formData.get(idText) ?? "",
      technology: formData.get(idTechnology) ?? "",
      location: formData.get(idLocation) ?? "",
      experienceLevel: formData.get(idExperienceLevel) ?? "",
    }

    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text)
    onTextFilter(text)
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
}

export default function SearchFormSection({ onSearch, onTextFilter }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()
  const {
    handleSubmit,
    handleTextChange
  } = useSearchForm({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter })

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onChange={handleSubmit} role="search" id="empleos-search-form">
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            name={idText}
            id="empleos-search-input"
            // required
            type="text"
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleTextChange}
          />
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology" defaultValue="">
            <option value="" disabled>
              Tecnología
            </option>
            <option value="">Cualquiera</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
          </select>

          <select name={idLocation} id="filter-location" defaultValue="">
            <option value="" disabled>
              Ubicación
            </option>
            <option value="">Cualquiera</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select
            name={idExperienceLevel}
            id="filter-experience-level"
            defaultValue=""
          >
            <option value="" disabled>
              Nivel de experiencia
            </option>
            <option value="">Cualquiera</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

      <span id="filter-selected-value"></span>
    </section>
  );
}
