const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3001; 

app.use(bodyParser.json());

// Load initial data from JSON files
let plansData = JSON.parse(fs.readFileSync('./plans.json'));
let activationsData = JSON.parse(fs.readFileSync('./activations.json'));

// GET endpoint to fetch all plans
app.get('/api/plans', (req, res) => {
  res.json(plansData.plans);
});

// POST endpoint to activate a plan
app.post('/api/activate/:planId', (req, res) => {
  const planId = req.params.planId;
  const activationStartTime = new Date().toISOString();

  // Simulate storing activation data in activations.json
  const activationData = {
    planId,
    activationStartTime,
  };
  activationsData.activations.push(activationData);

  
  fs.writeFileSync('./activations.json', JSON.stringify(activationsData, null, 2));

  res.json({ message: 'Activation successful', activation: activationData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
