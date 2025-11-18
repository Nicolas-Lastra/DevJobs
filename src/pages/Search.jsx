import { useState, useEffect } from "react";
import JobList from "../components/JobList";
import Pagination from "../components/Pagination";
import SearchFormSection from "../components/SearchFormSection";
import jobsData from '../data.json'

const useFilters = () => {

  const [filters, setFilters] = useState({
    search: '',
    technology: '',
    location: '',
    experienceLevel: ''
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const RESULTS_PER_PAGE = 5

  const jobsFilteredByFilters = jobsData.filter(job => {
    return (
      (filters.technology === '' || job.data.technology === filters.technology) && 
      (filters.location === '' || job.data.modalidad === filters.location) && 
      (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
    )
  })

  const jobsWithTextFilter = textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    })

  const totalPages = Math.max(1, Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE))

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

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
    jobsWithTextFilter,
    pagedResults,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

function SearchPage() {
  const {
    jobsWithTextFilter,
    pagedResults,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters()

  useEffect(() => {
    document.title = `Resultados: ${jobsWithTextFilter.length}, Página ${currentPage} - DevJobs`
  }, [jobsWithTextFilter, currentPage])

  return (
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

        <section>
          <JobList jobs={pagedResults} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>
  );
}

export default SearchPage;