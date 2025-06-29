
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MonitoringPageProps {
  onBack: () => void;
}

interface InvernaderoData {
  id: number;
  nombre: string;
  latestData?: {
    temperaturainput: string | null;
    humedadinput: number | null;
    motor1pwm: number | null;
    motor2pwm: number | null;
    altura: string | null;
    ph: string | null;
    t: string | null;
  };
  historicalData?: Array<{
    temperaturainput: string | null;
    humedadinput: number | null;
    altura: string | null;
    ph: string | null;
    t: string | null;
  }>;
}

declare global {
  interface Window {
    Chart: any;
  }
}

const MonitoringPage: React.FC<MonitoringPageProps> = ({ onBack }) => {
  const [invernaderos, setInvernaderos] = useState<InvernaderoData[]>([]);
  const [activeTab, setActiveTab] = useState('0');
  const [chartLoaded, setChartLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const gaugesRef = useRef<{[key: string]: any}>({});
  const linechartsRef = useRef<{[key: string]: any}>({});
  const scatterChartsRef = useRef<{[key: string]: any}>({});
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
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    fetchInvernaderos();
  }, []);

  useEffect(() => {
    if (chartLoaded && invernaderos.length > 0) {
      setTimeout(() => {
        initCharts();
        initPieCharts();
      }, 100);
    }
  }, [chartLoaded, invernaderos]);

  const fetchInvernaderos = async () => {
    try {
      // Obtener invernaderos de la tabla inv
      const { data: invData, error: invError } = await supabase
        .from('inv')
        .select('*');

      if (invError) throw invError;

      if (invData) {
        const invernaderosList: InvernaderoData[] = invData.map((inv) => ({
          id: inv.id,
          nombre: inv.nombre || `Invernadero ${inv.id}`
        }));

        // Para cada invernadero, obtener los datos más recientes de la tabla dat
        for (const invernadero of invernaderosList) {
          const { data: latestData, error: latestError } = await supabase
            .from('dat')
            .select('*')
            .eq('nombre', invernadero.id)
            .order('t', { ascending: false })
            .limit(1);

          if (!latestError && latestData && latestData.length > 0) {
            invernadero.latestData = latestData[0];
          }

          // Obtener datos históricos para gráficas
          const { data: historicalData, error: historicalError } = await supabase
            .from('dat')
            .select('*')
            .eq('nombre', invernadero.id)
            .order('t', { ascending: true })
            .limit(50);

          if (!historicalError && historicalData) {
            invernadero.historicalData = historicalData;
          }
        }

        setInvernaderos(invernaderosList);
        if (invernaderosList.length > 0) {
          setActiveTab('0');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGauge = (ctx: any, value: number, max: number, label: string, unit: string = '') => {
    const percentage = Math.min((value / max) * 100, 100);
    let color = '#4ade80'; // green
    if (percentage > 80) color = '#ef4444'; // red
    else if (percentage > 60) color = '#f59e0b'; // yellow

    return new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [label, ''],
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: [color, '#e5e7eb'],
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
      },
      plugins: [{
        afterDraw: function(chart: any) {
          const ctx = chart.ctx;
          const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
          const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2 + 20;
          
          ctx.fillStyle = '#374151';
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${value.toFixed(1)}${unit}`, centerX, centerY);
        }
      }]
    });
  };

  const createScatterChart = (ctx: any, data: any[], xKey: string, yKey: string, title: string) => {
    const chartData = data.map(item => ({
      x: parseFloat(item[xKey]) || 0,
      y: parseFloat(item[yKey]) || 0
    })).filter(point => !isNaN(point.x) && !isNaN(point.y));

    return new window.Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: title,
          data: chartData,
          backgroundColor: '#3b82f6',
          borderColor: '#1d4ed8',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title
          },
          legend: { display: false }
        },
        scales: {
          x: { 
            title: { display: true, text: xKey }
          },
          y: { 
            title: { display: true, text: yKey }
          }
        }
      }
    });
  };

  const createLineChart = (ctx: any, data: any[], xKey: string, yKey: string, title: string) => {
    const sortedData = data.sort((a, b) => new Date(a[xKey]).getTime() - new Date(b[xKey]).getTime());
    const chartData = sortedData.map(item => ({
      x: item[xKey],
      y: parseFloat(item[yKey]) || 0
    }));

    return new window.Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: title,
          data: chartData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title
          },
          legend: { display: false }
        },
        scales: {
          x: { 
            type: 'time',
            time: {
              displayFormats: {
                day: 'MMM DD'
              }
            },
            title: { display: true, text: 'Tiempo' }
          },
          y: { 
            title: { display: true, text: yKey }
          }
        }
      }
    });
  };

  const initCharts = () => {
    invernaderos.forEach((invernadero, index) => {
      const data = invernadero.latestData;
      const historical = invernadero.historicalData || [];

      if (data) {
        // Gauges
        const tempCanvas = document.getElementById(`temp-gauge-${index}`) as HTMLCanvasElement;
        if (tempCanvas) {
          const ctx = tempCanvas.getContext('2d');
          if (ctx) {
            gaugesRef.current[`temp-${index}`] = createGauge(
              ctx, 
              parseFloat(data.temperaturainput || '0'), 
              50, 
              'Temperatura', 
              '°C'
            );
          }
        }

        const humCanvas = document.getElementById(`hum-gauge-${index}`) as HTMLCanvasElement;
        if (humCanvas) {
          const ctx = humCanvas.getContext('2d');
          if (ctx) {
            gaugesRef.current[`hum-${index}`] = createGauge(
              ctx, 
              data.humedadinput || 0, 
              100, 
              'Humedad', 
              '%'
            );
          }
        }

        const phCanvas = document.getElementById(`ph-gauge-${index}`) as HTMLCanvasElement;
        if (phCanvas) {
          const ctx = phCanvas.getContext('2d');
          if (ctx) {
            gaugesRef.current[`ph-${index}`] = createGauge(
              ctx, 
              parseFloat(data.ph || '7'), 
              14, 
              'pH', 
              ''
            );
          }
        }

        const altCanvas = document.getElementById(`alt-gauge-${index}`) as HTMLCanvasElement;
        if (altCanvas) {
          const ctx = altCanvas.getContext('2d');
          if (ctx) {
            gaugesRef.current[`alt-${index}`] = createGauge(
              ctx, 
              parseFloat(data.altura || '0'), 
              100, 
              'Altura', 
              'cm'
            );
          }
        }
      }

      // Scatter charts
      if (historical.length > 0) {
        const scatter1Canvas = document.getElementById(`scatter1-${index}`) as HTMLCanvasElement;
        if (scatter1Canvas) {
          const ctx = scatter1Canvas.getContext('2d');
          if (ctx) {
            scatterChartsRef.current[`scatter1-${index}`] = createScatterChart(
              ctx, 
              historical, 
              'humedadinput', 
              'temperaturainput', 
              'Humedad vs Temperatura'
            );
          }
        }

        const scatter2Canvas = document.getElementById(`scatter2-${index}`) as HTMLCanvasElement;
        if (scatter2Canvas) {
          const ctx = scatter2Canvas.getContext('2d');
          if (ctx) {
            scatterChartsRef.current[`scatter2-${index}`] = createScatterChart(
              ctx, 
              historical, 
              'altura', 
              'ph', 
              'Altura vs pH'
            );
          }
        }

        const line1Canvas = document.getElementById(`line1-${index}`) as HTMLCanvasElement;
        if (line1Canvas) {
          const ctx = line1Canvas.getContext('2d');
          if (ctx) {
            linechartsRef.current[`line1-${index}`] = createLineChart(
              ctx, 
              historical, 
              't', 
              'ph', 
              'pH vs Tiempo'
            );
          }
        }
      }
    });
  };

  const initPieCharts = () => {
    const ctx1 = (document.getElementById("pieChart1") as HTMLCanvasElement)?.getContext("2d");
    const ctx2 = (document.getElementById("pieChart2") as HTMLCanvasElement)?.getContext("2d");

    if (ctx1) {
      pieChartsRef.current.pieChart1 = new window.Chart(ctx1, {
        type: 'pie',
        data: {
          labels: ['Baterías', 'Energía de consumo', 'Modo sleep'],
          datasets: [{
            data: [45.2, 32.8, 22.0],
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
          labels: ['Motores Activos', 'Motores Inactivos', 'Funcionamiento manual'],
          datasets: [{
            data: [65.5, 25.3, 9.2],
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

  const calculateDaysGrowth = (timestamp: string | null) => {
    if (!timestamp) return 0;
    const startDate = new Date(timestamp);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-800 text-lg">Cargando datos de invernaderos...</p>
        </div>
      </div>
    );
  }

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

        {invernaderos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-blue-800 text-lg">No se encontraron invernaderos en la base de datos.</p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {invernaderos.map((invernadero, index) => (
                <TabsTrigger 
                  key={index} 
                  value={index.toString()}
                  className="text-sm font-medium"
                >
                  {invernadero.nombre}
                </TabsTrigger>
              ))}
            </TabsList>

            {invernaderos.map((invernadero, index) => (
              <TabsContent key={index} value={index.toString()}>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  {/* Indicadores LED de Motores */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">Motor 1</h3>
                      <div className="flex items-center justify-center space-x-2">
                        <div 
                          className={`w-6 h-6 rounded-full ${
                            (invernadero.latestData?.motor1pwm || 0) > 0 
                              ? 'bg-green-500 shadow-lg shadow-green-300' 
                              : 'bg-gray-400'
                          }`}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {(invernadero.latestData?.motor1pwm || 0) > 0 ? 'Encendido' : 'Apagado'}
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">Motor 2</h3>
                      <div className="flex items-center justify-center space-x-2">
                        <div 
                          className={`w-6 h-6 rounded-full ${
                            (invernadero.latestData?.motor2pwm || 0) > 0 
                              ? 'bg-green-500 shadow-lg shadow-green-300' 
                              : 'bg-gray-400'
                          }`}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {(invernadero.latestData?.motor2pwm || 0) > 0 ? 'Encendido' : 'Apagado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contador de días de crecimiento */}
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg mb-8 text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Días de Crecimiento</h3>
                    <div className="text-4xl font-bold text-green-600">
                      {calculateDaysGrowth(invernadero.latestData?.t || null)}
                    </div>
                    <p className="text-green-700 mt-2">días desde el inicio</p>
                  </div>

                  {/* Gauges */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <h4 className="text-sm font-semibold text-blue-600 mb-2">Temperatura</h4>
                      <div className="w-32 h-32 mx-auto">
                        <canvas id={`temp-gauge-${index}`} className="w-full h-full"></canvas>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-semibold text-blue-600 mb-2">Humedad</h4>
                      <div className="w-32 h-32 mx-auto">
                        <canvas id={`hum-gauge-${index}`} className="w-full h-full"></canvas>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-semibold text-blue-600 mb-2">pH</h4>
                      <div className="w-32 h-32 mx-auto">
                        <canvas id={`ph-gauge-${index}`} className="w-full h-full"></canvas>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-semibold text-blue-600 mb-2">Altura</h4>
                      <div className="w-32 h-32 mx-auto">
                        <canvas id={`alt-gauge-${index}`} className="w-full h-full"></canvas>
                      </div>
                    </div>
                  </div>

                  {/* Gráficas de dispersión y línea */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="h-64">
                        <canvas id={`scatter1-${index}`} className="w-full h-full"></canvas>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="h-64">
                        <canvas id={`scatter2-${index}`} className="w-full h-full"></canvas>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="h-64">
                        <canvas id={`line1-${index}`} className="w-full h-full"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

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
