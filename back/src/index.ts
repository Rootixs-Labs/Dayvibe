import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando 🚀' });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});