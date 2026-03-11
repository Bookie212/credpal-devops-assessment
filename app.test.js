const request = require('supertest');
const app = require('./app'); // correct path

describe('GET /health', () => {
    it('should return 200 with healthy status', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'healthy');
        expect(res.body).toHaveProperty('uptime');
    });
});

describe('GET /status', () => {
    it('should return 200 with running status', async () => {
        const res = await request(app).get('/status');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'running');
        expect(res.body).toHaveProperty('environment');
        expect(res.body).toHaveProperty('timestamp');
    });
});

describe('POST /process', () => {
    it('should return 200 when data is provided', async () => {
        const res = await request(app).post('/process')
            .send({ data: 'test data' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Data processed successfully');
        expect(res.body).toHaveProperty('received', 'test data');
    });

    it('should return 400 when data is missing', async () => {
        const res = await request(app).post('/process')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Missing required field: data');
    });
});