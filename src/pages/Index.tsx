
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import PlansPage from '@/components/PlansPage';
import KitDetailsPage from '@/components/KitDetailsPage';
import SubscriptionDetailsPage from '@/components/SubscriptionDetailsPage';
import PaymentForm from '@/components/PaymentForm';
import MonitoringPage from '@/components/MonitoringPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Activity } from 'lucide-react';

type AppState = 'login' | 'register' | 'plans' | 'kit-details' | 'subscription-details' | 'kit-payment' | 'subscription-payment' | 'success' | 'monitoring';

const MainApp = () => {
  const { user, logout } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>('login');

  if (!user && currentState !== 'register') {
    return (
      <div className="min-h-screen bg-almost-black flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {currentState === 'login' ? (
            <LoginForm onSwitchToRegister={() => setCurrentState('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setCurrentState('login')} />
          )}
        </div>
      </div>
    );
  }

  if (!user && currentState === 'register') {
    return (
      <div className="min-h-screen bg-almost-black flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegisterForm onSwitchToLogin={() => setCurrentState('login')} />
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentState) {
      case 'plans':
        return (
          <PlansPage
            onSelectSubscription={() => setCurrentState('subscription-details')}
            onSelectKit={() => setCurrentState('kit-details')}
            onBack={() => setCurrentState('login')}
          />
        );
      case 'kit-details':
        return (
          <KitDetailsPage
            onProceed={() => setCurrentState('kit-payment')}
            onBack={() => setCurrentState('plans')}
          />
        );
      case 'subscription-details':
        return (
          <SubscriptionDetailsPage
            onProceed={() => setCurrentState('subscription-payment')}
            onBack={() => setCurrentState('plans')}
          />
        );
      case 'kit-payment':
        return (
          <PaymentForm
            type="kit"
            onBack={() => setCurrentState('kit-details')}
            onSuccess={() => setCurrentState('success')}
          />
        );
      case 'subscription-payment':
        return (
          <PaymentForm
            type="subscription"
            onBack={() => setCurrentState('subscription-details')}
            onSuccess={() => setCurrentState('success')}
          />
        );
      case 'monitoring':
        return (
          <MonitoringPage
            onBack={() => setCurrentState('login')}
          />
        );
      case 'success':
        return (
          <div className="min-h-screen bg-almost-black flex items-center justify-center p-6">
            <Card className="w-full max-w-md bg-blue-deep/20 border-gray-blue/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-sky-soft">
                  ¡Proceso Completado!
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-blue">
                  Gracias por confiar en nosotros. Te contactaremos pronto con los detalles.
                </p>
                <Button
                  onClick={() => setCurrentState('plans')}
                  className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft"
                >
                  Volver al Inicio
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-almost-black p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 text-sky-soft" />
                  <div>
                    <h2 className="text-xl font-bold text-sky-soft">Bienvenido, {user?.name}</h2>
                    <p className="text-gray-blue">{user?.email}</p>
                  </div>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="bg-transparent border-gray-blue text-sky-soft hover:bg-blue-deep/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>

              {/* Welcome Card */}
              <Card className="bg-blue-deep/20 border-gray-blue/30 mb-8">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-sky-soft text-center">
                    Sistema de Seguridad Inteligente
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-blue text-lg">
                    Protege lo que más importa con nuestra tecnología de vanguardia
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => setCurrentState('plans')}
                      className="bg-plum-dark hover:bg-plum-dark/80 text-sky-soft px-8 py-3 text-lg"
                    >
                      Ver Planes Disponibles
                    </Button>
                    <Button
                      onClick={() => setCurrentState('monitoring')}
                      className="bg-blue-deep hover:bg-blue-deep/80 text-sky-soft px-8 py-3 text-lg"
                    >
                      <Activity className="w-5 h-5 mr-2" />
                      Monitorear Forraje Hidropónico
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-blue-deep/10 border-gray-blue/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-sky-soft mb-2">Monitoreo 24/7</h3>
                    <p className="text-gray-blue">Vigilancia continua para tu tranquilidad</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-deep/10 border-gray-blue/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-sky-soft mb-2">Alertas Instantáneas</h3>
                    <p className="text-gray-blue">Notificaciones inmediatas ante cualquier evento</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-deep/10 border-gray-blue/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-sky-soft mb-2">Fácil Instalación</h3>
                    <p className="text-gray-blue">Servicio profesional de instalación incluido</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderCurrentView();
};

const Index = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default Index;
