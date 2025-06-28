
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast.success('¡Inicio de sesión exitoso!');
    } else {
      toast.error('Credenciales incorrectas');
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-blue-deep/20 border-gray-blue/30">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-sky-soft">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center text-gray-blue">
          Ingresa tus credenciales para acceder
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-sky-soft">
              Correo Electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-sky-soft">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-blue">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-sky-soft hover:text-sky-soft/80 font-medium underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
