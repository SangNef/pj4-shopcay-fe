import React, { useEffect, useState } from 'react';
import { getTotalBuy, getTotalOrders, getTotalRent, getTotalRevenue } from '../../api/dashboard';
import { ShoppingCart, AttachMoney, Storefront, Home } from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';  // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components of Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBuyOrders, setTotalBuyOrders] = useState(0);
  const [totalRentOrders, setTotalRentOrders] = useState(0);

  const fetchDashboardData = async () => {
    const totalOrderRes = await getTotalOrders();
    const totalRevenueRes = await getTotalRevenue();
    const totalBuyRes = await getTotalBuy();
    const totalRentRes = await getTotalRent();

    setTotalOrders(totalOrderRes);
    setTotalRevenue(totalRevenueRes);
    setTotalBuyOrders(totalBuyRes);
    setTotalRentOrders(totalRentRes);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Data for the charts
  const orderRevenueData = {
    labels: ['Total Orders', 'Total Revenue'],
    datasets: [
      {
        label: 'Total Orders',
        data: [totalOrders, 0],  // Orders with 0 for revenue
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        yAxisID: 'y1', // Axis for orders
      },
      {
        label: 'Total Revenue',
        data: [0, totalRevenue],  // Revenue with 0 for orders
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        yAxisID: 'y2', // Axis for revenue
      },
    ],
  };

  const options = {
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
      },
      y2: {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false, // Hide grid lines for the second axis
        },
      },
    },
  };

  const buyRentData = {
    labels: ['Total Buy Orders', 'Total Rent Orders'], // Labels for buy and rent orders
    datasets: [
      {
        label: 'Buy vs Rent Orders',
        data: [totalBuyOrders, totalRentOrders], // Data for buy and rent orders
        backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    document.title = 'AlaZea - Dashboard';
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Total Orders</h2>
          <div className="flex gap-4 justify-start items-center">
            <ShoppingCart className="text-blue-500 w-8 h-8" />
            <p className="text-2xl font-bold text-blue-500">{totalOrders}</p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Total Revenue</h2>
          <div className="flex gap-4 justify-start items-center">
            <AttachMoney className="text-green-500 w-8 h-8" />
            <p className="text-2xl font-bold text-green-500">{totalRevenue}</p>
          </div>
        </div>

        {/* Total Buy Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Total Buy Orders</h2>
          <div className="flex gap-4 justify-start items-center">
            <Storefront className="text-yellow-500 w-8 h-8" />
            <p className="text-2xl font-bold text-yellow-500">{totalBuyOrders}</p>
          </div>
        </div>

        {/* Total Rent Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Total Rent Orders</h2>
          <div className="flex gap-4 justify-start items-center">
            <Home className="text-purple-500 w-8 h-8" />
            <p className="text-2xl font-bold text-purple-500">{totalRentOrders}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Order vs Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Order vs Revenue</h2>
          <Bar data={orderRevenueData} options={options} />
        </div>

        {/* Buy vs Rent Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Buy vs Rent Orders</h2>
          <Bar data={buyRentData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
