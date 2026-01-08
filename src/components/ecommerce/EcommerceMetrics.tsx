import { useState, useEffect, useRef } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [customerProgress, setCustomerProgress] = useState(0);
  const [orderProgress, setOrderProgress] = useState(0);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  const targetCustomerCount = 3782;
  const targetOrderCount = 5359;
  const targetCustomerProgress = 94.6;
  const targetOrderProgress = 89.3;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          // Customers count animation
          let currentCustomer = 0;
          const customerStep = targetCustomerCount / 50; // 50 frames over 1 second
          
          const customerInterval = setInterval(() => {
            currentCustomer += customerStep;
            if (currentCustomer >= targetCustomerCount) {
              currentCustomer = targetCustomerCount;
              clearInterval(customerInterval);
            }
            setCustomerCount(Math.floor(currentCustomer));
          }, 20);

          // Orders count animation
          let currentOrder = 0;
          const orderStep = targetOrderCount / 50;
          
          const orderInterval = setInterval(() => {
            currentOrder += orderStep;
            if (currentOrder >= targetOrderCount) {
              currentOrder = targetOrderCount;
              clearInterval(orderInterval);
            }
            setOrderCount(Math.floor(currentOrder));
          }, 20);

          // Progress bars animation
          let currentCustomerProgress = 0;
          let currentOrderProgress = 0;
          const progressStep = 2; // 2% per frame
          
          const progressInterval = setInterval(() => {
            currentCustomerProgress += progressStep;
            currentOrderProgress += progressStep;
            
            if (currentCustomerProgress >= targetCustomerProgress) {
              currentCustomerProgress = targetCustomerProgress;
            }
            if (currentOrderProgress >= targetOrderProgress) {
              currentOrderProgress = targetOrderProgress;
            }
            
            setCustomerProgress(currentCustomerProgress);
            setOrderProgress(currentOrderProgress);
            
            if (currentCustomerProgress >= targetCustomerProgress && 
                currentOrderProgress >= targetOrderProgress) {
              clearInterval(progressInterval);
            }
          }, 20);

          // Cleanup
          return () => {
            clearInterval(customerInterval);
            clearInterval(orderInterval);
            clearInterval(progressInterval);
          };
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6" ref={containerRef}>
      {/* Customers Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-brand-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-700">
        {/* Background subtle effect */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-brand-900/20"></div>
        
        <div className="relative flex flex-col">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 shadow-sm group-hover:scale-105 transition-transform duration-300 dark:from-brand-900/30 dark:to-brand-900/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm dark:bg-gray-800">
                  <GroupIcon className="text-brand-600 size-5 dark:text-brand-300" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-gray-500 dark:text-gray-400">
                  Total Customers
                </span>
                <h4 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {customerCount.toLocaleString()}
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    This month
                  </span>
                </div>
              </div>
            </div>
            
            {/* Trend indicator */}
            <div className="flex flex-col items-end">
              <div className="mb-2">
                <Badge color="success">
                  <div className="flex items-center gap-1">
                    <ArrowUpIcon className="size-3.5" />
                    <span>11.01%</span>
                  </div>
                </Badge>
              </div>
              <div className="text-xs font-medium text-success-600 dark:text-success-400">
                +420 vs last month
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Monthly goal: 4,000
              </span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {customerProgress.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-100"
                style={{ width: `${customerProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-rose-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-rose-700">
        {/* Background subtle effect */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-rose-900/20"></div>
        
        <div className="relative flex flex-col">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 shadow-sm group-hover:scale-105 transition-transform duration-300 dark:from-rose-900/30 dark:to-rose-900/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm dark:bg-gray-800">
                  <BoxIconLine className="text-rose-600 size-5 dark:text-rose-300" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Orders
                </span>
                <h4 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {orderCount.toLocaleString()}
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    This month
                  </span>
                </div>
              </div>
            </div>
            
            {/* Trend indicator */}
            <div className="flex flex-col items-end">
              <div className="mb-2">
                <Badge color="error">
                  <div className="flex items-center gap-1">
                    <ArrowDownIcon className="size-3.5" />
                    <span>9.05%</span>
                  </div>
                </Badge>
              </div>
              <div className="text-xs font-medium text-rose-600 dark:text-rose-400">
                -532 vs last month
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Monthly goal: 6,000
              </span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {orderProgress.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-100"
                style={{ width: `${orderProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}