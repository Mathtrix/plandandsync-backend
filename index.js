const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Calendar API running'));

server.listen(3001, () => {
  console.log('Backend listening on http://localhost:3001');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);