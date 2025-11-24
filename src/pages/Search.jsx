import { useState, useEffect } from "react";
import JobList from "../components/JobList";
import Pagination from "../components/Pagination";
import SearchFormSection from "../components/SearchFormSection";
import useRouter from "../hooks/useRouter";

const useFilters = () => {

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return {
      search: params.get('text') || '',
      technology: params.get('technology') || '',
      location: params.get('type') || '',
      experienceLevel: params.get('level') || ''
    }
  })
  const [textToFilter, setTextToFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('text') || ''
  })
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page'))
    return Number.isNaN(page) ? page : 1
  })
  const RESULTS_PER_PAGE = 5

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)
        
        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()
        
        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, textToFilter, currentPage])

  const { navigateTo } = useRouter()

  useEffect(() => {
    const params = new URLSearchParams()

    if (textToFilter) params.append('text', textToFilter)
    if (filters.technology) params.append('technology', filters.technology)
    if (filters.location) params.append('type', filters.location)
    if (filters.experienceLevel) params.append('level', filters.experienceLevel)
    if (currentPage > 1) params.append('page', currentPage)
    
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname
    
    navigateTo(newUrl)
  }, [filters, currentPage, textToFilter, navigateTo])

  const totalPages = Math.max(Math.ceil(total / RESULTS_PER_PAGE))

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setFilters({
      technology: filters.technology,
      location: filters.location,
      experienceLevel: filters.experienceLevel
    })
    setTextToFilter(filters.search || '')
    setCurrentPage(1)
  }

  const handleTextFilter = (text) => {
    setTextToFilter(text)
    setCurrentPage(1)
  }

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

function SearchPage() {
  const {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters()

  const title = loading ? `Cargando ... - DevJobs` : `Resultados: ${total}, Página ${currentPage} - DevJobs`

  return (
      <main>
        <title>{title}</title>
        <meta name="description" content="Encuentra las mejores ofertas de trabajo para desarrolladores en DevJobs." />
        <SearchFormSection
          initialText={textToFilter}
          onSearch={handleSearch}
          onTextFilter={handleTextFilter}
        />
        <h2 id="search-results-title" style={{ textAlign: "center", padding: "1rem"}}>Resultados de búsqueda</h2>

        <section>
          {
            loading ? <p>Cargando empleos ...</p> : <JobList jobs={jobs} />
          }
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>
  );
}

export default SearchPage;