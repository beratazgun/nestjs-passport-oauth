import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

@Injectable()
export class JwtManagerService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	/**
	 * Create a JWT token
	 */
	createJwtToken<TPayload>(payload: TPayload): string {
		return this.jwtService.sign(
			{ payload },
			{ secret: this.configService.get<string>('JWT_SECRET') },
		)
	}

	/**
	 * Verify a JWT token asynchronously
	 */
	async verifyAsyncJwtToken(token: string): Promise<any> {
		return await this.jwtService.verifyAsync(token, {
			secret: this.configService.get<string>('JWT_SECRET'),
		})
	}

	/**
	 * Send a JWT token server to client
	 */
	async sendJwtToken(res: Response, jwtToken: string): Promise<void> {
		res.cookie('jwt', jwtToken, {
			httpOnly: false,
			secure: this.configService.get<string>('NODE_ENV') === 'production',
			maxAge: this.configService.get<number>('JWT_EXPIRATION'),
			expires: new Date(
				Date.now() + this.configService.get<number>('JWT_EXPIRATION') * 1000,
			),
			sameSite: 'lax',
		})
	}
}
