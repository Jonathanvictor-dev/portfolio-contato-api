import './types';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import blockedEmailRoutes from './routes/blocked-email.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Portfolio Contato API',
  });
});

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.use('/blocked-emails', blockedEmailRoutes);

export { app };
