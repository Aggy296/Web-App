try {
  require('./instrumentation');
} catch {
  console.log('OpenTelemetry disabled');
}

const express = require('express');

const app = express();

app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

app.get('/orders', (req, res) => {
    res.json([
        { id: 1, item: 'Laptop' },
        { id: 2, item: 'Mouse' }
    ]);
});

module.exports = app;