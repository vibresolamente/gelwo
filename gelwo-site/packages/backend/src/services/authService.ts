import { prisma } from '../db';
import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';

export class AuthService {
  static async registerUser(email: string, passwordPlain: string, firstName?: string, lastName?: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(passwordPlain, 10);
    
    // Assign CUSTOMER role by default
    let defaultRole = await prisma.role.findUnique({ where: { name: 'CUSTOMER' } });
    if (!defaultRole) {
      defaultRole = await prisma.role.create({
        data: { name: 'CUSTOMER', description: 'Default customer role' }
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        roles: {
          create: {
            roleId: defaultRole.id
          }
        }
      },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    return newUser;
  }

  static async verifyCredentials(email: string, passwordPlain: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) return null;
    
    const isValid = await bcrypt.compare(passwordPlain, user.passwordHash);
    if (!isValid) return null;

    return user;
  }

  static generateTokens(fastify: FastifyInstance, user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map((ur: any) => ur.role.name)
    };

    const accessToken = fastify.jwt.sign(payload, { expiresIn: '15m' });
    const refreshToken = fastify.jwt.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
