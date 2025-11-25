import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import JobList from "../components/JobList";
import Pagination from "../components/Pagination";
import SearchFormSection from "../components/SearchFormSection"

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  })

  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '')

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get('page'))
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

  useEffect(() => {
    setSearchParams((params) => {
      if (textToFilter) params.set('text', textToFilter)
      if (filters.technology) params.set('technology', filters.technology)
      if (filters.location) params.set('type', filters.location)
      if (filters.experienceLevel) params.set('level', filters.experienceLevel)
      if (currentPage > 1) params.set('page', currentPage)
      
      return params
    })
  }, [filters, currentPage, textToFilter, setSearchParams])

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