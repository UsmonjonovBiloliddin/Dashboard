import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import ChartTab from "../common/ChartTab";
import { CalenderIcon } from "../../icons";

export default function StatisticsChart() {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const [animatedSeries, setAnimatedSeries] = useState([
    { name: "Sales", data: new Array(12).fill(0) },
    { name: "Revenue", data: new Array(12).fill(0) }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const targetSeries = [
    {
      name: "Sales",
      data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
    },
    {
      name: "Revenue",
      data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
    },
  ];

  useEffect(() => {
    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          // Animate chart data
          const steps = 30; // Number of animation steps
          const stepDelay = 30; // ms between steps
          
          for (let step = 1; step <= steps; step++) {
            setTimeout(() => {
              const progress = step / steps;
              
              const newSalesData = targetSeries[0].data.map((value) => 
                Math.floor(value * progress)
              );
              
              const newRevenueData = targetSeries[1].data.map((value) => 
                Math.floor(value * progress)
              );
              
              setAnimatedSeries([
                { name: "Sales", data: newSalesData },
                { name: "Revenue", data: newRevenueData }
              ]);
            }, step * stepDelay);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Flatpickr date picker
    if (datePickerRef.current) {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);

      const fp = flatpickr(datePickerRef.current, {
        mode: "range",
        static: true,
        monthSelectorType: "static",
        dateFormat: "M d",
        defaultDate: [sevenDaysAgo, today],
        clickOpens: true,
        prevArrow:
          '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        nextArrow:
          '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        onOpen: () => {
          document.querySelector('.flatpickr-calendar')?.classList.add('dark:bg-gray-800', 'dark:border-gray-700');
        }
      });

      return () => {
        if (fp && !Array.isArray(fp)) {
          fp.destroy();
        }
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, []);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      x: {
        format: "MMM",
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      }
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
          fontFamily: 'Inter, sans-serif'
        },
        formatter: function (value) {
          return "$" + value + "K";
        }
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div 
      ref={containerRef}
      className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Statistics
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monthly sales and revenue overview
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Chart Type Tabs */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <ChartTab />
          </div>
          
          {/* Date Picker */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <CalenderIcon className="size-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
            </div>
            <input
              ref={datePickerRef}
              className="pl-10 pr-4 py-2.5 w-40 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              placeholder="Select date range"
              readOnly
            />
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-end gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#465FFF]"></div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#9CB9FF]"></div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Revenue</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className="max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="min-w-[1000px] xl:min-w-full">
            <Chart 
              options={options} 
              series={animatedSeries} 
              type="area" 
              height={310} 
            />
          </div>
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Sales</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${animatedSeries[0].data.reduce((a, b) => a + b, 0).toLocaleString()}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Monthly</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${Math.floor(animatedSeries[0].data.reduce((a, b) => a + b, 0) / 12).toLocaleString()}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Peak Month</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
              animatedSeries[0].data.indexOf(Math.max(...animatedSeries[0].data))
            ]}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Growth</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            +{Math.round(((animatedSeries[0].data[animatedSeries[0].data.length - 1] - animatedSeries[0].data[0]) / animatedSeries[0].data[0]) * 100)}%
          </p>
        </div>
      </div>

      {/* Custom styles for scrollbar and flatpickr */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 3px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #4b5563;
        }
        
        /* Flatpickr dark mode */
        :global(.dark .flatpickr-calendar) {
          background: #1f2937 !important;
          border-color: #374151 !important;
          color: #d1d5db !important;
        }
        :global(.dark .flatpickr-day) {
          color: #d1d5db !important;
        }
        :global(.dark .flatpickr-day:hover) {
          background: #374151 !important;
        }
        :global(.dark .flatpickr-day.selected) {
          background: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        :global(.dark .flatpickr-month) {
          color: #f9fafb !important;
        }
      `}</style>
    </div>
  );
}