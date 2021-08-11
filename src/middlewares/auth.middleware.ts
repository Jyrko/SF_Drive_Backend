import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor (private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    const authHeader = req.get("Authorization");
    if (!authHeader) throw new UnauthorizedException();

    const accessToken = authHeader.split(" ")[1];
    try {
      const data = this.jwtService.verify(accessToken);
      console.log(data);

      if (!data) {
        throw new UnauthorizedException();
      }
      res.locals.id = data.id;
      // req.locals.id = data.id;
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
