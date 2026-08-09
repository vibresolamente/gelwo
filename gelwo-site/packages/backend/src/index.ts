import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

dotenv.config();

const fastify = Fastify({
  logger: true
});

// Plugins
fastify.register(cors, {
  origin: true // Allow all for dev
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'super-secret-change-me'
});

// Health check
fastify.get('/api/v1/health', async () => {
  return { status: 'ok', timestamp: new Date() };
});

// Routes
fastify.register(authRoutes, { prefix: '/api/v1/auth' });
fastify.register(userRoutes, { prefix: '/api/v1/users' });

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Fastify server running on http://localhost:4000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
