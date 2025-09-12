import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Hotel, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(formData);
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión exitosamente.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: error instanceof Error ? error.message : "Credenciales inválidas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Hotel className="h-16 w-16 text-gold mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-charcoal mb-2">Iniciar Sesión</h1>
            <p className="text-muted-foreground">
              Accede a tu cuenta para gestionar tus reservas
            </p>
          </div>

          <Card className="bg-gradient-card shadow-elegant border-gold/10">
            <CardHeader>
              <CardTitle className="text-charcoal">Bienvenido de vuelta</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-charcoal font-medium">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gold/20 focus:border-gold focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-charcoal font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="border-gold/20 focus:border-gold focus:ring-gold/20 transition-all duration-300 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-gold text-charcoal hover:opacity-90 transition-all duration-300 shadow-elegant"
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  ¿No tienes una cuenta?{' '}
                  <Link 
                    to="/register" 
                    className="text-gold hover:text-gold-dark transition-colors duration-300 font-medium"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-4 bg-gold/10 rounded-lg border border-gold/20">
                <p className="text-sm text-charcoal font-medium mb-2">Credenciales de prueba:</p>
                <p className="text-sm text-muted-foreground">
                  Email: admin@kodigo.com<br />
                  Contraseña: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;