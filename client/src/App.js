import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(res => res.json())
      .then(setProducts);

    fetch('http://localhost:4000/api/orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  function handleOrder() {
    fetch('http://localhost:4000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName,
        items: selectedItems
      })
    })
      .then(res => res.json())
      .then(order => {
        setOrders([...orders, order]);
        setSelectedItems([]);
      });
  }

  function handleCheckboxChange(id) {
    setSelectedItems(items =>
      items.includes(id)
        ? items.filter(item => item !== id)
        : [...items, id]
    );
  }

  return (
    <div>
      <h1>Sweet Shop Management System</h1>

      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(p.id)}
              onChange={() => handleCheckboxChange(p.id)}
            />
            {p.name} - ${p.price} (Stock: {p.stock})
          </li>
        ))}
      </ul>

      <h2>Place Order</h2>
      <input
        placeholder="Customer Name"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
      />
      <button onClick={handleOrder}>Order</button>

      <h2>Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            Order #{o.id} by {o.customerName} at {o.date}
            <ul>
              {o.items.map(itemId => {
                const prod = products.find(p => p.id === itemId);
                return <li key={itemId}>{prod ? prod.name : 'Unknown'}</li>;
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;