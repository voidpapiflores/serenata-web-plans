
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface PlansPageProps {
  onSelectSubscription: () => void;
  onSelectKit: () => void;
  onBack: () => void;
}

const PlansPage: React.FC<PlansPageProps> = ({ onSelectSubscription, onSelectKit, onBack }) => {
  return (
    <div className="min-h-screen bg-almost-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 bg-transparent border-gray-blue text-sky-soft hover:bg-blue-deep/20"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-4xl font-bold text-center text-sky-soft mb-2">
            Elige tu Plan
          </h1>
          <p className="text-center text-gray-blue mb-8">
            Selecciona la opción que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Planes de Suscripción */}
          <Card className="bg-blue-deep/20 border-gray-blue/30 hover:border-sky-soft/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-soft/10">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-sky-soft mb-2">
                Planes de Suscripción
              </CardTitle>
              <CardDescription className="text-gray-blue">
                Servicios continuos con beneficios exclusivos
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-gray-blue/10 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-blue/30">
                <p className="text-gray-blue text-center">
                  Espacio para imagen de suscripción
                </p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Servicios mensuales</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Soporte prioritario</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Actualizaciones automáticas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Descuentos exclusivos</span>
                </div>
              </div>
              <Button
                onClick={onSelectSubscription}
                className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft"
              >
                Ver Planes de Suscripción
              </Button>
            </CardContent>
          </Card>

          {/* Planes de Compra de Kit */}
          <Card className="bg-blue-deep/20 border-gray-blue/30 hover:border-sky-soft/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-soft/10">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-sky-soft mb-2">
                Planes de Compra de Kit
              </CardTitle>
              <CardDescription className="text-gray-blue">
                Productos físicos con instalación incluida
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-gray-blue/10 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-blue/30">
                <p className="text-gray-blue text-center">
                  Espacio para imagen de kit
                </p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Kit completo incluido</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Servicio de instalación</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Garantía extendida</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-soft">✓ Mantenimiento inicial</span>
                </div>
              </div>
              <Button
                onClick={onSelectKit}
                className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft"
              >
                Ver Kits Disponibles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
