
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, User, Bell, Settings, LogOut, Edit2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    reminders: true,
    updates: true,
    results: true
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
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
            onClick={() => navigate('/home')}
            className="mr-3 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
            <p className="text-sm text-gray-600">Manage your account</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Info */}
        <Card className="animate-scale-in shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="p-2"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow-sm"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600">Member since March 2024</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="animate-slide-up [animation-delay:0.1s] shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-gray-600 mr-3" />
              <h3 className="font-semibold text-gray-800">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Event Reminders</p>
                  <p className="text-sm text-gray-600">Get notified 24h before events</p>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, reminders: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">New Events</p>
                  <p className="text-sm text-gray-600">Updates about new screenings</p>
                </div>
                <Switch
                  checked={notifications.updates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, updates: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Results Ready</p>
                  <p className="text-sm text-gray-600">When your results are available</p>
                </div>
                <Switch
                  checked={notifications.results}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, results: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="animate-slide-up [animation-delay:0.2s] shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Your Health Journey</h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-xs text-gray-600">Events Attended</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">3</div>
                <div className="text-xs text-gray-600">Results Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">2</div>
                <div className="text-xs text-gray-600">Upcoming</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 animate-slide-up [animation-delay:0.3s]"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
