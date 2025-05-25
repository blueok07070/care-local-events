
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ResultsScreen = () => {
  const navigate = useNavigate();

  const results = [
    {
      id: 1,
      eventName: "Blood Pressure Screening",
      date: "February 15, 2024",
      status: "completed",
      icon: CheckCircle,
      iconColor: "text-accent",
      bgColor: "bg-accent/5",
      results: {
        systolic: 120,
        diastolic: 80,
        status: "Normal"
      }
    },
    {
      id: 2,
      eventName: "Cholesterol Check",
      date: "January 20, 2024",
      status: "completed",
      icon: CheckCircle,
      iconColor: "text-accent",
      bgColor: "bg-accent/5",
      results: {
        total: 185,
        ldl: 110,
        hdl: 55,
        status: "Borderline High"
      }
    },
    {
      id: 3,
      eventName: "Diabetes Screening",
      date: "March 10, 2024",
      status: "pending",
      icon: Clock,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
      results: null
    },
    {
      id: 4,
      eventName: "Vision Test",
      date: "December 5, 2023",
      status: "completed",
      icon: CheckCircle,
      iconColor: "text-accent",
      bgColor: "bg-accent/5",
      results: {
        rightEye: "20/20",
        leftEye: "20/25",
        status: "Good"
      }
    }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Results Available';
      case 'pending':
        return 'Results Pending';
      default:
        return 'Unknown Status';
    }
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
            <h1 className="text-xl font-semibold text-gray-800">My Results</h1>
            <p className="text-sm text-gray-600">Screening results & history</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Summary Card */}
        <Card className="animate-scale-in shadow-lg border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Health Summary</h3>
                <p className="text-sm text-gray-600">Recent screening overview</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{results.filter(r => r.status === 'completed').length}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 animate-slide-up">
            Screening History
          </h2>
          
          {results.map((result, index) => {
            const IconComponent = result.icon;
            
            return (
              <Card
                key={result.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] animate-slide-up shadow-md border-0`}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                onClick={() => result.status === 'completed' && navigate(`/results/${result.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${result.bgColor} rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${result.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{result.eventName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{result.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          result.status === 'completed' 
                            ? 'bg-accent/10 text-accent' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {getStatusText(result.status)}
                        </span>
                      </div>
                    </div>
                    
                    {result.status === 'completed' && (
                      <FileText className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  {result.results && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        {result.eventName.includes('Blood Pressure') && (
                          <div className="flex justify-between">
                            <span>Blood Pressure:</span>
                            <span className="font-medium">{result.results.systolic}/{result.results.diastolic} mmHg</span>
                          </div>
                        )}
                        {result.eventName.includes('Cholesterol') && (
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Total Cholesterol:</span>
                              <span className="font-medium">{result.results.total} mg/dL</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <span className="font-medium text-yellow-600">{result.results.status}</span>
                            </div>
                          </div>
                        )}
                        {result.eventName.includes('Vision') && (
                          <div className="flex justify-between">
                            <span>Vision:</span>
                            <span className="font-medium">{result.results.rightEye} / {result.results.leftEye}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results Message */}
        {results.length === 0 && (
          <Card className="animate-fade-in shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">No Results Yet</h3>
              <p className="text-gray-600 mb-4">
                Your screening results will appear here after you attend events.
              </p>
              <Button
                onClick={() => navigate('/events')}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Find Events
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;
