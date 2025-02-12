import React, { useState, useEffect } from 'react';

export default function FeatureRequestFormPreview() {
  const [formData, setFormData] = useState({
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

  const [riceScore, setRiceScore] = useState(0);
  const [activeSection, setActiveSection] = useState('problem');

  useEffect(() => {
    calculateRICEScore();
  }, [formData.reach, formData.impact, formData.confidence, formData.effort]);

  const calculateRICEScore = () => {
    if (formData.effort === 0) {
      setRiceScore(0);
      return;
    }
    const score = (formData.reach * formData.impact * formData.confidence) / formData.effort;
    setRiceScore(score);
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8">Feature Request Form</h1>

          {/* Navigation */}
          <div className="flex space-x-1 border-b mb-6">
            {['problem', 'rice', 'solution', 'summary'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 font-medium transition-colors
                  ${activeSection === section 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-500'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Problem Section */}
          {activeSection === 'problem' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Feature Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter feature title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Problem Statement</label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="Describe the problem this feature will solve"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Current Solution</label>
                <textarea
                  name="currentSolution"
                  value={formData.currentSolution}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="How are users currently handling this?"
                />
              </div>
            </div>
          )}

          {/* RICE Score Section */}
          {activeSection === 'rice' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Reach (Monthly Users)</label>
                <input
                  type="number"
                  name="reach"
                  value={formData.reach}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  min="0"
                  placeholder="How many users will this affect?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Impact</label>
                <select
                  name="impact"
                  value={formData.impact}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="0">Select impact level</option>
                  <option value="3">3 - Massive: Transformative change (e.g., revamping checkout flow)</option>
                  <option value="2">2 - High: Major improvement (e.g., redesigning primary dashboard)</option>
                  <option value="1">1 - Medium: Moderate improvement (e.g., adding auto-save)</option>
                  <option value="0.5">0.5 - Low: Incremental improvement (e.g., UI tweaks)</option>
                  <option value="0.25">0.25 - Minimal: Small enhancement (e.g., cosmetic changes)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confidence</label>
                <select
                  name="confidence"
                  value={formData.confidence}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="0">Select confidence level</option>
                  <option value="1">1.0 (100%): We have extensive data, successful test results, or strong user validation</option>
                  <option value="0.8">0.8 (80%): We have some good data, but some assumptions are untested</option>
                  <option value="0.5">0.5 (50%): We're making an educated guess; limited data available</option>
                  <option value="0.3">0.3 (30%): We only have anecdotal evidence or a hunch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Effort</label>
                <select
                  name="effort"
                  value={formData.effort}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="0">Select effort level</option>
                  <option value="1">Tiny (1) - Quick fix, few days or less</option>
                  <option value="2">Small (2) - Up to two weeks</option>
                  <option value="3">Medium (3) - About one month</option>
                  <option value="5">Large (5) - One to two months</option>
                  <option value="8">Extra Large (8) - Two+ months</option>
                </select>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
                  <h4 className="font-medium mb-3">Effort Level Guide:</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-blue-600">Tiny (1 month)</p>
                      <p>A quick fix or change - done in a few days or less.</p>
                      <p className="text-gray-600">Like changing a light bulb in one room.</p>
                      <p className="text-gray-600">Example: Tweaking a button label or color</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-600">Small (2 months)</p>
                      <p>Still small, but may take up to two weeks.</p>
                      <p className="text-gray-600">Like redecorating a small office.</p>
                      <p className="text-gray-600">Example: Adding a simple setting or minor feature</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-600">Medium (3 months)</p>
                      <p>Around a month of work; involves several tasks.</p>
                      <p className="text-gray-600">Like renovating one room in your house.</p>
                      <p className="text-gray-600">Example: Building a new screen or enhancing a flow</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-600">Large (5 months)</p>
                      <p>1–2 months; multiple people or teams involved.</p>
                      <p className="text-gray-600">Like remodeling your kitchen.</p>
                      <p className="text-gray-600">Example: Overhauling a major section of the product</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-600">Extra Large (8 months)</p>
                      <p>2+ months; major project affecting many areas.</p>
                      <p className="text-gray-600">Like building a new house from the ground up.</p>
                      <p className="text-gray-600">Example: Creating an entirely new product line</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">RICE Score: {riceScore.toFixed(2)}</h3>
                <p className="text-gray-600">{renderScoreExplanation()}</p>
              </div>
            </div>
          )}

          {/* Solution Section */}
          {activeSection === 'solution' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Proposed Solution</label>
                <textarea
                  name="proposedSolution"
                  value={formData.proposedSolution}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="Describe your proposed solution"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Who will benefit?</label>
                <textarea
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg h-24"
                  placeholder="List the user groups who will benefit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alternative Solutions</label>
                <textarea
                  name="alternatives"
                  value={formData.alternatives}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg h-24"
                  placeholder="What other solutions did you consider?"
                />
              </div>
            </div>
          )}

          {/* Summary Section */}
          {activeSection === 'summary' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Feature Overview</h3>
                <div className="space-y-3">
                  <p><span className="font-medium">Title:</span> {formData.title || 'Not provided'}</p>
                  <p><span className="font-medium">Problem:</span> {formData.problem || 'Not provided'}</p>
                  <p><span className="font-medium">Current Solution:</span> {formData.currentSolution || 'Not provided'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">RICE Analysis</h3>
                <div className="space-y-3">
                  <p><span className="font-medium">RICE Score:</span> {riceScore.toFixed(2)}</p>
                  <p><span className="font-medium">Priority Level:</span> {renderScoreExplanation()}</p>
                  <p><span className="font-medium">Reach:</span> {formData.reach} users/month</p>
                  <p><span className="font-medium">Impact:</span> {formData.impact}</p>
                  <p><span className="font-medium">Confidence:</span> {formData.confidence * 100}%</p>
                  <p><span className="font-medium">Effort:</span> {formData.effort} person-months</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Solution Details</h3>
                <div className="space-y-3">
                  <p><span className="font-medium">Proposed Solution:</span> {formData.proposedSolution || 'Not provided'}</p>
                  <p><span className="font-medium">Beneficiaries:</span> {formData.beneficiaries || 'Not provided'}</p>
                  <p><span className="font-medium">Alternatives:</span> {formData.alternatives || 'Not provided'}</p>
                </div>
              </div>

              <button 
                onClick={() => alert('Feature request submitted successfully!')}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit Feature Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
