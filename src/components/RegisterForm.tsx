
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    const success = await register(email, password, name);
    
    if (success) {
      toast.success('¡Registro exitoso! Bienvenido');
    } else {
      toast.error('El correo ya está registrado');
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-blue-deep/20 border-gray-blue/30">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-sky-soft">
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-center text-gray-blue">
          Regístrate con tu correo Gmail
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-sky-soft">
              Nombre Completo
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-sky-soft">
              Correo Gmail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@gmail.com"
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
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-sky-soft">
              Confirmar Contraseña
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-almost-black/50 border-gray-blue/50 text-sky-soft placeholder:text-gray-blue/70"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-plum-dark hover:bg-plum-dark/80 text-sky-soft"
            disabled={isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-blue">
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-sky-soft hover:text-sky-soft/80 font-medium underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
