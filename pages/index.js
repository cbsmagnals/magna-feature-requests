import React from 'react';

export default function HomePage() {
  // This is our main page component
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Feature Request Form</h1>
      
      {/* A simple paragraph explaining the purpose */}
      <p>Welcome! Use this form to submit your feature requests.</p>
      
      {/* Basic form with just one input field to start */}
      <form style={{ marginTop: '20px' }}>
        <div>
          <label htmlFor="featureDescription">
            Describe your feature request:
          </label>
          <br />
          <textarea
            id="featureDescription"
            style={{
              width: '100%',
              minHeight: '100px',
              marginTop: '10px',
              padding: '8px'
            }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
