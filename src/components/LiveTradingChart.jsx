import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RefreshCw, AlertCircle } from 'lucide-react';
import BinanceWebSocket from '../utils/binanceWebSocket';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LiveTradingChart = ({ symbol = 'BTCUSDT', interval = '1h' }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    prices: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const chartRef = useRef(null);

  // Map interval to Binance kline interval
  const getBinanceInterval = (interval) => {
    const map = {
      '1m': '1m',
      '5m': '5m',
      '15m': '15m',
      '1h': '1h',
      '4h': '4h',
      '1d': '1d',
      '1w': '1w',
      '1M': '1M',
    };
    return map[interval] || '1h';
  };

  // Fetch historical klines
  const fetchHistorical = async (symbol, interval) => {
    const binanceInterval = getBinanceInterval(interval);
    const limit = 100;
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${binanceInterval}&limit=${limit}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch historical data');
      const data = await res.json();

      const labels = data.map((item) => {
        const date = new Date(item[0]);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      });
      const prices = data.map((item) => parseFloat(item[4])); // closing price

      return { labels, prices };
    } catch (err) {
      throw err;
    }
  };

  // Load historical data and start WebSocket
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        const { labels, prices } = await fetchHistorical(symbol, interval);
        if (!isMounted) return;

        setChartData({ labels, prices });
        setLoading(false);
      } catch (err) {
        if (isMounted) {
          setError('Failed to load chart data');
          setLoading(false);
        }
      }
    };

    loadData();

    // WebSocket connection
    const wsSymbol = symbol.toLowerCase();
    const ws = new BinanceWebSocket(wsSymbol, (data) => {
      if (!isMounted) return;
      // data.close is the current price
      const newPrice = parseFloat(data.close);
      const newTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      setChartData((prev) => {
        const labels = [...prev.labels, newTime];
        const prices = [...prev.prices, newPrice];
        // Keep only last 100 points
        if (labels.length > 100) {
          labels.shift();
          prices.shift();
        }
        return { labels, prices };
      });
    });

    ws.connect();
    wsRef.current = ws;

    return () => {
      isMounted = false;
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, [symbol, interval]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `R$ ${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
      y: {
        grid: {
          color: 'rgba(200,200,200,0.2)',
        },
        ticks: {
          callback: (value) => `R$ ${value.toFixed(2)}`,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 6,
        hoverRadius: 4,
      },
      line: {
        tension: 0.3,
        borderWidth: 2,
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: symbol,
        data: chartData.prices,
        borderColor: '#3b82f6',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(59,130,246,0)';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(59,130,246,0.3)');
          gradient.addColorStop(1, 'rgba(59,130,246,0)');
          return gradient;
        },
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-2 text-gray-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Carregando gráfico...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center bg-red-50 rounded-xl">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700">{symbol}</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {interval}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500">Atualizado em tempo real</span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </div>
      <div className="h-64 relative">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default LiveTradingChart;