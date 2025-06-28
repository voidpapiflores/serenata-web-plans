
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface SubscriptionDetailsPageProps {
  onProceed: () => void;
  onBack: () => void;
}

const SubscriptionDetailsPage: React.FC<SubscriptionDetailsPageProps> = ({ onProceed, onBack }) => {
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
            Planes de Suscripción
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Plan Básico */}
          <Card className="bg-blue-deep/20 border-gray-blue/30 hover:border-sky-soft/50 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-sky-soft">Plan Básico</CardTitle>
              <CardDescription className="text-gray-blue">Ideal para uso personal</CardDescription>
              <div className="text-3xl font-bold text-sky-soft mt-4">
                $19.99<span className="text-base text-gray-blue">/mes</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Monitoreo 24/7</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Alertas por email</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ App móvil básica</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Hasta 2 dispositivos</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Soporte por email</span>
                </div>
              </div>
              <Button
                onClick={onProceed}
                className="w-full bg-gray-blue hover:bg-gray-blue/80 text-almost-black"
              >
                Seleccionar Plan
              </Button>
            </CardContent>
          </Card>

          {/* Plan Premium */}
          <Card className="bg-blue-deep/20 border-sky-soft/50 relative hover:border-sky-soft transition-all duration-300 ring-2 ring-sky-soft/30">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-plum-dark text-sky-soft px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-xl font-bold text-sky-soft">Plan Premium</CardTitle>
              <CardDescription className="text-gray-blue">Perfecto para familias</CardDescription>
              <div className="text-3xl font-bold text-sky-soft mt-4">
                $39.99<span className="text-base text-gray-blue">/mes</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Todo del Plan Básico</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Alertas por SMS</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ App móvil premium</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Hasta 10 dispositivos</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Soporte telefónico</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Grabación en la nube</span>
                </div>
              </div>
              <Button
                onClick={onProceed}
                className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft"
              >
                Seleccionar Plan
              </Button>
            </CardContent>
          </Card>

          {/* Plan Empresarial */}
          <Card className="bg-blue-deep/20 border-gray-blue/30 hover:border-sky-soft/50 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-sky-soft">Plan Empresarial</CardTitle>
              <CardDescription className="text-gray-blue">Para negocios y oficinas</CardDescription>
              <div className="text-3xl font-bold text-sky-soft mt-4">
                $79.99<span className="text-base text-gray-blue">/mes</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Todo del Plan Premium</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Dispositivos ilimitados</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Panel de administración</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Soporte prioritario 24/7</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Integración personalizada</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sky-soft">✓ Reportes avanzados</span>
                </div>
              </div>
              <Button
                onClick={onProceed}
                className="w-full bg-gray-blue hover:bg-gray-blue/80 text-almost-black"
              >
                Seleccionar Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-blue-deep/10 border-gray-blue/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-sky-soft mb-4">Beneficios de Todos los Planes</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <p className="text-gray-blue">• Sin contratos a largo plazo</p>
                  <p className="text-gray-blue">• Cancela en cualquier momento</p>
                  <p className="text-gray-blue">• Actualizaciones gratuitas</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-blue">• Cifrado de extremo a extremo</p>
                  <p className="text-gray-blue">• Garantía de tiempo de actividad 99.9%</p>
                  <p className="text-gray-blue">• Período de prueba de 14 días</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetailsPage;
