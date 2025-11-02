const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [
  { id: 1, name: 'Chocolate Bar', price: 2.5, stock: 20 },
  { id: 2, name: 'Gummy Bears', price: 1.5, stock: 30 },
  { id: 3, name: 'Lollipop', price: 0.5, stock: 100 }
];

let orders = [];
let customers = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/orders', (req, res) => {
  const { customerName, items } = req.body;
  const order = {
    id: orders.length + 1,
    customerName,
    items,
    date: new Date().toISOString()
  };
  orders.push(order);
  res.json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/customers', (req, res) => {
  const { name } = req.body;
  const customer = { id: customers.length + 1, name };
  customers.push(customer);
  res.json(customer);
});

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});