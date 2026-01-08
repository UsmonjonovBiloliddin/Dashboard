import { useState } from "react";
import { MoreDotIcon } from "../../icons";
import CountryMap from "./CountryMap";

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  const countries = [
    {
      id: 1,
      name: "USA",
      flag: "./images/country/country-01.svg",
      customers: 2379,
      percentage: 79,
      color: "bg-blue-500",
      trend: "up"
    },
    {
      id: 2,
      name: "France",
      flag: "./images/country/country-02.svg",
      customers: 589,
      percentage: 23,
      color: "bg-blue-400",
      trend: "up"
    },
    {
      id: 3,
      name: "Germany",
      flag: "./images/country/country-03.svg",
      customers: 421,
      percentage: 17,
      color: "bg-blue-300",
      trend: "up"
    },
    {
      id: 4,
      name: "UK",
      flag: "./images/country/country-04.svg",
      customers: 387,
      percentage: 15,
      color: "bg-blue-200",
      trend: "down"
    }
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Customers Demographic
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Number of customers based on country
          </p>
        </div>
        <div className="relative">
          <button 
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleDropdown}
          >
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
                View Details
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Export Data
              </button>
              <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
              <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg">
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="mb-8">
        <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-gray-800/30 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              Global Distribution
            </h4>
            <span className="text-xs px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              Live
            </span>
          </div>
          
          <div className="h-[220px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
            <CountryMap />
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">High Density</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-300"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-100"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Country List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            Top Countries
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            4 countries
          </span>
        </div>
        
        {countries.map((country) => (
          <div key={country.id} className="group p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                    <img 
                      src={country.flag} 
                      alt={country.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    {country.trend === "up" ? (
                      <svg className="w-2 h-2 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M4 0L7 3H1L4 0Z" />
                      </svg>
                    ) : (
                      <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M4 8L1 5H7L4 8Z" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {country.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {country.customers.toLocaleString()} customers
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Progress Bar */}
                <div className="w-32 hidden sm:block">
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${country.color} transition-all duration-500`}
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-gray-800 dark:text-white text-lg">
                    {country.percentage}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    market share
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="mt-3 sm:hidden">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{country.percentage}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${country.color} transition-all duration-500`}
                  style={{ width: `${country.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              3,776
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Customers
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              +12.5%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Growth Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}