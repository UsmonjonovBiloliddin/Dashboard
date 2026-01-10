import { useEffect, useRef, useState, useCallback } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function StatisticsChart() {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const [animatedSeries, setAnimatedSeries] = useState([
    { name: "Sales", data: new Array(12).fill(0) },
    { name: "Revenue", data: new Array(12).fill(0) }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"area" | "line" | "bar">("area");
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [selectedRange, setSelectedRange] = useState<string>("Last 7 days");
  const [isVisible, setIsVisible] = useState(false);

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

  // Icon komponentlari
  const CalenderIcon = ({ className = "size-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const DownloadIcon = ({ className = "size-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const FilterIcon = ({ className = "size-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );

  const RefreshIcon = ({ className = "size-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  // Chart animatsiyasi
  const animateChart = useCallback(() => {
    if (hasAnimated.current) return;
    
    hasAnimated.current = true;
    setIsLoading(true);
    
    const steps = 40;
    const stepDelay = 20;
    
    const animateStep = (step: number) => {
      if (step > steps) {
        setIsLoading(false);
        return;
      }
      
      setTimeout(() => {
        const progress = Math.sin((step / steps) * (Math.PI / 2));
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const newSalesData = targetSeries[0].data.map((value) => 
          Math.floor(value * easeOutCubic)
        );
        
        const newRevenueData = targetSeries[1].data.map((value) => 
          Math.floor(value * easeOutCubic)
        );
        
        setAnimatedSeries([
          { name: "Sales", data: newSalesData },
          { name: "Revenue", data: newRevenueData }
        ]);
        
        animateStep(step + 1);
      }, stepDelay);
    };
    
    animateStep(1);
  }, []);

  // Ma'lumotlarni yangilash
  const refreshData = () => {
    hasAnimated.current = false;
    setIsLoading(true);
    setAnimatedSeries([
      { name: "Sales", data: new Array(12).fill(0) },
      { name: "Revenue", data: new Array(12).fill(0) }
    ]);
    
    setTimeout(() => {
      animateChart();
    }, 300);
  };

  // Ma'lumotlarni yuklab olish
  const exportChartData = () => {
    const data = {
      date: new Date().toISOString(),
      series: animatedSeries,
      summary: {
        totalSales: animatedSeries[0].data.reduce((a, b) => a + b, 0),
        totalRevenue: animatedSeries[1].data.reduce((a, b) => a + b, 0),
        averageSales: Math.floor(animatedSeries[0].data.reduce((a, b) => a + b, 0) / 12),
        growth: Math.round(((animatedSeries[0].data[animatedSeries[0].data.length - 1] - animatedSeries[0].data[0]) / animatedSeries[0].data[0]) * 100)
      }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chart-data-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Range filter options
  const rangeOptions = [
    "Today", "Yesterday", "Last 7 days", "Last 30 days", "This month", "Last month", "Custom range"
  ];

  // Tablar
  const tabs = [
    { id: "area" as const, label: "Area", icon: "📊" },
    { id: "line" as const, label: "Line", icon: "📈" },
    { id: "bar" as const, label: "Bar", icon: "📊" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          animateChart();
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
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
        dateFormat: "M d, Y",
        defaultDate: [sevenDaysAgo, today],
        clickOpens: true,
        onChange: (selectedDates) => {
          if (selectedDates.length === 2) {
            const start = selectedDates[0];
            const end = selectedDates[1];
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setSelectedRange(`${diffDays + 1} days selected`);
          }
        },
        prevArrow:
          '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        nextArrow:
          '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        onOpen: () => {
          const calendar = document.querySelector('.flatpickr-calendar');
          if (calendar) {
            calendar.classList.add('dark:bg-gray-800', 'dark:border-gray-700', 'dark:text-gray-200');
          }
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
  }, [animateChart]);

  // Chart options
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
      type: activeTab,
      toolbar: {
        show: false,
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
      dropShadow: {
        enabled: activeTab === "area",
        color: "#465FFF",
        top: 0,
        left: 0,
        blur: 15,
        opacity: 0.15
      }
    },
    stroke: {
      curve: "smooth",
      width: activeTab === "bar" ? 0 : [3, 3],
      dashArray: activeTab === "line" ? [0, 5] : [0, 0],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: activeTab === "area" ? 0.55 : 0,
        opacityTo: activeTab === "area" ? 0 : 0,
        stops: [0, 90, 100]
      },
    },
    markers: {
      size: activeTab === "line" ? 5 : 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
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
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20
      }
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      shared: true,
      intersect: false,
      x: {
        format: "MMM",
      },
      y: {
        formatter: (value) => `$${value}K`
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const sales = series[0][dataPointIndex];
        const revenue = series[1][dataPointIndex];
        const month = w.globals.labels[dataPointIndex];
        return `
          <div class="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">${month}</div>
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-[#465FFF]"></div>
                <span class="text-xs font-medium text-gray-600 dark:text-gray-300">Sales</span>
              </div>
              <span class="text-xs font-bold text-gray-900 dark:text-white">$${sales}K</span>
            </div>
            <div class="flex items-center justify-between gap-4 mt-1">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-[#9CB9FF]"></div>
                <span class="text-xs font-medium text-gray-600 dark:text-gray-300">Revenue</span>
              </div>
              <span class="text-xs font-bold text-gray-900 dark:text-white">$${revenue}K</span>
            </div>
          </div>
        `;
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
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500
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
      min: 0,
      max: activeTab === "bar" ? 250 : undefined,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
        dataLabels: {
          position: 'top'
        }
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-700`}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Statistics Dashboard
            </h3>
            {isLoading && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monthly sales and revenue overview with analytics
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart Type Tabs */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <span className="mr-1.5">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh data"
            >
              <RefreshIcon className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={exportChartData}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              title="Export data"
            >
              <DownloadIcon className="size-4" />
            </button>
          </div>
          
          {/* Date Range Filter */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <FilterIcon className="size-4 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
            </div>
            <select 
              className="pl-10 pr-4 py-2.5 w-40 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all appearance-none"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              {rangeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* Date Picker */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <CalenderIcon className="size-4 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
            </div>
            <input
              ref={datePickerRef}
              className="pl-10 pr-4 py-2.5 w-40 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              placeholder="Select date range"
              readOnly
            />
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#465FFF] ring-2 ring-[#465FFF]/20"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sales</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white ml-2">
              ${animatedSeries[0].data.reduce((a, b) => a + b, 0).toLocaleString()}K
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#9CB9FF] ring-2 ring-[#9CB9FF]/20"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Revenue</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white ml-2">
              ${animatedSeries[1].data.reduce((a, b) => a + b, 0).toLocaleString()}K
            </span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Updated just now • <span className="text-green-600 dark:text-green-400 font-medium">Live</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative group">
        <div className="max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="min-w-[1000px] xl:min-w-full">
            <Chart 
              options={options} 
              series={animatedSeries} 
              type={activeTab} 
              height={310} 
            />
          </div>
        </div>
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading chart data...</p>
            </div>
          </div>
        )}
        
        {/* Hover effect gradient */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#465FFF]"></div>
            </div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ${animatedSeries[0].data.reduce((a, b) => a + b, 0).toLocaleString()}K
          </p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
            +15.2% from last month
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#465FFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Monthly</p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ${Math.floor(animatedSeries[0].data.reduce((a, b) => a + b, 0) / 12).toLocaleString()}K
          </p>
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            Above target by 8%
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Peak Month</p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
              animatedSeries[0].data.indexOf(Math.max(...animatedSeries[0].data))
            ]}
          </p>
          <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
            ${Math.max(...animatedSeries[0].data)}K peak
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Growth</p>
          </div>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            +{Math.round(((animatedSeries[0].data[animatedSeries[0].data.length - 1] - animatedSeries[0].data[0]) / animatedSeries[0].data[0]) * 100)}%
          </p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
            Year-over-year increase
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style >{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        /* Flatpickr dark mode improvements */
        :global(.dark .flatpickr-calendar) {
          background: #1f2937 !important;
          border-color: #374151 !important;
          color: #d1d5db !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        :global(.dark .flatpickr-day) {
          color: #d1d5db !important;
        }
        :global(.dark .flatpickr-day:hover) {
          background: #374151 !important;
          border-color: #374151 !important;
        }
        :global(.dark .flatpickr-day.selected) {
          background: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        :global(.dark .flatpickr-month) {
          color: #f9fafb !important;
          background: #1f2937 !important;
          border-bottom: 1px solid #374151 !important;
        }
        :global(.dark .flatpickr-weekday) {
          color: #9ca3af !important;
        }
        :global(.dark .flatpickr-current-month) {
          color: #f9fafb !important;
        }
      `}</style>
    </div>
  );
}