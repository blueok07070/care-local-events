
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EventDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const event = {
    id: 1,
    name: "Blood Pressure Screening",
    date: "March 15, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Community Center",
    address: "123 Health Street, San Francisco, CA 94102",
    distance: "0.5 miles",
    description: "Free blood pressure checks with qualified health professionals. This screening includes blood pressure measurement, basic health assessment, and educational materials about maintaining healthy blood pressure levels.",
    requirements: [
      "Valid ID required",
      "No fasting needed",
      "Wear loose-fitting clothing",
      "Arrive 15 minutes early"
    ],
    organizer: "SF Health Department",
    contact: "(415) 555-0123"
  };

  const handleRegister = () => {
    setIsRegistered(true);
    setShowConfirmation(true);
    toast({
      title: "Registration Successful!",
      description: "You've been registered for the blood pressure screening.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-25 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/events')}
            className="mr-3 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Event Details</h1>
            <p className="text-sm text-gray-600">Registration information</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Event Header */}
        <Card className="animate-scale-in shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h2>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {event.distance} away
                </span>
              </div>
              {isRegistered && (
                <div className="flex items-center text-accent">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Registered</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="animate-slide-up [animation-delay:0.1s] shadow-lg border-0">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 mb-3">Event Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">{event.location}</p>
                  <p className="text-sm text-gray-600">{event.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="animate-slide-up [animation-delay:0.2s] shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-3">What to Bring</h3>
            <ul className="space-y-2">
              {event.requirements.map((req, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="animate-slide-up [animation-delay:0.3s] shadow-lg border-0">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Interactive Map</p>
                <p className="text-xs text-gray-500">{event.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Button */}
        <div className="animate-slide-up [animation-delay:0.4s]">
          {isRegistered ? (
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-white h-12"
              disabled
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              You're Registered!
            </Button>
          ) : (
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleRegister}
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                >
                  Register for Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-center text-accent">Registration Confirmed!</DialogTitle>
                </DialogHeader>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    You've successfully registered for the {event.name} on {event.date}.
                  </p>
                  <p className="text-sm text-gray-500">
                    You'll receive a reminder 24 hours before the event.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailScreen;
