import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoomCard } from '@/components/ui/room-card';
import { authService } from '@/lib/auth';
import { hotelApi, Room } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { User, Calendar, Star, Clock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const loadRooms = async () => {
      try {
        const roomsData = await hotelApi.getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error loading rooms:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las habitaciones",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [navigate, toast]);

  const handleRoomReservation = (room: Room) => {
    setSelectedRoom(room);
    toast({
      title: "Reserva Iniciada",
      description: `Procesando reserva para ${room.name}`,
    });
    
    // Simulate reservation process
    setTimeout(() => {
      toast({
        title: "¡Reserva Confirmada!",
        description: `Tu reserva para ${room.name} ha sido confirmada.`,
      });
      setSelectedRoom(null);
    }, 2000);
  };

  if (!user) {
    return null; // This will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-card shadow-elegant border-gold/10">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-charcoal" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-charcoal">
                    ¡Bienvenido, {user.name}!
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Gestiona tus reservas y explora nuestras habitaciones disponibles
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card border-gold/10">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">0</div>
              <div className="text-sm text-muted-foreground">Reservas Activas</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-gold/10">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">5.0</div>
              <div className="text-sm text-muted-foreground">Rating Promedio</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-gold/10">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">24/7</div>
              <div className="text-sm text-muted-foreground">Soporte</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-gold/10">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">VIP</div>
              <div className="text-sm text-muted-foreground">Membresía</div>
            </CardContent>
          </Card>
        </div>

        {/* User Info Section */}
        <div className="mb-8">
          <Card className="bg-gradient-card shadow-card border-gold/10">
            <CardHeader>
              <CardTitle className="text-charcoal">Información de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-charcoal mb-3">Datos Personales</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nombre:</span>
                      <span className="text-charcoal font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-charcoal font-medium">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Teléfono:</span>
                        <span className="text-charcoal font-medium">{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-charcoal mb-3">Estado de la Cuenta</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Estado:</span>
                      <Badge className="bg-gradient-gold text-charcoal">Activa</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Membresía:</span>
                      <Badge variant="outline" className="border-gold text-gold">VIP Gold</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Rooms Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-charcoal mb-2">
              Habitaciones Disponibles
            </h2>
            <p className="text-muted-foreground">
              Selecciona una habitación para hacer tu reserva
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
                  onSelect={handleRoomReservation}
                />
              ))}
            </div>
          )}
        </div>

        {/* Reservation Status */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50">
            <Card className="bg-gradient-card shadow-luxury border-gold/20 m-4 max-w-md w-full">
              <CardContent className="p-6 text-center">
                <div className="text-gold text-lg mb-4">
                  Procesando reserva para {selectedRoom.name}...
                </div>
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;