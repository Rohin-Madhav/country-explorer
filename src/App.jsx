import React, { useEffect, useState } from 'react'
import axios from "axios"



function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population")
        setCountries(res.data)
        console.log(res.data);

      } catch (error) {
        console.error("error fetching data");
      }
    }
    fetchCountry()
  }
    , [])

  return (
    <div>
      <h1>Explore All Countries🌍</h1>
      <div>
        <div>
          <div>
            {/* seachbar */}
          </div>
          <div>
            {/* Fiter component */}
          </div>
        </div>
<div className="container mx-auto p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {countries.map((c) => (
      <div 
        key={c.name.common} 
        className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
      >
        {/* Image Container with fixed height */}
        <div className="h-40 w-full overflow-hidden relative">
          <img 
            src={c.flags.png} 
            alt={`Flag of ${c.name.common}`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>

        {/* Content Body */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-3 truncate">
            {c.name.common}
          </h2>
          
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center">
              <span className="font-semibold w-24">Capital:</span> 
              <span>{c.capital}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">Region:</span> 
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{c.region}</span>
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
      </div>
    </div>
  )
}

export default App
