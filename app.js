

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/plans');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleActivatePlan = async (planId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/activate/${planId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      alert(`Plan activated successfully at ${data.activation.activationStartTime}`);
      // Optionally, update UI or state to reflect activation
    } catch (error) {
      console.error('Error activating plan:', error);
    }
  };

  return (
    <div className="App">
      <h1>Inflight Internet Plans</h1>
      <div className="plans-container">
        {plans.map(plan => (
          <div className="plan" key={plan.id}>
            <h2>{plan.name}</h2>
            <p>Duration: {plan.duration} hours</p>
            <p>Data Limit: {plan.dataLimit} GB</p>
            <p>Cost: ${plan.cost}</p>
            <button onClick={() => handleActivatePlan(plan.id)}>Activate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
