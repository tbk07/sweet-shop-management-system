const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

let app;
beforeEach(() => {
  app = express();
  app.use(bodyParser.json());
  let products = [
    { id: 1, name: 'Chocolate Bar', price: 2.5, stock: 20 }
  ];
  app.get('/api/products', (req, res) => res.json(products));
});

test('GET /api/products returns product list', async () => {
  const res = await request(app).get('/api/products');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body[0].name).toBe('Chocolate Bar');
});