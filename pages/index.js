import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FeatureRequestForm = () => {
  // State management for form data
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
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

  // Calculate RICE score when relevant fields change
  React.useEffect(() => {
    const score = calculateRICEScore();
    setRiceScore(score);
  }, [formData.reach, formData.impact, formData.confidence, formData.effort]);

  const calculateRICEScore = () => {
    if (formData.effort === 0) return 0;
    return (formData.reach * formData.impact * formData.confidence) / formData.effort;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            {/* Initial Details Section */}
            <section className={activeSection === 'initial' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Feature Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter feature title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded h-32"
                    placeholder="Provide a detailed description..."
                  />
                </div>
              </div>
            </section>

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
                    className="w-full p-2 border rounded h-32"
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
                    className="w-full p-2 border rounded h-32"
                    placeholder="How are users currently handling this?"
                  />
                </div>
              </div>
            </section>

            {/* RICE Scoring Section */}
            <section className={activeSection === 'rice' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">RICE Score Calculator</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reach (number of users/month)
                  </label>
                  <input
                    type="number"
                    name="reach"
                    value={formData.reach}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    min="0"
                    placeholder="e.g., 1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
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
                  <label className="block text-sm font-medium mb-2">
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
                  <label className="block text-sm font-medium mb-2">
                    Effort (person-months)
                  </label>
                  <input
                    type="number"
                    name="effort"
                    value={formData.effort}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    min="0"
                    placeholder="e.g., 2"
                  />
                </div>

                <Alert className="mt-6">
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-semibold">
                        RICE Score: {riceScore.toFixed(2)}
                      </p>
                      <p>{renderScoreExplanation()}</p>
                      <p className="text-sm text-gray-600">
                        Formula: (Reach × Impact × Confidence) ÷ Effort
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Solution Details Section */}
            <section className={activeSection === 'solution' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">Solution Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Proposed Solution
                  </label>
                  <textarea
                    name="proposedSolution"
                    value={formData.proposedSolution}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded h-32"
                    placeholder="Describe your proposed solution..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Who will benefit?
                  </label>
                  <textarea
                    name="beneficiaries"
                    value={formData.beneficiaries}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded h-24"
                    placeholder="List the user groups who will benefit..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Alternative Solutions Considered
                  </label>
                  <textarea
                    name="alternatives"
                    value={formData.alternatives}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded h-24"
                    placeholder="What other solutions did you consider?"
                  />
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className={activeSection === 'summary' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">Feature Request Summary</h2>
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Problem Analysis</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Title:</span> {formData.title || 'Not provided'}</p>
                    <p><span className="font-medium">Description:</span> {formData.description || 'Not provided'}</p>
                    <p><span className="font-medium">Problem Statement:</span> {formData.problem || 'Not provided'}</p>
                    <p><span className="font-medium">Current Solution:</span> {formData.currentSolution || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">RICE Analysis</h3>
                  <div className="space-y-2">
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

                <button 
                  onClick={() => {
                    // Add submission logic here
                    alert('Feature request submitted successfully!');
                  }}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mt-6"
                >
                  Submit Feature Request
                </button>
              </div>
            </section>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 border-t pt-4">
              <button
                onClick={() => setActiveSection('initial')}
                className={`px-4 py-2 rounded ${
                  activeSection === 'initial' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Details
              </button>
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
                Review
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureRequestForm;
