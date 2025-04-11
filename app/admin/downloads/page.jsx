"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

export default function DownloadsAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [downloads, setDownloads] = useState([]);
  const [stats, setStats] = useState({ totalDownloads: 0, dailyStats: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
        await fetchStats();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Failed to authenticate");
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
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };
  
  // Export download data as CSV
  const exportToCSV = () => {
    if (!downloads.length) return;
    
    const headers = ["Name", "Email", "Phone", "Download Date"];
    const csvData = downloads.map(d => 
      [
        d.name || "",
        d.email || "",
        d.phone || "N/A", 
        new Date(d.downloadDate || d.timestamp).toLocaleString()
      ].map(field => `"${field.replace(/"/g, '""')}"`).join(',')
    );
    
    const csv = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ginie_ai_downloads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  
  // Render chart for daily downloads
  const renderChart = () => {
    if (!stats.dailyStats || stats.dailyStats.length === 0) {
      return <p className="text-gray-400 text-center py-8">No daily statistics available</p>;
    }
    
    const maxCount = Math.max(...stats.dailyStats.map(s => s.count));
    const barHeight = 200; // Max height for bars in pixels
    
    return (
      <div className="mt-6 p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Downloads Last 7 Days</h3>
        <div className="flex items-end justify-around h-[230px] pt-6">
          {stats.dailyStats.map((day, i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className="w-12 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md relative group"
                style={{ height: `${(day.count / maxCount) * barHeight}px`, minHeight: '20px' }}
              >
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                  {day.count} download{day.count !== 1 ? 's' : ''}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2 rotate-45 origin-left">
                {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Head>
        <title>Ginie AI - Admin Downloads</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="container mx-auto px-4 py-12">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
            
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg shadow-lg transition-all disabled:opacity-70"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
              
              <Link 
                href="/"
                className="w-full mt-4 block text-center border border-gray-700 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-all"
              >
                Back to Home
              </Link>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 md:mb-0">
                Download Records
              </h1>
              
              <div className="flex space-x-3">
                <button
                  onClick={exportToCSV}
                  disabled={downloads.length === 0}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export CSV
                </button>
                
                <Link 
                  href="/"
                  className="border border-gray-700 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
            
            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm mb-2">Total Downloads</h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {stats.totalDownloads}
                </p>
              </div>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm mb-2">Last 24 Hours</h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  {stats.dailyStats && stats.dailyStats.length > 0 ? 
                    stats.dailyStats[stats.dailyStats.length - 1].count : 0}
                </p>
              </div>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm mb-2">Unique Emails</h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {new Set(downloads.map(d => d.email)).size}
                </p>
              </div>
            </div>
            
            {/* Chart */}
            {renderChart()}
            
            {/* Downloads table */}
            {isLoading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="p-6 bg-red-500/20 border border-red-500/40 rounded-xl text-center">
                <p className="text-red-200">{error}</p>
              </div>
            ) : downloads.length === 0 ? (
              <div className="p-12 bg-gray-900 border border-gray-800 rounded-xl text-center mt-8">
                <p className="text-xl text-gray-400">No downloads recorded yet.</p>
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Download Date</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Browser</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {downloads.map((download, index) => (
                        <tr key={index} className="hover:bg-gray-800/50">
                          <td className="px-6 py-4 text-sm text-white">{download.name}</td>
                          <td className="px-6 py-4 text-sm text-white">{download.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{download.phone || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {new Date(download.downloadDate || download.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {download.userAgent ? download.userAgent.substring(0, 50) + '...' : 'Unknown'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 bg-gray-900 border-t border-gray-800">
                  <p className="text-gray-400 text-sm">
                    Showing <span className="font-semibold text-white">{downloads.length}</span> download records
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}