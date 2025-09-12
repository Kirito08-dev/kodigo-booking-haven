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

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error de validación",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error de validación",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada. Bienvenido al Grand Hotel Kodigo.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error de registro",
        description: error instanceof Error ? error.message : "Error al crear la cuenta",
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
            <h1 className="text-3xl font-bold text-charcoal mb-2">Crear Cuenta</h1>
            <p className="text-muted-foreground">
              Únete al Grand Hotel Kodigo y disfruta de beneficios exclusivos
            </p>
          </div>

          <Card className="bg-gradient-card shadow-elegant border-gold/10">
            <CardHeader>
              <CardTitle className="text-charcoal">Registro de Usuario</CardTitle>
              <CardDescription>
                Completa los siguientes datos para crear tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-charcoal font-medium">
                    Nombre Completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gold/20 focus:border-gold focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

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
                  <Label htmlFor="phone" className="text-charcoal font-medium">
                    Teléfono (Opcional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+503 2222-3333"
                    value={formData.phone}
                    onChange={handleChange}
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
                      placeholder="Mínimo 6 caracteres"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-charcoal font-medium">
                    Confirmar Contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="border-gold/20 focus:border-gold focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-gold text-charcoal hover:opacity-90 transition-all duration-300 shadow-elegant"
                >
                  {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  ¿Ya tienes una cuenta?{' '}
                  <Link 
                    to="/login" 
                    className="text-gold hover:text-gold-dark transition-colors duration-300 font-medium"
                  >
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;