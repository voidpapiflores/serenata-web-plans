
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface MonitoringPageProps {
  onBack: () => void;
}

declare global {
  interface Window {
    Chart: any;
  }
}

const MonitoringPage: React.FC<MonitoringPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [chartLoaded, setChartLoaded] = useState(false);
  const gaugesRef = useRef<{[key: string]: any}>({});
  const linechartsRef = useRef<{[key: string]: any}>({});
  const pieChartsRef = useRef<{pieChart1?: any, pieChart2?: any}>({});

  useEffect(() => {
    // Cargar Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
      setChartLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (chartLoaded && window.Chart) {
      initCharts();
      initPieCharts();
      
      const interval = setInterval(() => {
        updateCharts();
        updatePieCharts();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [chartLoaded]);

  const randomTemp = () => {
    return (Math.random() * 40).toFixed(1);
  };

  const randomLineData = (points = 20) => {
    const data = [];
    for (let i = 0; i < points; i++) {
      data.push((Math.random() * 40).toFixed(1));
    }
    return data;
  };

  const randomPieData = () => {
    let a = Math.random() * 100;
    let b = Math.random() * (100 - a);
    let c = 100 - a - b;
    return [a.toFixed(1), b.toFixed(1), c.toFixed(1)];
  };

  const createGauge = (ctx: any) => {
    return new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Temperatura', 'Resto'],
        datasets: [{
          data: [0, 100],
          backgroundColor: ['#4466ff', '#ddd'],
          borderWidth: 0
        }]
      },
      options: {
        circumference: 180,
        rotation: 270,
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  };

  const updateGauge = (chart: any, value: number) => {
    chart.data.datasets[0].data[0] = value;
    chart.data.datasets[0].data[1] = 100 - value;
    chart.update();
  };

  const createLineChart = (ctx: any) => {
    return new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 20 }, (_, i) => i + 1),
        datasets: [{
          label: 'Temperatura',
          data: randomLineData(),
          borderColor: '#4466ff',
          backgroundColor: '#aac7ff77',
          fill: true,
          tension: 0.3,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { min: 0, max: 40 } },
        plugins: { legend: { display: false } },
        animation: false
      }
    });
  };

  const initCharts = () => {
    for (let c = 1; c <= 4; c++) {
      for (let s = 1; s <= 5; s++) {
        const canvas = document.getElementById(`gauge-${c}-${s}`) as HTMLCanvasElement;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            gaugesRef.current[`${c}-${s}`] = createGauge(ctx);
          }
        }
      }
      for (let p = 1; p <= 5; p++) {
        const canvas = document.getElementById(`linechart-${c}-${p}`) as HTMLCanvasElement;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            linechartsRef.current[`${c}-${p}`] = createLineChart(ctx);
          }
        }
      }
    }
  };

  const initPieCharts = () => {
    const ctx1 = (document.getElementById("pieChart1") as HTMLCanvasElement)?.getContext("2d");
    const ctx2 = (document.getElementById("pieChart2") as HTMLCanvasElement)?.getContext("2d");

    if (ctx1) {
      pieChartsRef.current.pieChart1 = new window.Chart(ctx1, {
        type: 'pie',
        data: {
          labels: ['Baterias', 'Energia de consumo', 'modo sleep'],
          datasets: [{
            data: randomPieData(),
            backgroundColor: ['#f39c12', '#27ae60', '#2980b9'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: true }
          }
        }
      });
    }

    if (ctx2) {
      pieChartsRef.current.pieChart2 = new window.Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['Motores Activos', 'Motores Inactivos', 'funcionamiento manual'],
          datasets: [{
            data: randomPieData(),
            backgroundColor: ['#27ae60', '#c0392b', '#f39c12'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: true }
          }
        }
      });
    }
  };

  const updateCharts = () => {
    Object.values(gaugesRef.current).forEach(chart => {
      const val = Math.random() * 100;
      updateGauge(chart, val);
    });

    Object.values(linechartsRef.current).forEach(chart => {
      chart.data.datasets[0].data = randomLineData();
      chart.update();
    });
  };

  const updatePieCharts = () => {
    if (pieChartsRef.current.pieChart1) {
      pieChartsRef.current.pieChart1.data.datasets[0].data = randomPieData();
      pieChartsRef.current.pieChart1.update();
    }

    if (pieChartsRef.current.pieChart2) {
      pieChartsRef.current.pieChart2.data.datasets[0].data = randomPieData();
      pieChartsRef.current.pieChart2.update();
    }
  };

  const handleMotorToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const isOff = btn.textContent === "Apagar";
    btn.textContent = isOff ? "Encender" : "Apagar";
    btn.className = isOff 
      ? "w-full px-4 py-2 rounded-lg font-bold cursor-pointer bg-gray-500 text-white mt-2"
      : "w-full px-4 py-2 rounded-lg font-bold cursor-pointer bg-blue-600 text-white mt-2";
  };

  const periodNames = [
    'Agua consumida por Dia',
    'Consumo de agua por semana', 
    'pH de agua semanal',
    'suministro externo de agua',
    'control de pH'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            Monitoreo de Forraje Hidropónico
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 flex-wrap gap-2">
          {[1, 2, 3, 4].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toString())}
              className={`px-6 py-3 rounded-t-lg font-bold cursor-pointer ${
                activeTab === tab.toString()
                  ? 'bg-white text-blue-600 border-b-4 border-blue-600'
                  : 'bg-blue-600 text-white'
              }`}
            >
              Camara {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {[1, 2, 3, 4].map((camera) => (
          <div
            key={camera}
            className={`bg-white rounded-lg p-6 shadow-lg ${
              activeTab === camera.toString() ? 'block' : 'hidden'
            }`}
          >
            {/* Motores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((motor) => (
                <div key={motor} className="bg-blue-50 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    Control de riego automatico {motor}
                  </h3>
                  <button
                    onClick={handleMotorToggle}
                    className="w-full px-4 py-2 rounded-lg font-bold cursor-pointer bg-blue-600 text-white"
                  >
                    Apagar
                  </button>
                </div>
              ))}
            </div>

            {/* Sensores */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {[1, 2, 3, 4, 5].map((sensor) => (
                <div key={sensor} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-2">
                    <canvas
                      id={`gauge-${camera}-${sensor}`}
                      className="w-full h-full"
                    ></canvas>
                  </div>
                  <p className="text-sm text-gray-700">Sensor de temperatura {sensor}</p>
                </div>
              ))}
            </div>

            {/* Gráficos de línea */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {periodNames.map((name, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-center text-blue-600 font-semibold mb-3">{name}</h4>
                  <div className="h-48">
                    <canvas
                      id={`linechart-${camera}-${index + 1}`}
                      className="w-full h-full"
                    ></canvas>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Gráficos de torta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Distribución Energía</h3>
            <div className="h-64">
              <canvas id="pieChart1" className="w-full h-full"></canvas>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Estado Motores</h3>
            <div className="h-64">
              <canvas id="pieChart2" className="w-full h-full"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
