import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { AuthService } from '../services/authService';

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as any;
    
    const user = await AuthService.verifyCredentials(email, password);
    if (!user) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = AuthService.generateTokens(fastify, user);

    // In a real app, store refreshToken in the Session table
    return reply.send({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles.map(ur => ur.role.name)
        }
      }
    });
  });

  fastify.post('/register', async (request, reply) => {
    const { email, password, firstName, lastName } = request.body as any;

    try {
      const newUser = await AuthService.registerUser(email, password, firstName, lastName);
      return reply.status(201).send({
        success: true,
        data: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName
        }
      });
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  });
};

export default authRoutes;
