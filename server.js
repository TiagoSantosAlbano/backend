require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Log environment variables for debugging
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? 'Carregado' : 'Não definido');
console.log('🌍 MONGO_URI:', MONGO_URI ? 'Carregado' : 'Não definido');
console.log('🚀 PORT:', PORT);

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8081', // Adjust to your Expo/React Native dev server or production URL
  credentials: true, // Allow cookies/credentials if needed
}));

// Validate environment variables
if (!MONGO_URI) {
  console.error('❌ ERRO: MONGO_URI não está definido no .env!');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ ERRO: JWT_SECRET não está definido no .env!');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('🔥 MongoDB conectado!'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('🎾 API do Padel Matchmaking está em andamento!');
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Error handling middleware (optional, for better debugging)
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.stack);
  res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
});