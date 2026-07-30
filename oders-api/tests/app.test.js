const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {

    test('Health endpoint should return UP', async () => {
        const response = await request(app).get('/health');

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('UP');
    });

    test('Orders endpoint should return data', async () => {
        const response = await request(app).get('/orders');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

});