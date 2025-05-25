
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, FileText, User, Bell } from 'lucide-react';

const HomeScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const upcomingEvent = {
    name: "Blood Pressure Screening",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Community Center"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-25 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Hi, {user?.name}!</h1>
            <p className="text-sm text-gray-600">Let's keep you healthy</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
            className="rounded-full p-2"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Upcoming Event Card */}
        <Card className="animate-scale-in shadow-lg border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Next Appointment</h3>
                <p className="text-sm text-gray-600">You're registered for:</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">{upcomingEvent.name}</h4>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {upcomingEvent.date} at {upcomingEvent.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {upcomingEvent.location}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
              onClick={() => navigate('/events/1')}
            >
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 animate-slide-up">Quick Actions</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={() => navigate('/events')}
              className="h-16 bg-primary hover:bg-primary/90 text-white justify-start pl-6 animate-slide-up [animation-delay:0.1s] transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">Find Nearby Events</div>
                <div className="text-sm opacity-90">Discover health screenings</div>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/results')}
              variant="outline"
              className="h-16 justify-start pl-6 border-2 hover:bg-gray-50 animate-slide-up [animation-delay:0.2s] transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-medium">My Results</div>
                <div className="text-sm text-gray-600">View past screening results</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Health Tips Card */}
        <Card className="animate-slide-up [animation-delay:0.3s] shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">Health Tip</h3>
                <p className="text-sm text-gray-600">Daily wellness advice</p>
              </div>
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-accent" />
              </div>
            </div>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              Stay hydrated! Aim for 8 glasses of water daily to maintain optimal health and support your body's natural functions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;
