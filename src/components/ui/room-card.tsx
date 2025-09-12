import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Room } from '@/lib/api';
import { Users, Wifi, Car, Coffee, Star } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
}

export const RoomCard = ({ room, onSelect }: RoomCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('minibar')) return <Coffee className="h-4 w-4" />;
    return <Star className="h-4 w-4" />;
  };

  return (
    <Card className="overflow-hidden bg-gradient-card shadow-card hover:shadow-luxury transition-all duration-500 group border-gold/10">
      <div className="relative overflow-hidden">
        <img 
          src={room.image} 
          alt={room.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-gold text-charcoal font-semibold">
            {room.type}
          </Badge>
        </div>
        {!room.available && (
          <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              No Disponible
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300">
            {room.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-gold">
              ${room.price}
            </div>
            <div className="text-sm text-muted-foreground">
              por noche
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {room.description}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity} huéspedes</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-charcoal">Amenidades:</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="flex items-center space-x-1 text-xs"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </Badge>
            ))}
            {room.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{room.amenities.length - 3} más
              </Badge>
            )}
          </div>
        </div>
        
        {onSelect && (
          <Button 
            onClick={() => onSelect(room)}
            disabled={!room.available}
            className="w-full bg-gradient-gold text-charcoal hover:opacity-90 transition-all duration-300 shadow-elegant disabled:opacity-50"
          >
            {room.available ? 'Reservar Ahora' : 'No Disponible'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};