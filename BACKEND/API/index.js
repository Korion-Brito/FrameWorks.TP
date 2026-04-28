const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 🔓 CORS (libera acesso do frontend)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "HEAD, GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 📦 Permitir JSON
app.use(express.json());

// 🔗 Rotas
const routes = require('./Routes/routes');
app.use('/api', routes);

// 🌐 Porta dinâmica (obrigatório no Render)
const PORT = process.env.PORT || 3000;

// 🗄️ Conexão com MongoDB (via variável de ambiente)
mongoose.connect(process.env.MONGO_URI);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', (error) => {
  console.log("Erro ao conectar no MongoDB:", error);
});

db.once('connected', () => {
  console.log("✅ Database Connected");
});

// 🚀 Start do servidor
app.listen(PORT, () => {
  console.log(`🚀 Server Started at ${PORT}`);
});