import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState, useMemo } from "react";

// TypeScript interfeyslari
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  status: "Delivered" | "Pending" | "Canceled";
  image: string;
  quantity: number;
}

// Barcha mahsulotlar ma'lumotlari
const allProducts: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 13\"",
    category: "Laptop",
    price: "$2,399.00",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&auto=format&fit=crop",
    quantity: 1
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop",
    quantity: 2
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    category: "SmartPhone",
    price: "$1,869.00",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&auto=format&fit=crop",
    quantity: 1
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    category: "Tablet",
    price: "$1,699.00",
    status: "Canceled",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop",
    quantity: 1
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    category: "Accessories",
    price: "$240.00",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&auto=format&fit=crop",
    quantity: 3
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: "$399.99",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop",
    quantity: 2
  },
  {
    id: 7,
    name: "Samsung Galaxy S24",
    category: "SmartPhone",
    price: "$1,199.00",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&auto=format&fit=crop",
    quantity: 1
  },
  {
    id: 8,
    name: "Dell XPS 15",
    category: "Laptop",
    price: "$2,299.00",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&auto=format&fit=crop",
    quantity: 1
  },
  {
    id: 9,
    name: "Google Pixel Watch 2",
    category: "Watch",
    price: "$349.00",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop",
    quantity: 3
  },
  {
    id: 10,
    name: "Microsoft Surface Pro 9",
    category: "Tablet",
    price: "$1,699.00",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop",
    quantity: 1
  },
];

// Tasvir placeholder URL
const getPlaceholderImage = (category: string) => {
  const colors: Record<string, string> = {
    Laptop: "f0f8ff",
    Watch: "fff0f5",
    SmartPhone: "f5fffa",
    Tablet: "fffacd",
    Accessories: "f0fff0",
    Headphones: "e6e6fa",
  };
  const color = colors[category] || "e0e0e0";
  return `https://via.placeholder.com/100/${color}/333333?text=${encodeURIComponent(category.charAt(0))}`;
};

export default function RecentOrders() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const filters = ["All", "Delivered", "Pending", "Canceled"];

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
      case "Canceled":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  // Filterlash
  const filteredProducts = useMemo(() => {
    if (selectedFilter === "All") return allProducts;
    return allProducts.filter(product => product.status === selectedFilter);
  }, [selectedFilter]);

  // Pagination hisoblash
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Pagination funksiyalari
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Umumiy narxni hisoblash
  const getTotalRevenue = () => {
    return filteredProducts.reduce((sum, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      return sum + (price * product.quantity);
    }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage and track your orders
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {getTotalRevenue()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableCell isHeader className="font-semibold text-left text-gray-700 dark:text-gray-300 py-4 pl-6">
                PRODUCT
              </TableCell>
              <TableCell isHeader className="font-semibold text-left text-gray-700 dark:text-gray-300 py-4">
                CATEGORY
              </TableCell>
              <TableCell isHeader className="font-semibold text-left text-gray-700 dark:text-gray-300 py-4">
                QUANTITY
              </TableCell>
              <TableCell isHeader className="font-semibold text-left text-gray-700 dark:text-gray-300 py-4">
                PRICE
              </TableCell>
              <TableCell isHeader className="font-semibold text-left text-gray-700 dark:text-gray-300 py-4">
                STATUS
              </TableCell>
              <TableCell isHeader className="font-semibold text-left text-gray-700 dark:text-gray-300 py-4 pr-6">
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {/* Product */}
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full  object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getPlaceholderImage(product.category);
                            (e.target as HTMLImageElement).className = "w-full h-full object-contain p-2";
                          }}
                        />
                      </div>
                      {product.quantity > 1 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                          {product.quantity}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ID: #{product.id.toString().padStart(3, '0')}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell className="py-4">
                  <span className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {product.category}
                  </span>
                </TableCell>

                {/* Quantity */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.quantity}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      pcs
                    </span>
                  </div>
                </TableCell>

                {/* Price */}
                <TableCell className="py-4">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {product.price}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${(parseFloat(product.price.replace(/[^0-9.-]+/g, "")) * product.quantity).toFixed(2)} total
                    </p>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="py-4 pr-6">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} orders
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}