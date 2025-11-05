import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";
import SearchFormSection from "./components/SearchFormSection";
import jobsData from './data.json'

function App() {

  const [filters, setFilters] = useState({
    search: '',
    technology: '',
    location: '',
    experienceLevel: ''
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const RESULTS_PER_PAGE = 5
  const [totalPages, setTotalPages] = useState(Math.ceil(jobsData.length / RESULTS_PER_PAGE))

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
    handleTotalPages(jobsWithTextFilter)
    setCurrentPage(1)
  }

  const handleTextFilter = (text) => {
    setTextToFilter(text)
    handleTotalPages(jobsWithTextFilter)
    setCurrentPage(1)
  }

  const handleTotalPages = (filteredResults) => {
    setTotalPages(Math.ceil(filteredResults.length / RESULTS_PER_PAGE))
  }

  return (
    <>
      <Header />

      <main>

        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

        <section>
          <JobList jobs={pagedResults} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;