"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { 
  motion, 
  AnimatePresence,
  useMotionValue,
  useTransform 
} from "framer-motion";
import {
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaUserCircle,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFileExport,
  FaCloudDownloadAlt,
  FaCalendarAlt,
  FaListUl,
  FaChartBar,
  FaGlobe,
  FaExclamationTriangle,
  FaEye,
  FaEllipsisV,
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaDesktop
} from "react-icons/fa";
import {
  HiOutlineRefresh,
  HiOutlineMail,
  HiOutlineDeviceMobile,
  HiOutlineUser,
  HiOutlineDatabase,
  HiOutlineDocumentReport,
  HiOutlineLocationMarker
} from "react-icons/hi";
import {
  BsCheck2Circle,
  BsBarChart,
  BsPieChart,
  BsCalendarDate,
  BsGlobe2,
  BsThreeDots
} from "react-icons/bs";

export default function DownloadsAdminPage() {
  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [downloads, setDownloads] = useState([]);
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [stats, setStats] = useState({ totalDownloads: 0, dailyStats: [], deviceStats: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'downloadDate', direction: 'desc' });
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("overview");
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notification, setNotification] = useState(null);
  const [deviceStats, setDeviceStats] = useState({
    mobile: 0,
    desktop: 0,
    tablet: 0,
    unknown: 0
  });
  const [locationData, setLocationData] = useState([]);
  const [selectedDownload, setSelectedDownload] = useState(null);
  
  // Animation values
  const x = useMotionValue(0);
  const router = useRouter();
  const chartRef = useRef(null);
  const tableRef = useRef(null);
  
  // Authentication and data loading
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/track-download?password=${password}`);
      if (response.ok) {
        setIsAuthenticated(true);
        const data = await response.json();
        setDownloads(data.downloads || []);
        setFilteredDownloads(data.downloads || []);
        await fetchStats();
        showNotification("Login successful! Welcome to Ginie AI Admin", "success");
      } else {
        setError("Invalid password");
        showNotification("Authentication failed", "error");
      }
    } catch (err) {
      setError("Failed to authenticate");
      console.error("Authentication error:", err);
      showNotification("Connection error", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/download-stats?password=${password}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        
        // Extract device statistics
        processDeviceStats(data.downloads || []);
        
        // Extract location data
        generateMockLocationData(data.totalDownloads);
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
      showNotification("Failed to load statistics", "warning");
    }
  };
  
  // Generate mock location data for visualization
  const generateMockLocationData = (total) => {
    const countries = ["United States", "India", "United Kingdom", "Canada", "Germany", "Australia", "France", "Japan", "Brazil", "Mexico"];
    let remainingCount = total;
    const data = [];
    
    for (let i = 0; i < countries.length - 1 && remainingCount > 0; i++) {
      const count = Math.floor(Math.random() * remainingCount * 0.4) + 1;
      data.push({ country: countries[i], count });
      remainingCount -= count;
    }
    
    if (remainingCount > 0) {
      data.push({ country: countries[countries.length - 1], count: remainingCount });
    }
    
    setLocationData(data.sort((a, b) => b.count - a.count));
  };

  // Process device stats from user agents
  const processDeviceStats = (downloadData) => {
    if (!downloadData || downloadData.length === 0) return;
    
    const stats = {
      mobile: 0,
      desktop: 0,
      tablet: 0,
      unknown: 0,
    };

    downloadData.forEach(download => {
      const userAgent = download.userAgent || '';
      if (userAgent.includes('Mobile') || userAgent.includes('Android')) {
        stats.mobile++;
      } else if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
        stats.tablet++;
      } else if (userAgent.includes('Windows') || userAgent.includes('Macintosh') || userAgent.includes('Linux')) {
        stats.desktop++;
      } else {
        stats.unknown++;
      }
    });

    setDeviceStats(stats);
  };
  
  // Notification system
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Export data functions
  const exportToCSV = () => {
    if (!filteredDownloads.length) {
      showNotification("No data to export", "warning");
      return;
    }
    
    const headers = ["Name", "Email", "Phone", "Download Date", "Device", "Browser"];
    const csvData = filteredDownloads.map(d => 
      [
        d.name || "",
        d.email || "",
        d.phone || "N/A", 
        new Date(d.downloadDate || d.timestamp).toLocaleString(),
        extractDeviceInfo(d.userAgent || ''),
        extractBrowserInfo(d.userAgent || '')
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
    );
    
    const csv = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    downloadFile(csv, 'text/csv;charset=utf-8;', `ginie_ai_downloads_${new Date().toISOString().slice(0,10)}.csv`);
    showNotification("CSV export complete", "success");
  };

  const exportToJSON = () => {
    if (!filteredDownloads.length) {
      showNotification("No data to export", "warning");
      return;
    }
    
    const json = JSON.stringify(filteredDownloads, null, 2);
    downloadFile(json, 'application/json', `ginie_ai_downloads_${new Date().toISOString().slice(0,10)}.json`);
    showNotification("JSON export complete", "success");
  };
  
  const downloadFile = (content, contentType, filename) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  
  // Extract device information from user agent
  const extractDeviceInfo = (userAgent) => {
    if (!userAgent) return 'Unknown';
    
    if (userAgent.includes('Mobile') || userAgent.includes('Android')) {
      return 'Mobile';
    } else if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
      return 'Tablet';
    } else if (userAgent.includes('Windows') || userAgent.includes('Macintosh') || userAgent.includes('Linux')) {
      return 'Desktop';
    }
    
    return 'Unknown';
  };

  // Extract browser information from user agent
  const extractBrowserInfo = (userAgent) => {
    if (!userAgent) return 'Unknown';
    
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
    
    return 'Other';
  };
  
  // Sorting, filtering and pagination
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const applySort = (data) => {
    return [...data].sort((a, b) => {
      if (sortConfig.key === 'downloadDate') {
        const dateA = new Date(a.downloadDate || a.timestamp || 0);
        const dateB = new Date(b.downloadDate || b.timestamp || 0);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDateFilterChange = (filter) => {
    setDateFilter(filter);
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  const applyFilters = () => {
    let filtered = [...downloads];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        (item.name && item.name.toLowerCase().includes(term)) ||
        (item.email && item.email.toLowerCase().includes(term)) ||
        (item.phone && item.phone.toLowerCase().includes(term))
      );
    }
    
    // Apply date filter
    if (dateFilter !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (dateFilter) {
        case "today":
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.downloadDate || item.timestamp);
            return itemDate >= today;
          });
          break;
        case "week":
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.downloadDate || item.timestamp);
            return itemDate >= weekAgo;
          });
          break;
        case "month":
          const monthAgo = new Date();
          monthAgo.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.downloadDate || item.timestamp);
            return itemDate >= monthAgo;
          });
          break;
      }
    }
    
    // Apply sorting and update state
    return applySort(filtered);
  };

  // Current page data for pagination
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDownloads.slice(startIndex, startIndex + itemsPerPage);
  };
  
  // Effect hooks for filtering and sorting
  useEffect(() => {
    const result = applyFilters();
    setFilteredDownloads(result);
  }, [searchTerm, dateFilter, sortConfig, downloads]);
  
  // Render date/time in a user-friendly format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) return "Invalid date";
      
      // Format: DD MMM YYYY, HH:MM
      return date.toLocaleString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "Invalid date";
    }
  };
  
  // Calculate growth rate between current and previous period
  const calculateGrowth = () => {
    if (!stats.dailyStats || stats.dailyStats.length < 2) return { value: 0, isPositive: true };
    
    const lastDayCount = stats.dailyStats[stats.dailyStats.length - 1].count;
    const previousDayCount = stats.dailyStats[stats.dailyStats.length - 2].count;
    
    if (previousDayCount === 0) return { value: 100, isPositive: true };
    
    const growthPercent = ((lastDayCount - previousDayCount) / previousDayCount) * 100;
    return {
      value: Math.abs(Math.round(growthPercent)),
      isPositive: growthPercent >= 0
    };
  };

  const growth = calculateGrowth();

  // JS chart rendering for download trends
  const renderAreaChart = () => {
    // Ensure we have data to display
    if (!stats.dailyStats || stats.dailyStats.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <FaExclamationTriangle className="text-4xl text-amber-400 mb-2" />
          <p className="text-gray-400">No trend data available</p>
        </div>
      );
    }

    const maxValue = Math.max(...stats.dailyStats.map(day => day.count)) || 10;
    const chartHeight = 220;
    
    return (
      <div className="relative h-[220px] mt-8">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
          <div>{maxValue}</div>
          <div>{Math.round(maxValue * 0.75)}</div>
          <div>{Math.round(maxValue * 0.5)}</div>
          <div>{Math.round(maxValue * 0.25)}</div>
          <div>0</div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute left-10 right-0 top-0 bottom-0">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <div key={i} className="absolute left-0 right-0 border-b border-gray-800" style={{ bottom: `${ratio * 100}%` }} />
          ))}
        </div>

        {/* Data points and area */}
        <div className="absolute left-12 right-4 top-0 bottom-0 flex items-end">
          <svg className="w-full h-full" viewBox={`0 0 ${stats.dailyStats.length - 1} ${maxValue}`} preserveAspectRatio="none">
            {/* Area fill */}
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            <path 
              d={`
                M0,${maxValue - stats.dailyStats[0].count} 
                ${stats.dailyStats.map((day, i) => `L${i},${maxValue - day.count}`).join(' ')}
                L${stats.dailyStats.length - 1},${maxValue}
                L0,${maxValue}
                Z
              `}
              fill="url(#areaGradient)"
              stroke="none"
            />
            
            {/* Line */}
            <path 
              d={`
                M0,${maxValue - stats.dailyStats[0].count} 
                ${stats.dailyStats.map((day, i) => `L${i},${maxValue - day.count}`).join(' ')}
              `}
              fill="none"
              stroke="url(#purplePinkGradient)"
              strokeWidth="2"
            />
            
            {/* Gradient for line */}
            <defs>
              <linearGradient id="purplePinkGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            
            {/* Data points */}
            {stats.dailyStats.map((day, i) => (
              <circle 
                key={i}
                cx={i}
                cy={maxValue - day.count}
                r="3"
                fill="#9333ea"
                stroke="#fff"
                strokeWidth="1"
                className="hover:r-4 transition-all duration-200"
              />
            ))}
          </svg>
        </div>
        
        {/* X-axis (dates) */}
        <div className="absolute left-12 right-4 bottom-[-25px] flex justify-between text-xs text-gray-500">
          {stats.dailyStats.map((day, i) => (
            <div key={i} className="transform -rotate-12">
              {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Download distribution pie chart
  const renderDeviceChart = () => {
    const total = Object.values(deviceStats).reduce((sum, val) => sum + val, 0);
    if (total === 0) return null;
    
    // Calculate percentages and angles for pie segments
    const devices = [
      { name: 'Mobile', value: deviceStats.mobile, color: '#9333ea' },
      { name: 'Desktop', value: deviceStats.desktop, color: '#ec4899' },
      { name: 'Tablet', value: deviceStats.tablet, color: '#3b82f6' },
      { name: 'Unknown', value: deviceStats.unknown, color: '#6b7280' }
    ].filter(device => device.value > 0);
    
    // Calculate stroke dasharray and dashoffset for each segment
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    let currentAngle = 0;
    
    devices.forEach(device => {
      device.percentage = Math.round((device.value / total) * 100);
      device.angle = (device.value / total) * 360;
      device.dasharray = circumference;
      device.dashoffset = circumference - (circumference * device.percentage / 100);
      device.startAngle = currentAngle;
      currentAngle += device.angle;
    });
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="none" 
              stroke="#1f2937" 
              strokeWidth="12"
            />
            
            {devices.map((device, index) => {
              // Convert startAngle to radians for SVG positioning
              const angleRad = (device.startAngle - 90) * (Math.PI / 180);
              const x = 50 + 30 * Math.cos(angleRad);
              const y = 50 + 30 * Math.sin(angleRad);
              
              // Create the segment
              return (
                <g key={index}>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r={radius} 
                    fill="none" 
                    stroke={device.color} 
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (circumference * device.percentage / 100)}
                    transform={`rotate(${device.startAngle - 90} 50 50)`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    style={{
                      strokeDashoffset: circumference - (circumference * device.percentage / 100)
                    }}
                  />
                  
                  {device.percentage >= 5 && (
                    <text 
                      x={x}
                      y={y} 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {device.percentage}%
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Center text */}
            <text x="50" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
              Devices
            </text>
            <text x="50" y="58" textAnchor="middle" fill="#9ca3af" fontSize="8">
              {total} total
            </text>
          </svg>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
          {devices.map((device, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: device.color }}></div>
              <span className="text-gray-400 text-xs">{device.name} ({device.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Heatmap for geographic data
  const renderLocationList = () => {
    return (
      <div className="mt-4 max-h-60 overflow-y-auto pr-2">
        {locationData.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" style={{
                opacity: 0.3 + (0.7 * index / locationData.length)
              }}></div>
              <span className="text-gray-300">{item.country}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm">{item.count}</span>
              <div className="w-12 h-2 bg-gray-700 ml-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                  style={{ width: `${(item.count / locationData[0].count) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // UI Components
  const renderChart = () => {
    if (!stats.dailyStats || stats.dailyStats.length === 0) {
      return <p className="text-gray-400 text-center py-8">No daily statistics available</p>;
    }
    
    const maxCount = Math.max(...stats.dailyStats.map(s => s.count));
    const barHeight = 200; // Max height for bars in pixels
    
    return (
      <div className="mt-6 p-6 bg-gray-900 rounded-xl border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Download Trends</h3>
          <div className="flex space-x-2">
            <button className="bg-gray-800 text-gray-400 px-2 py-1 text-xs rounded hover:bg-gray-700">7 Days</button>
            <button className="bg-gray-700 text-white px-2 py-1 text-xs rounded">30 Days</button>
          </div>
        </div>
        <div className="flex items-end justify-between h-[230px] pt-6 relative">
          <div className="absolute inset-0 flex flex-col justify-between opacity-20 pointer-events-none">
            <div className="border-b border-gray-700 w-full"></div>
            <div className="border-b border-gray-700 w-full"></div>
            <div className="border-b border-gray-700 w-full"></div>
            <div className="border-b border-gray-700 w-full"></div>
          </div>
          
          {stats.dailyStats.map((day, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-10 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-300"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.count / maxCount) * barHeight}px` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{ minHeight: '4px' }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-t-md bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded whitespace-nowrap transition-opacity z-10 border border-gray-700">
                    <div className="font-bold text-sm">{day.count} download{day.count !== 1 ? 's' : ''}</div>
                    <div className="text-gray-300">{new Date(day.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-r border-b border-gray-700"></div>
                  </div>
                </motion.div>
              </div>
              <div className="text-xs text-gray-500 mt-2 transform rotate-45 origin-left">
                {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Admin login form
  const renderLoginForm = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-xl border border-gray-800/50 backdrop-blur-lg">
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20">
            <Image 
              src="/assets/logo3.png" 
              alt="Ginie AI Logo" 
              width={80} 
              height={80}
              className="rounded-full"
            />
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"
            ></motion.div>
          </div>
        </div>
      
        <h1 className="text-2xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Admin Dashboard</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Enter your administrator password to continue</p>
        
        <form onSubmit={handleLogin}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm flex items-center"
            >
              <FaExclamationTriangle className="mr-2 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2 text-sm font-medium">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg shadow-lg transition-all disabled:opacity-70 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                </svg>
                Login to Admin
              </>
            )}
          </motion.button>
          
          <Link 
            href="/"
            className="w-full mt-4 block text-center border border-gray-700 py-3 rounded-lg text-gray-400 hover:bg-gray-800 transition-all"
          >
            Back to Home
          </Link>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-center text-gray-500 text-xs">
            Ginie AI Admin Dashboard © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Dashboard content
  const renderDashboard = () => {
    // Calculate pagination
    const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
    const currentData = getCurrentPageData();
    
    return (
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar Navigation */}
        <motion.div 
          className={`bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 md:w-64 md:flex-shrink-0 transition-all duration-300 ease-in-out z-20 md:sticky top-0 h-screen ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'}`}
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-3">
                <Image
                  src="/assets/logo3.png"
                  alt="Ginie AI Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              {isSidebarOpen && (
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                >
                  Ginie Admin
                </motion.h2>
              )}
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-8 px-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${
                    activeTab === "overview" 
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border-l-4 border-purple-500" 
                      : "text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  <BsBarChart className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Overview</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("downloads")}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${
                    activeTab === "downloads" 
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border-l-4 border-purple-500" 
                      : "text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  <FaCloudDownloadAlt className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Downloads</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${
                    activeTab === "analytics" 
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border-l-4 border-purple-500" 
                      : "text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  <BsPieChart className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Analytics</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("geo")}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${
                    activeTab === "geo" 
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border-l-4 border-purple-500" 
                      : "text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  <BsGlobe2 className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Geography</span>}
                </button>
              </li>
            </ul>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className={`p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 ${!isSidebarOpen && 'hidden md:block'}`}>
              <div className="flex items-center justify-between mb-3">
                {isSidebarOpen && <h5 className="text-sm font-medium text-gray-300">Server Status</h5>}
                <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              {isSidebarOpen && (
                <>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Memory</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full mb-3">
                    <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>CPU</span>
                    <span>23%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full">
                    <div className="h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-4">
              <Link
                href="/"
                className={`flex items-center justify-center p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all ${!isSidebarOpen && 'hidden md:flex'}`}
              >
                <FaChevronLeft className="mr-2" />
                {isSidebarOpen && <span>Back to site</span>}
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <div className="flex-1 bg-gray-950 min-h-screen">
          {/* Header */}
          <div className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                  className="text-gray-400 hover:text-white p-2 rounded-lg mr-2 hover:bg-gray-800 hidden md:block"
                >
                  {isSidebarOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <h2 className="text-xl font-semibold text-gray-100 hidden md:block">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "downloads" && "Download Records"}
                  {activeTab === "analytics" && "Analytics & Insights"}
                  {activeTab === "geo" && "Geographic Data"}
                </h2>
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="block md:hidden text-gray-400 hover:text-white p-2 rounded-lg mr-2 hover:bg-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                  title="Refresh data"
                >
                  <HiOutlineRefresh className="w-5 h-5" />
                </motion.button>
                
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </motion.button>
                </div>
                
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center cursor-pointer rounded-full bg-gray-800 px-2 py-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                      A
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-300 hidden md:block">Admin</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-6">
            {/* Display notifications if any */}
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-xs flex items-center ${
                    notification.type === 'success' ? 'bg-green-800/90 text-green-100 border border-green-700' :
                    notification.type === 'error' ? 'bg-red-800/90 text-red-100 border border-red-700' :
                    notification.type === 'warning' ? 'bg-amber-700/90 text-amber-100 border border-amber-600' :
                    'bg-blue-800/90 text-blue-100 border border-blue-700'
                  }`}
                >
                  <div className="mr-3">
                    {notification.type === 'success' && <BsCheck2Circle className="w-5 h-5" />}
                    {notification.type === 'error' && <FaExclamationTriangle className="w-5 h-5" />}
                    {notification.type === 'warning' && <FaExclamationTriangle className="w-5 h-5" />}
                    {notification.type === 'info' && <FaEye className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">{notification.message}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content based on active tab */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Total Downloads Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl"
                    whileHover={{ translateY: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Total Downloads</p>
                        <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                          {stats.totalDownloads}
                        </h3>
                        <p className="text-sm flex items-center mt-2">
                          {growth.isPositive ? (
                            <span className="text-green-400 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z" clipRule="evenodd" />
                              </svg>
                              {growth.value}% up
                            </span>
                          ) : (
                            <span className="text-red-400 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414l3.293 3.293A1 1 0 0012 13z" clipRule="evenodd" />
                              </svg>
                              {growth.value}% down
                            </span>
                          )}
                          <span className="text-gray-500 ml-1">since yesterday</span>
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 rounded-lg">
                        <FaCloudDownloadAlt className="text-pink-500 text-2xl" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Today's Downloads Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl"
                    whileHover={{ translateY: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Today's Downloads</p>
                        <h3 className="text-4xl font-bold text-blue-400">
                          {stats.dailyStats && stats.dailyStats.length > 0 
                            ? stats.dailyStats[stats.dailyStats.length - 1].count
                            : 0}
                        </h3>
                        <p className="text-sm flex items-center mt-2 text-gray-400">
                          <BsCalendarDate className="mr-1 text-blue-400" />
                          <span>{new Date().toLocaleDateString()}</span>
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-4 rounded-lg">
                        <FaCalendarAlt className="text-blue-400 text-2xl" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Unique Users Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl"
                    whileHover={{ translateY: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Unique Users</p>
                        <h3 className="text-4xl font-bold text-green-400">
                          {new Set(downloads.map(d => d.email)).size}
                        </h3>
                        <p className="text-sm flex items-center mt-2">
                          <span className="text-gray-400">
                            <span className="text-green-400">{Math.round((new Set(downloads.map(d => d.email)).size / downloads.length) * 100)}%</span> unique ratio
                          </span>
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 p-4 rounded-lg">
                        <HiOutlineUser className="text-green-400 text-2xl" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Most Active Device */}
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl"
                    whileHover={{ translateY: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Top Device</p>
                        <h3 className="text-4xl font-bold text-amber-400">
                          {Object.entries(deviceStats)
                            .sort(([,a], [,b]) => b - a)[0]?.[0]?.charAt(0).toUpperCase() + Object.entries(deviceStats).sort(([,a], [,b]) => b - a)[0]?.[0]?.slice(1) || 'N/A'}
                        </h3>
                        <p className="text-sm flex items-center mt-2">
                          <span className="text-gray-400">
                            <span className="text-amber-400">{Math.round((Object.entries(deviceStats).sort(([,a], [,b]) => b - a)[0]?.[1] / downloads.length) * 100)}%</span> of downloads
                          </span>
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-4 rounded-lg">
                        {Object.entries(deviceStats).sort(([,a], [,b]) => b - a)[0]?.[0] === 'mobile' ? (
                          <FaMobileAlt className="text-amber-400 text-2xl" />
                        ) : Object.entries(deviceStats).sort(([,a], [,b]) => b - a)[0]?.[0] === 'desktop' ? (
                          <FaDesktop className="text-amber-400 text-2xl" />
                        ) : Object.entries(deviceStats).sort(([,a], [,b]) => b - a)[0]?.[0] === 'tablet' ? (
                          <FaTabletAlt className="text-amber-400 text-2xl" />
                        ) : (
                          <FaLaptop className="text-amber-400 text-2xl" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Charts and Graphs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Download Trend Chart */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-medium text-white">Download Trends</h3>
                      <div className="flex space-x-2">
                        <button className="text-xs bg-gray-800 px-3 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white transition-all">
                          Weekly
                        </button>
                        <button className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded text-white">
                          Monthly
                        </button>
                        <button className="text-xs bg-gray-800 px-3 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white transition-all">
                          Yearly
                        </button>
                      </div>
                    </div>
                    
                    <div className="relative" ref={chartRef}>
                      {renderAreaChart()}
                    </div>
                    
                    <div className="grid grid-cols-3 mt-4 pt-4 border-t border-gray-800">
                      <div className="text-center">
                        <div className="text-gray-400 text-xs mb-1">Avg. Daily</div>
                        <div className="font-bold text-purple-400">
                          {stats.dailyStats ? 
                            Math.round(stats.dailyStats.reduce((acc, day) => acc + day.count, 0) / stats.dailyStats.length) : 0}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-400 text-xs mb-1">Peak Day</div>
                        <div className="font-bold text-pink-400">
                          {stats.dailyStats ? 
                            Math.max(...stats.dailyStats.map(day => day.count)) : 0}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-400 text-xs mb-1">Last 7 Days</div>
                        <div className="font-bold text-blue-400">
                          {stats.dailyStats ? 
                            stats.dailyStats.slice(-7).reduce((acc, day) => acc + day.count, 0) : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Device Distribution */}
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-medium text-white">Device Distribution</h3>
                      <div className="text-gray-400 cursor-pointer hover:text-white transition-all">
                        <BsThreeDots />
                      </div>
                    </div>
                    
                    {renderDeviceChart()}
                    
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Most active device</span>
                        <span className="text-white font-medium">
                          {Object.entries(deviceStats).sort(([,a], [,b]) => b - a)[0]?.[0]?.charAt(0).toUpperCase() + Object.entries(deviceStats).sort(([,a], [,b]) => b - a)[0]?.[0]?.slice(1) || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Last updated</span>
                        <span className="text-gray-300 text-sm">{new Date().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Downloads Table */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-medium text-white">Recent Downloads</h3>
                      <button 
                        onClick={() => setActiveTab("downloads")}
                        className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                      >
                        View All <FaChevronRight className="ml-1" size={12} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Device</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {downloads.slice(0, 5).map((download, index) => (
                          <motion.tr 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-gray-800/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/70 to-pink-500/70 flex items-center justify-center text-white font-medium">
                                  {download.name ? download.name[0].toUpperCase() : "?"}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">{download.name || 'Unknown'}</div>
                                  <div className="text-sm text-gray-500">{download.phone || 'No phone'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-300">{download.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-300">
                                {formatDate(download.downloadDate || download.timestamp)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${extractDeviceInfo(download.userAgent || '') === 'Mobile' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' :
                                extractDeviceInfo(download.userAgent || '') === 'Desktop' ? 'bg-pink-900/50 text-pink-300 border border-pink-700/50' :
                                extractDeviceInfo(download.userAgent || '') === 'Tablet' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' :
                                'bg-gray-700/50 text-gray-300 border border-gray-600/50'}`}
                              >
                                {extractDeviceInfo(download.userAgent || '')}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {downloads.length === 0 && (
                    <div className="py-12 text-center">
                      <div className="inline-flex rounded-full bg-gray-800/50 p-4 mb-4">
                        <HiOutlineDatabase className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-300 mb-1">No downloads yet</h3>
                      <p className="text-gray-500 max-w-sm mx-auto">
                        Once users start downloading your app, their information will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === "downloads" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl overflow-hidden mb-8">
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex flex-wrap items-center justify-between">
                      <h3 className="text-xl font-medium text-white mb-4 md:mb-0">Download Records</h3>
                      
                      <div className="flex flex-wrap items-center space-x-3">
                        {/* Search Input */}
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search downloads..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 w-full md:w-auto"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-500" />
                          </div>
                        </div>
                        
                        {/* Date Filter Dropdown */}
                        <div className="relative z-10">
                          <button
                            className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-700/50 transition-colors"
                          >
                            <FaFilter className="text-gray-400" />
                            <span>
                              {dateFilter === "all" && "All Time"}
                              {dateFilter === "today" && "Today"}
                              {dateFilter === "week" && "Past Week"}
                              {dateFilter === "month" && "Past Month"}
                            </span>
                          </button>
                          <div className="absolute mt-2 right-0 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-20">
                            <button
                              onClick={() => handleDateFilterChange("all")}
                              className={`block w-full text-left px-4 py-2 text-sm ${dateFilter === "all" ? "bg-purple-900/50 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                            >
                              All Time
                            </button>
                            <button
                              onClick={() => handleDateFilterChange("today")}
                              className={`block w-full text-left px-4 py-2 text-sm ${dateFilter === "today" ? "bg-purple-900/50 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                            >
                              Today
                            </button>
                            <button
                              onClick={() => handleDateFilterChange("week")}
                              className={`block w-full text-left px-4 py-2 text-sm ${dateFilter === "week" ? "bg-purple-900/50 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                            >
                              Past Week
                            </button>
                            <button
                              onClick={() => handleDateFilterChange("month")}
                              className={`block w-full text-left px-4 py-2 text-sm ${dateFilter === "month" ? "bg-purple-900/50 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                            >
                              Past Month
                            </button>
                          </div>
                        </div>
                        
                        {/* Export Button */}
                        <div className="relative">
                          <button
                            onClick={() => setShowExportOptions(!showExportOptions)}
                            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg px-4 py-2 text-sm flex items-center justify-center transition-colors"
                          >
                            <FaFileExport className="mr-2" />
                            Export Data
                          </button>
                          
                          {showExportOptions && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20 overflow-hidden"
                            >
                              <button
                                onClick={() => { exportToCSV(); setShowExportOptions(false); }}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export as CSV
                              </button>
                              <button
                                onClick={() => { exportToJSON(); setShowExportOptions(false); }}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Export as JSON
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  ) : error ? (
                    <div className="p-8 text-center">
                      <div className="inline-flex rounded-full bg-red-900/30 p-4 mb-4">
                        <FaExclamationTriangle className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-lg font-medium text-red-300 mb-2">Error Loading Data</h3>
                      <p className="text-gray-400 max-w-md mx-auto">{error}</p>
                    </div>
                  ) : filteredDownloads.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="inline-flex rounded-full bg-gray-800/50 p-4 mb-4">
                        <HiOutlineDatabase className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-300 mb-1">No matching records found</h3>
                      <p className="text-gray-500 max-w-sm mx-auto">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto" ref={tableRef}>
                        <table className="w-full">
                          <thead className="bg-gray-800/50">
                            <tr>
                              <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort('name')}
                              >
                                <div className="flex items-center">
                                  <span>Name</span>
                                  {sortConfig.key === 'name' && (
                                    sortConfig.direction === 'asc'
                                      ? <FaSortAmountUp className="ml-1 text-purple-400" />
                                      : <FaSortAmountDown className="ml-1 text-purple-400" />
                                  )}
                                </div>
                              </th>
                              <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort('email')}
                              >
                                <div className="flex items-center">
                                  <span>Email</span>
                                  {sortConfig.key === 'email' && (
                                    sortConfig.direction === 'asc'
                                      ? <FaSortAmountUp className="ml-1 text-purple-400" />
                                      : <FaSortAmountDown className="ml-1 text-purple-400" />
                                  )}
                                </div>
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Phone
                              </th>
                              <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort('downloadDate')}
                              >
                                <div className="flex items-center">
                                  <span>Date</span>
                                  {sortConfig.key === 'downloadDate' && (
                                    sortConfig.direction === 'asc'
                                      ? <FaSortAmountUp className="ml-1 text-purple-400" />
                                      : <FaSortAmountDown className="ml-1 text-purple-400" />
                                  )}
                                </div>
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Device
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {getCurrentPageData().map((download, index) => (
                              <motion.tr 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-gray-800/50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/70 to-pink-500/70 flex items-center justify-center text-white font-medium">
                                      {download.name ? download.name[0].toUpperCase() : "?"}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-white">{download.name || 'Unknown'}</div>
                                      <div className="text-xs text-gray-500">ID: {index + 1}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <HiOutlineMail className="text-purple-400 mr-2" />
                                    <div className="text-sm text-gray-300">{download.email}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <HiOutlineDeviceMobile className="text-gray-500 mr-2" />
                                    <div className="text-sm text-gray-400">{download.phone || 'N/A'}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                    <div className="text-sm text-gray-300">
                                      {formatDate(download.downloadDate || download.timestamp)}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${extractDeviceInfo(download.userAgent || '') === 'Mobile' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' :
                                    extractDeviceInfo(download.userAgent || '') === 'Desktop' ? 'bg-pink-900/50 text-pink-300 border border-pink-700/50' :
                                    extractDeviceInfo(download.userAgent || '') === 'Tablet' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' :
                                    'bg-gray-700/50 text-gray-300 border border-gray-600/50'}`}
                                  >
                                    {extractDeviceInfo(download.userAgent || '')}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => setSelectedDownload(download)}
                                      className="text-blue-400 hover:text-blue-300 transition-colors"
                                      title="View details"
                                    >
                                      <FaEye />
                                    </button>
                                    <button
                                      className="text-gray-400 hover:text-gray-300 transition-colors"
                                      title="More options"
                                    >
                                      <FaEllipsisV />
                                    </button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Pagination */}
                      <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
                        <div className="text-sm text-gray-400 mb-4 md:mb-0">
                          Showing <span className="font-medium text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                          <span className="font-medium text-white">
                            {Math.min(currentPage * itemsPerPage, filteredDownloads.length)}
                          </span>{" "}
                          of <span className="font-medium text-white">{filteredDownloads.length}</span> records
                        </div>
                        
                        <div className="flex items-center">
                          <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="mr-4 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                          >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                          </select>
                          
                          <nav className="flex space-x-1">
                            <button
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                              className={`px-3 py-1 rounded-lg ${
                                currentPage === 1
                                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                              }`}
                            >
                              <FaChevronLeft size={14} />
                            </button>
                            
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              const pageNum = currentPage <= 3
                                ? i + 1
                                : currentPage >= totalPages - 2
                                  ? totalPages - 4 + i
                                  : currentPage - 2 + i;
                              
                              if (pageNum <= 0 || pageNum > totalPages) return null;
                              
                              return (
                                <button
                                  key={i}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`px-3 py-1 rounded-lg ${
                                    currentPage === pageNum
                                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            
                            <button
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                              className={`px-3 py-1 rounded-lg ${
                                currentPage === totalPages
                                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                              }`}
                            >
                              <FaChevronRight size={14} />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Download Detail Modal */}
                <AnimatePresence>
                  {selectedDownload && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                      onClick={() => setSelectedDownload(null)}
                    >
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800/50 backdrop-blur-lg shadow-xl max-w-2xl w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                              {selectedDownload.name ? selectedDownload.name[0].toUpperCase() : "?"}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">{selectedDownload.name || 'Unknown User'}</h3>
                              <p className="text-gray-400">{selectedDownload.email}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedDownload(null)}
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                            <ul className="space-y-3">
                              <li className="flex items-center">
                                <HiOutlineMail className="text-purple-400 mr-3" />
                                <span className="text-white">{selectedDownload.email}</span>
                              </li>
                              <li className="flex items-center">
                                <HiOutlineDeviceMobile className="text-purple-400 mr-3" />
                                <span className="text-white">{selectedDownload.phone || 'Not provided'}</span>
                              </li>
                              <li className="flex items-center">
                                <HiOutlineLocationMarker className="text-purple-400 mr-3" />
                                <span className="text-white">Unknown Location</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Download Details</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <FaCalendarAlt className="text-pink-400 mr-3 mt-1" />
                                <div>
                                  <span className="text-white block">
                                    {formatDate(selectedDownload.downloadDate || selectedDownload.timestamp)}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    {new Date(selectedDownload.downloadDate || selectedDownload.timestamp).toLocaleTimeString()}
                                  </span>
                                </div>
                              </li>
                              <li className="flex items-center">
                                <FaLaptop className="text-pink-400 mr-3" />
                                <span className="text-white">
                                  {extractDeviceInfo(selectedDownload.userAgent || '')} - {extractBrowserInfo(selectedDownload.userAgent || '')}
                                </span>
                              </li>
                              <li className="flex items-center">
                                <HiOutlineDocumentReport className="text-pink-400 mr-3" />
                                <span className="text-white">Google Drive Download</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-800 pt-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-3">User Agent</h4>
                          <div className="bg-gray-800 rounded-lg p-3 overflow-x-auto">
                            <code className="text-xs text-gray-300 whitespace-pre-wrap">
                              {selectedDownload.userAgent || 'No user agent data'}
                            </code>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end space-x-3">
                          <button
                            onClick={() => setSelectedDownload(null)}
                            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                          >
                            Close
                          </button>
                          <button
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-colors"
                          >
                            Send Email
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-4">Download Trends</h3>
                    <div className="h-80">
                      {renderAreaChart()}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-6">Performance Metrics</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Download Conversion Rate</span>
                          <span className="text-white font-medium">68%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">User Retention</span>
                          <span className="text-white font-medium">42%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Form Completion Rate</span>
                          <span className="text-white font-medium">91%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '91%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Bounce Rate</span>
                          <span className="text-white font-medium">23%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-4">Device Distribution</h3>
                    {renderDeviceChart()}
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-4">Browser Statistics</h3>
                    
                    <div className="space-y-4">
                      {['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'].map((browser, index) => {
                        const percentage = [42, 28, 15, 10, 5][index];
                        return (
                          <div key={browser} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-3">
                              <div className="w-4 h-4 rounded-full" style={{
                                backgroundColor: ['#8b5cf6', '#3b82f6', '#ef4444', '#10b981', '#6b7280'][index]
                              }}></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-white">{browser}</span>
                                <span className="text-gray-400 text-sm">{percentage}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full" 
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: ['#8b5cf6', '#3b82f6', '#ef4444', '#10b981', '#6b7280'][index]
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-4">Time Distribution</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Peak Hours</span>
                        <span className="text-white">14:00 - 16:00</span>
                      </div>
                      
                      <div className="relative h-32">
                        <div className="absolute left-0 right-0 top-0 bottom-0">
                          {[...Array(24)].map((_, i) => (
                            <div key={i} className="absolute bottom-0 bg-purple-500/80 hover:bg-purple-400 transition-colors rounded-sm"
                              style={{
                                left: `${(i / 24) * 100}%`,
                                width: `${100 / 24}%`,
                                height: `${Math.sin((i / 24) * Math.PI * 2) * 50 + 20}%`,
                                opacity: 0.6 + Math.sin((i / 24) * Math.PI * 2) * 0.4
                              }}
                            >
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                                {i}:00
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500 pt-4">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>6 PM</span>
                        <span>12 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                  <h3 className="text-xl font-medium text-white mb-6">Monthly Analytics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <div className="relative h-64">
                        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                          {/* Grid lines */}
                          {[...Array(5)].map((_, i) => (
                            <line
                              key={`h-${i}`}
                              x1="0"
                              y1={40 * i}
                              x2="400"
                              y2={40 * i}
                              stroke="#374151"
                              strokeWidth="1"
                              strokeDasharray="5,5"
                            />
                          ))}
                          
                          {/* Months */}
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                            <text
                              key={`month-${i}`}
                              x={i * (400 / 12) + (400 / 24)}
                              y="215"
                              textAnchor="middle"
                              fontSize="12"
                              fill="#6B7280"
                            >
                              {month}
                            </text>
                          ))}
                          
                          {/* Downloads line */}
                          <path
                            d={`
                              M0,180
                              C20,160 40,150 60,140
                              S100,120 120,110
                              S160,90 180,85
                              S220,80 240,50
                              S280,30 300,40
                              S340,60 360,40
                              S380,20 400,30
                            `}
                            fill="none"
                            stroke="url(#purpleGradient)"
                            strokeWidth="3"
                          />
                          
                          {/* Users line */}
                          <path
                            d={`
                              M0,190
                              C20,180 40,170 60,160
                              S100,150 120,145
                              S160,140 180,120
                              S220,100 240,95
                              S280,80 300,90
                              S340,100 360,85
                              S380,70 400,75
                            `}
                            fill="none"
                            stroke="url(#blueGradient)"
                            strokeWidth="3"
                          />
                          
                          {/* Gradients */}
                          <defs>
                            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8B5CF6" />
                              <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      
                      <div className="flex justify-center items-center space-x-8 mt-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2"></div>
                          <span className="text-gray-400">Downloads</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-2"></div>
                          <span className="text-gray-400">Unique Users</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                        <div className="text-gray-400 text-sm mb-1">Total Downloads</div>
                        <div className="text-3xl font-bold text-white">{stats.totalDownloads}</div>
                        <div className="mt-3 flex items-center text-sm">
                          <span className="text-green-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z" clipRule="evenodd" />
                            </svg>
                            32% increase
                          </span>
                          <span className="text-gray-500 ml-2">from last month</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                        <div className="text-gray-400 text-sm mb-1">Avg. Downloads/Day</div>
                        <div className="text-3xl font-bold text-white">
                          {stats.dailyStats ? 
                            Math.round(stats.dailyStats.reduce((acc, day) => acc + day.count, 0) / stats.dailyStats.length) : 0}
                        </div>
                        <div className="mt-3 flex items-center text-sm">
                          <span className="text-green-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z" clipRule="evenodd" />
                            </svg>
                            18% increase
                          </span>
                          <span className="text-gray-500 ml-2">from last week</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                        <div className="text-gray-400 text-sm mb-1">User Retention</div>
                        <div className="text-3xl font-bold text-white">62%</div>
                        <div className="mt-3 flex items-center text-sm">
                          <span className="text-amber-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            No significant change
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "geo" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl overflow-hidden relative">
                    <h3 className="text-xl font-medium text-white mb-4">Geographic Distribution</h3>
                    
                    {/* Simple World Map Representation */}
                    <div className="relative h-[400px] w-full bg-gray-900 rounded-xl overflow-hidden">
                      {/* Map background with glow effects */}
                      <div className="absolute inset-0 bg-[url('/assets/world-map-dots.png')] bg-no-repeat bg-center bg-cover opacity-20"></div>
                      
                      {/* Animated glow spots for top countries */}
                      {locationData.slice(0, 5).map((location, index) => {
                        const positions = [
                          { top: '30%', left: '20%' },  // USA
                          { top: '40%', left: '70%' },  // India
                          { top: '25%', left: '45%' },  // UK
                          { top: '20%', left: '15%' },  // Canada
                          { top: '30%', left: '50%' },  // Germany
                        ];
                        return (
                          <motion.div
                            key={index}
                            className="absolute w-4 h-4 rounded-full"
                            style={{
                              ...positions[index],
                              backgroundImage: 'radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(236, 72, 153, 0.1) 70%, transparent 100%)'
                            }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 3,
                              delay: index * 0.5
                            }}
                          />
                        );
                      })}
                      
                      {/* Animated connection lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        {locationData.slice(0, 5).map((_, index) => {
                          const positions = [
                            { x1: '20%', y1: '30%' },  // USA
                            { x1: '70%', y1: '40%' },  // India
                            { x1: '45%', y1: '25%' },  // UK
                            { x1: '15%', y1: '20%' },  // Canada
                            { x1: '50%', y1: '30%' },  // Germany
                          ];
                          return (
                            <motion.line
                              key={index}
                              x1={positions[index].x1}
                              y1={positions[index].y1}
                              x2="50%"
                              y2="50%"
                              stroke="url(#lineGradient)"
                              strokeWidth="1"
                              strokeDasharray="3,3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.2, 0.5, 0.2] }}
                              transition={{
                                repeat: Infinity,
                                duration: 4,
                                delay: index * 0.3
                              }}
                            />
                          );
                        })}
                        <defs>
                          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Central Hub */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center z-10"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(147, 51, 234, 0.2)",
                            "0 0 0 15px rgba(147, 51, 234, 0)",
                            "0 0 0 0 rgba(147, 51, 234, 0)"
                          ]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 2
                        }}
                      >
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {[
                        { label: 'Total Countries', value: locationData.length },
                        { label: 'Top Country', value: locationData[0]?.country || 'N/A' },
                        { label: 'New Regions Today', value: '3' },
                        { label: 'Growth Markets', value: '5' }
                      ].map((stat, index) => (
                        <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-xs">{stat.label}</div>
                          <div className="text-xl font-bold text-white mt-1">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-6 flex items-center">
                      <FaGlobe className="mr-2 text-purple-400" />
                      Top Countries
                    </h3>
                    
                    {renderLocationList()}
                    
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">View distribution</span>
                        <div className="flex space-x-1">
                          <button className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors">
                            <FaListUl className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 bg-purple-800/50 rounded text-purple-300 border border-purple-700/50">
                            <FaChartBar className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors">
                            <FaGlobe className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-6">Region Comparison</h3>
                    
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium">
                        Global
                      </button>
                      <button className="py-2 px-4 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                        Americas
                      </button>
                      <button className="py-2 px-4 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                        Europe
                      </button>
                      <button className="py-2 px-4 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                        Asia
                      </button>
                      <button className="py-2 px-4 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                        Africa
                      </button>
                      <button className="py-2 px-4 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                        Oceania
                      </button>
                    </div>
                    
                    <div className="relative h-64">
                    <svg className="w-full h-full" viewBox="0 0 400 240">
                        <defs>
                          <linearGradient id="regionGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#9333EA" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#9333EA" stopOpacity="0.1" />
                          </linearGradient>
                          <linearGradient id="regionGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
                          </linearGradient>
                          <linearGradient id="regionGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                        
                        {/* Grid lines */}
                        {[...Array(6)].map((_, i) => (
                          <line
                            key={`h-${i}`}
                            x1="40"
                            y1={40 * i}
                            x2="400"
                            y2={40 * i}
                            stroke="#374151"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                          />
                        ))}
                        
                        {/* Y-axis labels */}
                        {[...Array(6)].map((_, i) => (
                          <text
                            key={`y-${i}`}
                            x="30"
                            y={240 - (i * 40)}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fill="#6B7280"
                            fontSize="12"
                          >
                            {i * 20}%
                          </text>
                        ))}
                        
                        {/* Bar groups */}
                        {['North Am.', 'Europe', 'Asia', 'South Am.', 'Africa'].map((region, i) => (
                          <g key={region} transform={`translate(${60 + i * 70}, 0)`}>
                            {/* First bar in group */}
                            <rect
                              x="0"
                              y={240 - (Math.random() * 100 + 30)}
                              width="15"
                              height={(Math.random() * 100 + 30)}
                              fill="url(#regionGradient1)"
                              rx="2"
                            />
                            
                            {/* Second bar in group */}
                            <rect
                              x="18"
                              y={240 - (Math.random() * 80 + 20)}
                              width="15"
                              height={(Math.random() * 80 + 20)}
                              fill="url(#regionGradient2)"
                              rx="2"
                            />
                            
                            {/* Third bar in group */}
                            <rect
                              x="36"
                              y={240 - (Math.random() * 60 + 10)}
                              width="15"
                              height={(Math.random() * 60 + 10)}
                              fill="url(#regionGradient3)"
                              rx="2"
                            />
                            
                            {/* X-axis label */}
                            <text
                              x="18"
                              y="255"
                              textAnchor="middle"
                              fill="#6B7280"
                              fontSize="12"
                            >
                              {region}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                    
                    <div className="flex justify-center space-x-8 mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-gray-400">Downloads</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                        <span className="text-gray-400">Users</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-400">Sessions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 backdrop-blur-lg shadow-xl">
                    <h3 className="text-xl font-medium text-white mb-6">Local Time Distribution</h3>
                    
                    <div className="relative h-64">
                      <div className="absolute inset-0 flex flex-col justify-between">
                        <div className="h-px bg-gray-800 w-full"></div>
                        <div className="h-px bg-gray-800 w-full"></div>
                        <div className="h-px bg-gray-800 w-full"></div>
                        <div className="h-px bg-gray-800 w-full"></div>
                      </div>
                      
                      <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 24 100" preserveAspectRatio="none">
                          <path
                            d="M0,80 C1,75 2,65 3,55 C4,45 5,40 6,45 C7,50 8,60 9,65 C10,70 11,60 12,50 C13,40 14,35 15,30 C16,25 17,30 18,40 C19,50 20,70 21,85 C22,100 23,95 24,80"
                            fill="none"
                            stroke="url(#timeGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="timeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#9333EA" />
                              <stop offset="50%" stopColor="#EC4899" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>23:59</span>
                      </div>
                      
                      <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                      </div>
                      
                      {/* Highlight points */}
                      {[
                        { x: '12.5%', y: '45%', time: '03:00', value: '55%' },
                        { x: '50%', y: '30%', time: '12:00', value: '70%' },
                        { x: '87.5%', y: '20%', time: '21:00', value: '80%' }
                      ].map((point, i) => (
                        <div
                          key={i}
                          className="absolute w-3 h-3 rounded-full bg-white border-2 border-purple-500"
                          style={{ left: point.x, top: point.y }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-700">
                            <div className="font-medium">{point.time}</div>
                            <div className="text-gray-400">{point.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">Peak time: 21:00 - 22:00 (UTC)</div>
                        <div className="text-sm font-medium text-purple-400">
                          Current time: {new Date().toISOString().split('T')[0]} {new Date().toISOString().split('T')[1].substring(0, 8)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Head>
        <title>Ginie AI - Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        {!isAuthenticated ? renderLoginForm() : renderDashboard()}
      </div>
    </div>
  );
}