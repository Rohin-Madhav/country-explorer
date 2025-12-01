import React, { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const countriesPerPage = 12

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population")
        setCountries(res.data)
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCountry()
  }, [])
  const filteredCountries = countries.filter((c) => {
    const matchesSearch = c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = region ? c.region === region : true
    return matchesSearch && matchesFilter
  }
  );

  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, region]);



  return (
    <div>
      <h1 className='font-black text-lg
   p-6'>Explore All Countries 🌍</h1>

      <div className='flex p-5 place-content-between'>
        {/* Search Bar */}

        <div>
          <div style={{ margin: "20px 0" }}>
            <input
              type="text"
              placeholder="Type a country name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                maxWidth: "400px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
          </div>
          {/* No results */}
          {filteredCountries.length === 0 && (
            <p style={{ color: '#888' }}>No results found.</p>
          )}
        </div>

        {/* Search filter*/}
        <div>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>


      {/* Countries grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCountries.map((c) => (
            <div
              key={c.name.common}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src={c.flags.png}
                  alt={`Flag of ${c.name.common}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-3 truncate">
                  {c.name.common}
                </h2>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center">
                    <span className="font-semibold w-24">Capital:</span>
                    <span>{c.capital?.[0] || "N/A"}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold w-24">Region:</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {c.region}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold w-24">Population:</span>
                    <span>{c.population.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="flex justify-center cursor-pointer items-center gap-3 p-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer  disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 cursor-pointer  rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) =>
            prev < totalPages ? prev + 1 : prev
          )}
          disabled={currentPage === totalPages}
          className="px-4 py-2 cursor-pointer  bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
