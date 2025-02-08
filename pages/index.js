import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Create a component to demonstrate the feature request workflow
const FeatureRequestDemo = () => {
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
  const [showSummary, setShowSummary] = React.useState(false);

  // Calculate RICE score using the formula: (Reach × Impact × Confidence) ÷ Effort
  const calculateRICEScore = () => {
    if (formData.effort === 0) return 0;
    return (formData.reach * formData.impact * formData.confidence) / formData.effort;
  };

  // Update RICE score whenever form data changes
  React.useEffect(() => {
    const score = calculateRICEScore();
    setRiceScore(score);
  }, [formData]);

  // Handle changes to any form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Provide feedback based on RICE score
  const renderScoreExplanation = () => {
    if (riceScore === 0) return "Complete the RICE scoring to see your priority score";
    if (riceScore >= 8) return "High Priority: This feature shows strong potential for significant impact";
    if (riceScore >= 4) return "Medium Priority: This feature could be valuable but carefully consider trade-offs";
    return "Lower Priority: Consider if there are more impactful features to focus on first";
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Feature Request Assessment Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Problem Definition Section */}
            <section className={activeSection === 'problem' ? '' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">Problem Definition</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    What specific problem are you trying to solve?
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Describe the problem in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Solution/Workaround
                  </label>
                  <textarea
                    name="currentSolution"
                    value={formData.currentSolution}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="How are users currently handling this?"
                  />
                </div>
              </div>
            </section>

            {/* RICE Scoring Section */}
            <section className={activeSection === 'rice' ? '' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">RICE Score Calculator</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Reach (number of users/month)
                  </label>
                  <input
                    type="number"
                    name="reach"
                    value={formData.reach}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., 1000"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    How many users will this feature affect per month?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Impact (0.25-3)
                  </label>
                  <select
                    name="impact"
                    value={formData.impact}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="0">Select impact level</option>
                    <option value="3">3 - Massive impact</option>
                    <option value="2">2 - High impact</option>
                    <option value="1">1 - Medium impact</option>
                    <option value="0.5">0.5 - Low impact</option>
                    <option value="0.25">0.25 - Minimal impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confidence (0-1)
                  </label>
                  <select
                    name="confidence"
                    value={formData.confidence}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="0">Select confidence level</option>
                    <option value="1">1.0 - Extensive data available</option>
                    <option value="0.8">0.8 - Good data, some assumptions</option>
                    <option value="0.5">0.5 - Educated guess</option>
                    <option value="0.3">0.3 - Limited evidence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Effort (person-months)
                  </label>
                  <input
                    type="number"
                    name="effort"
                    value={formData.effort}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., 2"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Estimated person-months of work required
                  </p>
                </div>

                <Alert className="mt-6">
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-semibold">
                        RICE Score: {riceScore.toFixed(2)}
                      </p>
                      <p>{renderScoreExplanation()}</p>
                      <p className="text-sm text-gray-600">
                        Formula: (Reach × Impact × Confidence) ÷ Effort = {formData.reach} × {formData.impact} × {formData.confidence} ÷ {formData.effort || 1}
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Solution Details Section */}
            <section className={activeSection === 'solution' ? '' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">Solution Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Proposed Solution
                  </label>
                  <textarea
                    name="proposedSolution"
                    value={formData.proposedSolution}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Describe your proposed solution..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Who will benefit?
                  </label>
                  <textarea
                    name="beneficiaries"
                    value={formData.beneficiaries}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="2"
                    placeholder="List the user groups who will benefit..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Alternative Solutions Considered
                  </label>
                  <textarea
                    name="alternatives"
                    value={formData.alternatives}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="2"
                    placeholder="What other solutions did you consider?"
                  />
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className={activeSection === 'summary' ? '' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">Feature Request Summary</h2>
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Problem Analysis</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Problem Statement:</span> {formData.problem || 'Not provided'}</p>
                    <p><span className="font-medium">Current Solution:</span> {formData.currentSolution || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">RICE Analysis</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Reach:</span> {formData.reach} users/month</p>
                    <p><span className="font-medium">Impact:</span> {formData.impact} - {
                      formData.impact == 3 ? 'Massive impact' :
                      formData.impact == 2 ? 'High impact' :
                      formData.impact == 1 ? 'Medium impact' :
                      formData.impact == 0.5 ? 'Low impact' :
                      formData.impact == 0.25 ? 'Minimal impact' : 'Not specified'
                    }</p>
                    <p><span className="font-medium">Confidence:</span> {formData.confidence} - {
                      formData.confidence == 1 ? 'Extensive data available' :
                      formData.confidence == 0.8 ? 'Good data, some assumptions' :
                      formData.confidence == 0.5 ? 'Educated guess' :
                      formData.confidence == 0.3 ? 'Limited evidence' : 'Not specified'
                    }</p>
                    <p><span className="font-medium">Effort:</span> {formData.effort} person-months</p>
                    <p><span className="font-medium">RICE Score:</span> {riceScore.toFixed(2)}</p>
                    <p><span className="font-medium">Priority Assessment:</span> {renderScoreExplanation()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Proposed Solution</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Solution Description:</span> {formData.proposedSolution || 'Not provided'}</p>
                    <p><span className="font-medium">Beneficiaries:</span> {formData.beneficiaries || 'Not provided'}</p>
                    <p><span className="font-medium">Alternatives Considered:</span> {formData.alternatives || 'Not provided'}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    onClick={() => {
                      // Here you could add functionality to export or submit the data
                      alert('Feature request summary ready for submission!');
                    }}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                  >
                    Submit Feature Request
                  </button>
                </div>
              </div>
            </section>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveSection('problem')}
                className={`px-4 py-2 rounded ${activeSection === 'problem' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Problem
              </button>
              <button
                onClick={() => setActiveSection('rice')}
                className={`px-4 py-2 rounded ${activeSection === 'rice' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                RICE Score
              </button>
              <button
                onClick={() => setActiveSection('solution')}
                className={`px-4 py-2 rounded ${activeSection === 'solution' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Solution
              </button>
              <button
                onClick={() => setActiveSection('summary')}
                className={`px-4 py-2 rounded ${activeSection === 'summary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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

export default FeatureRequestDemo;
