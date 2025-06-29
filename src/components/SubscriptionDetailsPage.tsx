
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, Check } from 'lucide-react';

interface SubscriptionDetailsPageProps {
  onProceed: () => void;
  onBack: () => void;
}

const SubscriptionDetailsPage: React.FC<SubscriptionDetailsPageProps> = ({ onProceed, onBack }) => {
  const plans = [
    {
      name: 'Básico',
      price: '49.99',
      harvest: '9',
      features: [
        'Monitoreo básico de condiciones',
        'Mejoramiento de optimización del cultivo con IA',
        'Alertas por correo electrónico',
        'Soporte técnico estándar',
        'Acceso a panel web básico'
      ]
    },
    {
      name: 'Premium',
      price: '79.99',
      harvest: '27',
      features: [
        'Monitoreo avanzado en tiempo real',
        'Mejoramiento de optimización del cultivo con IA',
        'Alertas instantáneas móviles',
        'Análisis predictivo básico',
        'Soporte técnico prioritario',
        'Acceso a panel web completo',
        'Reportes semanales detallados'
      ]
    },
    {
      name: 'Empresarial',
      price: '119.99',
      harvest: '81',
      features: [
        'Monitoreo completo multiplataforma',
        'Mejoramiento de optimización del cultivo con IA',
        'Sistema de alertas multi-canal',
        'Análisis predictivo avanzado',
        'Soporte técnico 24/7',
        'Panel de administración completo',
        'Reportes personalizados',
        'Integración con sistemas externos',
        'Capacitación especializada'
      ]
    }
  ];

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
            Volver a Planes
          </Button>
          <h1 className="text-4xl font-bold text-center text-sky-soft mb-8">
            Planes de Suscripción
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`bg-blue-deep/20 border-gray-blue/30 hover:border-sky-soft/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-soft/10 ${
                index === 1 ? 'ring-2 ring-sky-soft/30 scale-105' : ''
              }`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-sky-soft mb-2">
                  Plan {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-blue mb-4">
                  {plan.harvest} kilos por cosecha
                </CardDescription>
                <div className="text-center">
                  <span className="text-4xl font-bold text-sky-soft">{plan.price}</span>
                  <span className="text-gray-blue ml-1">Bs/mes</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="bg-gray-blue/10 rounded-lg p-4 mb-6 text-center border-2 border-dashed border-gray-blue/30">
                  <div className="text-2xl font-bold text-green-400 mb-2">{plan.harvest} kg</div>
                  <p className="text-gray-blue text-sm">Verde hidropónico por cosecha</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sky-soft text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={onProceed}
                  className={`w-full ${
                    index === 1 
                      ? 'bg-sky-soft hover:bg-sky-soft/80 text-almost-black' 
                      : 'bg-plum-dark hover:bg-plum-dark/80 text-sky-soft'
                  }`}
                >
                  Seleccionar Plan {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-blue mb-4">
            Todos los planes incluyen acceso completo a la plataforma de monitoreo
          </p>
          <div className="bg-blue-deep/20 border border-gray-blue/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-sky-soft mb-3">¿Necesitas ayuda para elegir?</h3>
            <p className="text-gray-blue text-sm">
              Nuestro equipo de expertos puede ayudarte a seleccionar el plan que mejor se adapte 
              a tus necesidades de cultivo hidropónico. Contacta con nosotros para una consulta gratuita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetailsPage;
