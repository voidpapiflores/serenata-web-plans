
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface KitDetailsPageProps {
  onProceed: () => void;
  onBack: () => void;
}

const KitDetailsPage: React.FC<KitDetailsPageProps> = ({ onProceed, onBack }) => {
  return (
    <div className="min-h-screen bg-almost-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 bg-transparent border-gray-blue text-sky-soft hover:bg-blue-deep/20"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Volver a Planes
          </Button>
          <h1 className="text-4xl font-bold text-center text-sky-soft mb-8">
            Kit Completo de Instalación
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Componentes del Kit */}
          <Card className="bg-blue-deep/20 border-gray-blue/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-sky-soft">
                Componentes del Kit
              </CardTitle>
              <CardDescription className="text-gray-blue">
                Todo lo que necesitas para la instalación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">ESP32</span>
                  <span className="text-gray-blue">x1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Sensor de Temperatura</span>
                  <span className="text-gray-blue">x1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Sensor de Humedad</span>
                  <span className="text-gray-blue">x1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Módulo L298N</span>
                  <span className="text-gray-blue">x1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Módulo Relé</span>
                  <span className="text-gray-blue">x1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Tubos PVC</span>
                  <span className="text-gray-blue">Kit completo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Ventiladores</span>
                  <span className="text-gray-blue">Kit completo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Termoventiladores</span>
                  <span className="text-gray-blue">Kit completo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-almost-black/50 rounded-lg">
                  <span className="text-sky-soft">Fuente de Voltaje</span>
                  <span className="text-gray-blue">x1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Servicio de Instalación y Costos */}
          <Card className="bg-blue-deep/20 border-gray-blue/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-sky-soft">
                Servicio de Instalación
              </CardTitle>
              <CardDescription className="text-gray-blue">
                Instalación profesional incluida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-sky-soft">Servicios Incluidos:</h3>
                  <ul className="space-y-2 text-gray-blue">
                    <li>• Instalación completa del sistema</li>
                    <li>• Configuración y calibración</li>
                    <li>• Pruebas de funcionamiento</li>
                    <li>• Capacitación básica de uso</li>
                    <li>• Garantía de instalación (1 año)</li>
                  </ul>
                </div>

                <div className="border-t border-gray-blue/30 pt-4">
                  <h3 className="text-lg font-semibold text-sky-soft mb-3">Costos:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-blue">Kit Completo:</span>
                      <span className="text-sky-soft font-semibold">1,210 Bs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-blue">Instalación:</span>
                      <span className="text-sky-soft font-semibold">200 Bs</span>
                    </div>
                    <div className="border-t border-gray-blue/30 pt-2">
                      <div className="flex justify-between">
                        <span className="text-sky-soft font-bold">Total:</span>
                        <span className="text-sky-soft font-bold text-xl">1,410 Bs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onProceed}
                  className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft"
                >
                  Continuar con la Compra
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KitDetailsPage;
