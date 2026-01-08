import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MonthlySalesChart() {
  const options: ApexOptions = {
    colors: ["#3b82f6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180, // ✅ Asl height'ni saqladik
      toolbar: { 
        show: false 
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      background: "transparent",
      foreColor: "#6b7280",
      // Tooltip hover muammosini tuzatish
      events: {
       
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%", // ✅ Optimal kenglik
        borderRadius: 4, // ✅ Kichikroq radius
        borderRadiusApplication: "end",
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 0, // ✅ Bar'lar orasidagi bo'shliqni yo'q qilish
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      axisBorder: { 
        show: false 
      },
      axisTicks: { 
        show: false 
      },
      labels: { 
        style: { 
          colors: "#9ca3af", 
          fontSize: "11px",
          fontWeight: 400
        },
        offsetY: 2
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        style: { 
          colors: "#9ca3af",
          fontSize: "11px"
        },
        offsetX: -10,
        formatter: (value) => {
          if (value >= 1000) return `$${value/1000}k`;
          return `$${value}`;
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      min: 0,
      max: 400,
      tickAmount: 4
    },
    grid: {
      borderColor: "rgba(156, 163, 175, 0.1)",
      strokeDashArray: 3,
      padding: {
        top: -10,
        right: 0,
        bottom: 0,
        left: 0
      },
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.3,
        gradientToColors: ["#60a5fa"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.7,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: "Outfit, sans-serif"
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        // ✅ Custom tooltip yaratish
        const value = series[seriesIndex][dataPointIndex];
        const month = w.globals.labels[dataPointIndex];
        
        return `
          <div class="apexcharts-tooltip-custom">
            <div style="padding: 8px 12px; background: #1f2937; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>
                <strong style="font-size: 12px; color: #f9fafb;">${month}</strong>
              </div>
              <div style="font-size: 14px; font-weight: 600; color: #60a5fa;">$${value.toLocaleString()}</div>
            </div>
          </div>
        `;
      },
      y: {
        formatter: undefined, // ✅ Custom tooltip uchun o'chirish
      },
      marker: {
        show: false
      },
      fixed: {
        enabled: false
      },
      onDatasetHover: {
        highlightDataSeries: true
      },
      x: {
        show: true,
        format: 'MMM',
        formatter: undefined,
      },
      // ✅ Tooltip position'ini tuzatish
      followCursor: true,
      intersect: false,
      shared: true
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "darken",
        }
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 180
          },
          plotOptions: {
            bar: {
              columnWidth: "50%"
            }
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 170
          },
          plotOptions: {
            bar: {
              columnWidth: "55%"
            }
          }
        }
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 160
          },
          plotOptions: {
            bar: {
              columnWidth: "60%"
            }
          },
         
        }
      }
    ]
  };

  const series = [
    { 
      name: "Sales", 
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112]
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Global CSS for tooltip
  useEffect(() => {
    // Tooltip uchun custom CSS qo'shish
    const style = document.createElement('style');
    style.innerHTML = `
      .apexcharts-tooltip-custom {
        z-index: 9999 !important;
      }
      .apexcharts-tooltip {
        border: 1px solid rgba(255,255,255,0.1) !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
        border-radius: 6px !important;
        background: #1f2937 !important;
      }
      .apexcharts-tooltip-title {
        background: transparent !important;
        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
        color: #f9fafb !important;
        font-size: 12px !important;
        padding: 6px 12px !important;
      }
      .apexcharts-tooltip-series-group {
        padding: 8px 12px !important;
        background: transparent !important;
      }
      .apexcharts-tooltip-marker {
        width: 8px !important;
        height: 8px !important;
      }
      .apexcharts-tooltip-text {
        color: #f9fafb !important;
        font-family: 'Outfit', sans-serif !important;
      }
      .apexcharts-tooltip-text-value {
        color: #60a5fa !important;
        font-weight: 600 !important;
        font-size: 14px !important;
      }
      .apexcharts-tooltip-text-y-label {
        color: #9ca3af !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Statistik ma'lumotlar
  const totalSales = series[0].data.reduce((sum, val) => sum + val, 0);
  const maxSales = Math.max(...series[0].data);
  const maxMonthIndex = series[0].data.indexOf(maxSales);
  const maxMonth = options.xaxis?.categories?.[maxMonthIndex] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.1
      }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Chart header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Monthly Sales
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly revenue overview
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Stats summary */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                ${maxSales.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Peak in {maxMonth}
              </div>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                ${totalSales.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Annual total
              </div>
            </div>
          </div>
          
          {/* Dropdown button */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                isOpen 
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
              aria-label="More options"
            >
              <MoreDotIcon className="size-5" />
            </button>
            
            <Dropdown 
              isOpen={isOpen} 
              onClose={() => setIsOpen(false)}
              className="w-48 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <DropdownItem 
                onItemClick={() => {
                  setIsOpen(false);
                  console.log("Export data clicked");
                }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export as PDF
              </DropdownItem>
              <DropdownItem 
                onItemClick={() => {
                  setIsOpen(false);
                  console.log("Export CSV clicked");
                }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export as CSV
              </DropdownItem>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
              <DropdownItem 
                onItemClick={() => {
                  setIsOpen(false);
                  console.log("Settings clicked");
                }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Chart Settings
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="relative">
        {/* Chart background */}
        <div className="absolute inset-0 -z-10 opacity-[0.02]">
          <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
        </div>
        
        {/* Chart wrapper - asl height bilan */}
        <div className="relative">
          <div className="min-w-[300px] overflow-x-auto">
            <div className="w-full min-w-[500px] sm:min-w-0 px-1">
              <Chart 
                options={options} 
                series={series} 
                type="bar" 
                height={180} // ✅ Asl height'ni saqladik
                width="100%"
              />
            </div>
          </div>
        </div>

        {/* Legend */}
        {/* <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-gradient-to-r from-blue-500 to-blue-400"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Monthly Sales Revenue
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Avg: <span className="font-semibold text-gray-700 dark:text-gray-300">${averageSales.toLocaleString()}</span>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
}