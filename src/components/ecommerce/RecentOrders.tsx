import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState, useMemo } from "react";

// Define the TypeScript interface for the table rows
interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  status: "Delivered" | "Pending" | "Canceled";
  image: string;
  quantity: number;
  orderDate: string;
  customer: string;
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 13\"",
    variants: "Silver, Space Gray",
    category: "Laptop",
    price: "$2,399.00",
    status: "Delivered",
    image: "/images/product/product-01.jpg",
    quantity: 1,
    orderDate: "Jan 15, 2024",
    customer: "Alex Johnson"
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "Titanium, GPS",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "/images/product/product-02.jpg",
    quantity: 2,
    orderDate: "Jan 16, 2024",
    customer: "Sarah Miller"
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    variants: "256GB, 512GB",
    category: "SmartPhone",
    price: "$1,869.00",
    status: "Delivered",
    image: "/images/product/product-03.jpg",
    quantity: 1,
    orderDate: "Jan 17, 2024",
    customer: "Michael Chen"
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    variants: "12.9\", 11\"",
    category: "Tablet",
    price: "$1,699.00",
    status: "Canceled",
    image: "/images/product/product-04.jpg",
    quantity: 1,
    orderDate: "Jan 18, 2024",
    customer: "Emma Davis"
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    variants: "Wireless Case",
    category: "Accessories",
    price: "$240.00",
    status: "Delivered",
    image: "/images/product/product-05.jpg",
    quantity: 3,
    orderDate: "Jan 19, 2024",
    customer: "David Wilson"
  },
];

// Helper function to calculate days ago
const getDaysAgo = (dateString: string): string => {
  const orderDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - orderDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

export default function RecentOrders() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("date");

  const filters = ["All", "Delivered", "Pending", "Canceled"];

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Delivered":
        return { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", dot: "bg-green-500" };
      case "Pending":
        return { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" };
      case "Canceled":
        return { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" };
      default:
        return { bg: "bg-gray-50 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-400", dot: "bg-gray-500" };
    }
  };

  const getTotalOrders = () => {
    return tableData.reduce((sum, product) => sum + product.quantity, 0);
  };

  const getTotalRevenue = () => {
    return tableData.reduce((sum, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      return sum + (price * product.quantity);
    }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  // Filter and sort the data
  const filteredAndSortedData = useMemo(() => {
    let filtered = tableData;
    
    // Apply filter
    if (selectedFilter !== "All") {
      filtered = filtered.filter(product => product.status === selectedFilter);
    }
    
    // Apply sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price":
          const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
          const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
          return priceB - priceA;
        
        case "status":
          return a.status.localeCompare(b.status);
        
        case "date":
        default:
          const dateA = new Date(a.orderDate).getTime();
          const dateB = new Date(b.orderDate).getTime();
          return dateB - dateA;
      }
    });
    
    return filtered;
  }, [selectedFilter, sortBy]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track and manage your recent orders
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Stats Summary */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{filteredAndSortedData.length}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Orders</div>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
              <div className="text-center hidden sm:block">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{getTotalOrders()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Items</div>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
              <div className="text-center hidden md:block">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{getTotalRevenue()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                } border border-gray-300 dark:border-gray-700`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort and Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="status">Sort by Status</option>
            </select>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 whitespace-nowrap">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table (Hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/30">
            <TableRow>
              <TableCell isHeader className="py-4 pl-6 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[250px]">
                PRODUCT
              </TableCell>
              <TableCell isHeader className="py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[120px]">
                CATEGORY
              </TableCell>
              <TableCell isHeader className="py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[150px]">
                CUSTOMER
              </TableCell>
              <TableCell isHeader className="py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[120px]">
                DATE
              </TableCell>
              <TableCell isHeader className="py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[110px]">
                QUANTITY
              </TableCell>
              <TableCell isHeader className="py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[120px]">
                PRICE
              </TableCell>
              <TableCell isHeader className="py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[120px]">
                STATUS
              </TableCell>
              <TableCell isHeader className="py-4 pr-6 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[130px]">
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredAndSortedData.map((product) => {
              const statusColor = getStatusColor(product.status);
              const totalPrice = (parseFloat(product.price.replace(/[^0-9.-]+/g, "")) * product.quantity).toFixed(2);
              
              return (
                <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  {/* Product Column */}
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/56/cccccc/ffffff?text=Product";
                            (e.target as HTMLImageElement).className = "h-full w-full object-contain p-1";
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white truncate mb-1">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {product.variants}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category Column */}
                  <TableCell className="py-4">
                    <span className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg inline-block">
                      {product.category}
                    </span>
                  </TableCell>

                  {/* Customer Column */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {product.customer.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {product.customer}
                      </span>
                    </div>
                  </TableCell>

                  {/* Date Column */}
                  <TableCell className="py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white mb-1">{product.orderDate}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{getDaysAgo(product.orderDate)}</p>
                    </div>
                  </TableCell>

                  {/* Quantity Column */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.quantity}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">pcs</span>
                    </div>
                  </TableCell>

                  {/* Price Column */}
                  <TableCell className="py-4">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {product.price}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ${totalPrice} total
                      </p>
                    </div>
                  </TableCell>

                  {/* Status Column */}
                  <TableCell className="py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusColor.bg} min-w-[110px] justify-center`}>
                      <div className={`w-2 h-2 rounded-full ${statusColor.dot}`}></div>
                      <span className={`text-sm font-medium ${statusColor.text}`}>
                        {product.status}
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell className="py-4 pr-6">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                        title="View details"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                        title="Edit order"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        title="Delete order"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View Cards (Hidden on desktop) */}
      <div className="md:hidden p-4 space-y-4">
        {filteredAndSortedData.map((product) => {
          const statusColor = getStatusColor(product.status);
          const totalPrice = (parseFloat(product.price.replace(/[^0-9.-]+/g, "")) * product.quantity).toFixed(2);
          
          return (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/56/cccccc/ffffff?text=Product";
                        (e.target as HTMLImageElement).className = "h-full w-full object-contain p-1";
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{product.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{product.customer}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusColor.bg}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`}></div>
                  <span className={`text-xs font-medium ${statusColor.text}`}>{product.status}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">{product.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{product.orderDate}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{getDaysAgo(product.orderDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Quantity</p>
                  <p className="font-medium text-gray-900 dark:text-white">{product.quantity} pcs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                  <p className="font-bold text-gray-900 dark:text-white">{product.price}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">${totalPrice} total</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedData.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">124</span> orders
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}