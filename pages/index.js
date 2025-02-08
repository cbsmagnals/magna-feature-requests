import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FeatureRequestForm = () => {
  // Initialize form state with default values
  const [formData, setFormData] = React.useState({
    problem: '',
    currentSolution: '',
    reach: 0,
    impact: 0,
    confidence: 0,
    effort: 0,
    proposedSolution: '',
    beneficiaries: '',
    alternatives: ''
  });

  const [riceScore, setRiceScore] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState('problem');

  // Calculate RICE score whenever form data changes
  const calculateRICEScore = () => {
    if (formData.effort === 0) return 0;
    return (formData.reach * formData.impact * formData.confidence) / formData.effort;
  };

  React.useEffect(() => {
    const score = calculateRICEScore();
    setRiceScore(score);
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Determine priority level based on RICE score
  const renderScoreExplanation = () => {
    if (riceScore === 0) return "Complete the RICE scoring to see your priority score";
    if (riceScore >= 8) return "High Priority: This feature shows strong potential for significant impact";
    if (riceScore >= 4) return "Medium Priority: This feature could be valuable but carefully consider trade-offs";
    return "Lower Priority: Consider if there are more impactful features to focus on first";
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Feature Request Assessment Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Problem Definition Section */}
            <section className={activeSection === 'problem' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">Problem Definition</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What specific problem are you trying to solve?
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded h-24"
                    placeholder="Describe the problem in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Solution/Workaround
                  </label>
                  <textarea
                    name="currentSolution"
                    value={formData.currentSolution}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded h-24"
                    placeholder="How are users currently handling this?"
                  />
                </div>
              </div>
            </section>

            {/* RICE Scoring Section */}
            <section className={activeSection === 'rice' ? 'block' : 'hidden'}>
              {/* ... Rest of the RICE scoring section ... */}
            </section>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveSection('problem')}
                className={`px-4 py-2 rounded ${
                  activeSection === 'problem' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Problem
              </button>
              <button
                onClick={() => setActiveSection('rice')}
                className={`px-4 py-2 rounded ${
                  activeSection === 'rice' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                RICE Score
              </button>
              <button
                onClick={() => setActiveSection('solution')}
                className={`px-4 py-2 rounded ${
                  activeSection === 'solution' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Solution
              </button>
              <button
                onClick={() => setActiveSection('summary')}
                className={`px-4 py-2 rounded ${
                  activeSection === 'summary' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Review & Submit
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureRequestForm;
