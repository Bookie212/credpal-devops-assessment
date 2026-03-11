const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('CredPal DevOps Assessment');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/status', (req, res) => {
    res.status(200).json({
        status: 'running',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

app.post('/process', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Missing required field: data' });
    }
    res.status(200).json({ message: 'Data processed successfully', received: data });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Exporting for testing purposes