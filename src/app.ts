import './types';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import blockedEmailRoutes from './routes/blocked-email.routes';

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://jonathanvictor-dev.github.io'
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      };

      return callback(
        new Error(`Origin não permitida: ${origin}`),
      );
    }
  }),
);

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
