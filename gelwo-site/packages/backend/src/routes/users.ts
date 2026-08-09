import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '../db';

const userRoutes: FastifyPluginAsync = async (fastify, opts) => {
  // Decorate the request with user info from JWT
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get('/me', async (request, reply) => {
    const userPayload = request.user as any;
    
    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return reply.send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles.map(ur => ur.role.name)
      }
    });
  });
};

export default userRoutes;
