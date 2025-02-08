import React, { useState } from 'react';

export default function FeatureRequestForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    impact: '',
    reach: 1,
    confidence: 1,
    effort: 1
  });

  const [riceScore, setRiceScore] = useState(0);

  const calculateRICE = () => {
    const score = (formData.reach * formData.impact * formData.confidence) / formData.effort;
    setRiceScore(Math.round(score * 100) / 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRICE();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Feature Request Form</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Feature Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Reach (1-10)</label>
              <input
                type="number"
                name="reach"
                min="1"
                max="10"
                value={formData.reach}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Impact (1-10)</label>
              <input
                type="number"
                name="impact"
                min="1"
                max="10"
                value={formData.impact}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confidence (1-10)</label>
              <input
                type="number"
                name="confidence"
                min="1"
                max="10"
                value={formData.confidence}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Effort (1-10)</label>
              <input
                type="number"
                name="effort"
                min="1"
                max="10"
                value={formData.effort}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-lg font-medium">RICE Score: {riceScore}</p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate RICE Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
