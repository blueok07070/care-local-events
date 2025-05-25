
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Calendar, Clock, Search } from 'lucide-react';

const EventListScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    {
      id: 1,
      name: "Blood Pressure Screening",
      date: "March 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Community Center",
      distance: "0.5 miles",
      description: "Free blood pressure checks with health professionals"
    },
    {
      id: 2,
      name: "Diabetes Testing",
      date: "March 20, 2024",
      time: "9:00 AM - 1:00 PM",
      location: "Public Library",
      distance: "1.2 miles",
      description: "Blood glucose screening and diabetes education"
    },
    {
      id: 3,
      name: "Vision Screening",
      date: "March 25, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "School Gymnasium",
      distance: "2.1 miles",
      description: "Comprehensive eye exams and vision testing"
    },
    {
      id: 4,
      name: "Cholesterol Check",
      date: "March 30, 2024",
      time: "8:00 AM - 12:00 PM",
      location: "Health Center",
      distance: "0.8 miles",
      description: "Lipid panel testing and heart health consultation"
    }
  ];

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-25 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="mr-3 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Nearby Events</h1>
            <p className="text-sm text-gray-600">Health screenings near you</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Search */}
        <div className="relative animate-fade-in">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 shadow-sm"
          />
        </div>

        {/* Location Info */}
        <Card className="animate-slide-up shadow-lg border-0 bg-gradient-to-r from-accent/5 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Current Location</p>
                <p className="text-sm text-gray-600">San Francisco, CA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 animate-slide-up [animation-delay:0.1s]">
            Available Screenings ({filteredEvents.length})
          </h2>
          
          {filteredEvents.map((event, index) => (
            <Card
              key={event.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] animate-slide-up shadow-md border-0`}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {event.distance}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListScreen;
