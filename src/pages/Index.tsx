import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RoomCard } from '@/components/ui/room-card';
import { hotelApi, Room } from '@/lib/api';
import { authService } from '@/lib/auth';
import { Star, MapPin, Phone, Mail } from 'lucide-react';
import heroImage from '@/assets/hero-hotel.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const roomsData = await hotelApi.getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error loading rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const handleRoomSelect = (room: Room) => {
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-70" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-pearl mb-6 tracking-tight">
            Grand Hotel 
            <span className="text-gold"> Kodigo</span>
          </h1>
          <p className="text-xl md:text-2xl text-pearl/90 mb-8 leading-relaxed">
            Experiencia de lujo incomparable en el corazón de la ciudad
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="bg-gradient-gold text-charcoal hover:opacity-90 transition-all duration-300 shadow-luxury text-lg px-8 py-6"
            >
              Reservar Ahora
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 text-lg px-8 py-6"
            >
              Ver Habitaciones
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              ¿Por qué elegir Grand Hotel Kodigo?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos una experiencia de hospitalidad excepcional con servicios de clase mundial
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-charcoal" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">Servicio 5 Estrellas</h3>
              <p className="text-muted-foreground">
                Personal altamente capacitado disponible 24/7 para atender todas sus necesidades
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-charcoal" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">Ubicación Premium</h3>
              <p className="text-muted-foreground">
                En el centro de la ciudad, cerca de los principales atractivos y centros de negocios
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-charcoal" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">Atención Personalizada</h3>
              <p className="text-muted-foreground">
                Servicios exclusivos y atención personalizada para cada huésped
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              Nuestras Habitaciones
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestras exclusivas habitaciones diseñadas para tu máximo confort
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gold text-lg">Cargando habitaciones...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  onSelect={handleRoomSelect}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-pearl mb-8">
            ¿Listo para una experiencia inolvidable?
          </h2>
          <p className="text-xl text-pearl/90 mb-8 max-w-2xl mx-auto">
            Contacta con nuestro equipo de reservas para planificar tu estancia perfecta
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-pearl">
              <Phone className="h-5 w-5 text-gold" />
              <span>+503 2222-3333</span>
            </div>
            <div className="flex items-center space-x-2 text-pearl">
              <Mail className="h-5 w-5 text-gold" />
              <span>reservas@grandhotelkodigo.com</span>
            </div>
            <div className="flex items-center space-x-2 text-pearl">
              <MapPin className="h-5 w-5 text-gold" />
              <span>San Salvador, El Salvador</span>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            className="bg-gradient-gold text-charcoal hover:opacity-90 transition-all duration-300 shadow-luxury text-lg px-8 py-6"
          >
            Reservar Ahora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
