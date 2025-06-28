
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentFormProps {
  type: 'kit' | 'subscription';
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ type, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    postalCode: '',
    country: '',
    city: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(
      type === 'kit' 
        ? '¡Compra realizada con éxito! Nos contactaremos contigo para coordinar la instalación.'
        : '¡Suscripción activada con éxito! Bienvenido a nuestro servicio premium.'
    );
    
    setIsLoading(false);
    onSuccess();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-almost-black p-6">
      <div className="max-w-2xl mx-auto">
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
            {type === 'kit' ? 'Finalizar Compra' : 'Activar Suscripción'}
          </h1>
          <p className="text-center text-gray-blue mb-8">
            Completa tus datos para {type === 'kit' ? 'realizar la compra' : 'activar tu suscripción'}
          </p>
        </div>

        <Card className="bg-blue-deep/20 border-gray-blue/30">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-sky-soft flex items-center">
              <CreditCard className="w-6 h-6 mr-2" />
              Información de Pago
            </CardTitle>
            <CardDescription className="text-gray-blue">
              Todos tus datos están protegidos con cifrado SSL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-sky-soft">Información Personal</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-soft">
                      Correo Gmail
                    </label>
                    <Input
                      type="email"
                      placeholder="tu@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-soft">
                      Código Postal
                    </label>
                    <Input
                      type="text"
                      placeholder="12345"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      required
                      className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-soft">
                      País
                    </label>
                    <Select onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="bg-almost-black/50 border-gray-blue/50 text-sky-soft">
                        <SelectValue placeholder="Selecciona tu país" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-deep border-gray-blue/50">
                        <SelectItem value="mexico" className="text-sky-soft hover:bg-gray-blue/20">México</SelectItem>
                        <SelectItem value="usa" className="text-sky-soft hover:bg-gray-blue/20">Estados Unidos</SelectItem>
                        <SelectItem value="canada" className="text-sky-soft hover:bg-gray-blue/20">Canadá</SelectItem>
                        <SelectItem value="spain" className="text-sky-soft hover:bg-gray-blue/20">España</SelectItem>
                        <SelectItem value="argentina" className="text-sky-soft hover:bg-gray-blue/20">Argentina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-soft">
                      Ciudad
                    </label>
                    <Input
                      type="text"
                      placeholder="Tu ciudad"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                      className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
                    />
                  </div>
                </div>
              </div>

              {/* Información de Tarjeta */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-sky-soft">Información de Tarjeta</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-sky-soft">
                    Nombre en la Tarjeta
                  </label>
                  <Input
                    type="text"
                    placeholder="Nombre completo como aparece en la tarjeta"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    required
                    className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-sky-soft">
                    Número de Tarjeta
                  </label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    maxLength={19}
                    required
                    className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-soft">
                      Fecha de Vencimiento
                    </label>
                    <Input
                      type="text"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                      maxLength={5}
                      required
                      className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-soft">
                      CVV
                    </label>
                    <Input
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                      required
                      className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
                    />
                  </div>
                </div>
              </div>

              {/* Resumen del Pedido */}
              <div className="bg-gray-blue/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-sky-soft mb-3">Resumen del Pedido</h3>
                {type === 'kit' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-blue">Kit Completo de Seguridad:</span>
                      <span className="text-sky-soft">$2,499.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-blue">Servicio de Instalación:</span>
                      <span className="text-sky-soft">$299.00</span>
                    </div>
                    <div className="border-t border-gray-blue/30 pt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-sky-soft">Total:</span>
                        <span className="text-sky-soft text-xl">$2,798.00 USD</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-blue">Plan Premium (Mensual):</span>
                      <span className="text-sky-soft">$39.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-blue">Primer mes gratis:</span>
                      <span className="text-sky-soft">-$39.99</span>
                    </div>
                    <div className="border-t border-gray-blue/30 pt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-sky-soft">Total hoy:</span>
                        <span className="text-sky-soft text-xl">$0.00 USD</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading 
                  ? 'Procesando...' 
                  : type === 'kit' 
                    ? 'Confirmar Compra' 
                    : 'Activar Suscripción'
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentForm;
