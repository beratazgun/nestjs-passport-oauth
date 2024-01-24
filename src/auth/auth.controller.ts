import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GithubAuthGuard } from 'src/core/guards/GithubAuth.guard'
import { NextFunction, Request, Response } from 'express'
import { GoogleAuthGuard } from 'src/core/guards/GoogleAuth.guard'

@Controller('/')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(GithubAuthGuard)
	@Get('auth/signin/github')
	githubSigninPage() {}

	@Get('/account/github/logout')
	logout(
		@Req() req: Request,
		@Res() res: Response,
		@Next() next: NextFunction,
	) {
		return this.authService.logout(req, res, next)
	}

	@UseGuards(GithubAuthGuard)
	@Get('api/v1/auth/o/github/callback')
	githubSigninCallback(@Req() req: Request, @Res() res: Response) {
		return this.authService.githubSigninCallback(req, res)
	}

	@UseGuards(GoogleAuthGuard)
	@Get('auth/signin/google')
	googleSigninPage() {}

	@UseGuards(GoogleAuthGuard)
	@Get('api/v1/auth/o/google/callback')
	googleSigninCallback(@Req() req: Request, @Res() res: Response) {
		return this.authService.googleSigninCallback(req, res)
	}
}
