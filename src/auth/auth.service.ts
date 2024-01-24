import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { NextFunction, Request, Response } from 'express'
import { JwtManagerService } from 'src/core/services/jwtmanager.service'
import { User } from './schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtManagerService: JwtManagerService,
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	/**
	 * Github Signin Callback
	 * @param req
	 * @param res
	 */
	async githubSigninCallback(req: Request, res: Response) {
		let accessToken: string = ''

		if (req.user['accessToken']) {
			accessToken = req.user['accessToken']

			const jwtToken = this.jwtManagerService.createJwtToken(accessToken)

			await this.jwtManagerService.sendJwtToken(res, jwtToken)

			return res.redirect(`http://localhost:3000`)
		}
	}

	/**
	 * Google Signin Callback
	 * @param req
	 * @param res
	 */
	async googleSigninCallback(req: Request, res: Response) {
		let accessToken: string = ''

		if (req.user['accessToken']) {
			accessToken = req.user['accessToken']

			const jwtToken = this.jwtManagerService.createJwtToken(accessToken)

			await this.jwtManagerService.sendJwtToken(res, jwtToken)

			return res.redirect(`http://localhost:3000`)
		}
	}

	/**
	 * Logout
	 * @param req
	 * @param res
	 * @param next
	 */
	async logout(req: Request, res: Response, next: NextFunction) {
		const jwt = req.headers.authorization.split(' ')[1]

		if (jwt) {
			const decodejwt = await this.jwtManagerService.verifyAsyncJwtToken(jwt)

			await this.userModel.findOneAndUpdate(
				{ accessToken: decodejwt.payload },
				{ accessToken: '' },
			)

			res.clearCookie('jwt')

			return res.status(200).json({
				isSuccess: true,
			})
		}
	}
}
