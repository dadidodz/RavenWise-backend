import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { sessions, users } from '@clerk/clerk-sdk-node';
import { Request } from 'express';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou invalide');
    }

    const token = authHeader.split(' ')[1];
    const apiKey = "" + process.env.CLERK_API_KEY;

    try {
      // Vérifier et décoder le token via Clerk
      const session = await sessions.verifySession(token, apiKey);
      if (!session) {
        throw new UnauthorizedException('Session invalide');
      }

      // Récupérer l'utilisateur Clerk
      const user = await users.getUser(session.userId);

      // Injecter dans la requête
      request['clerkUser'] = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Token Clerk invalide ou expiré');
    }
  }
}
