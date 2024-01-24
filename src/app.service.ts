import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Request, Response } from 'express'
import { User } from './auth/schemas/user.schema'
import { Model } from 'mongoose'
import { JwtManagerService } from './core/services/jwtmanager.service'

@Injectable()
export class AppService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly jwtManagerService: JwtManagerService,
	) {}

	async homePage(req: Request, res: Response) {
		if (req.headers.cookie === undefined) {
			return {
				title: 'Sign in',
			}
		}

		const jwt = req.headers.cookie.split('=')[1]

		const decodeJwt = await this.jwtManagerService.verifyAsyncJwtToken(jwt)

		const getUser = await this.userModel.findOne({
			accessToken: decodeJwt.payload,
		})

		return {
			title: 'Signed in successfully',
			user: getUser,
		}
	}

	async authPage() {
		return {
			title: 'Sign in',
		}
	}
}
