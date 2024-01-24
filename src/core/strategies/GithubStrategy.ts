import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { Model } from 'mongoose'
import { Profile, Strategy } from 'passport-github2'
import { User } from 'src/auth/schemas/user.schema'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
		super({
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.GITHUB_CALLBACK_URL,
			scope: ['user:email'],
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		const { username, emails } = profile
		const user = {
			email: emails[0].value,
			username,
			accessToken,
		}

		await this.userModel.findOneAndUpdate(
			{ email: user.email, provider: 'github' },
			{
				providerSaveId: profile.id,
				userName: profile.username,
				email: profile.emails[0].value,
				provider: 'github',
				avatar: profile.photos[0].value,
				createdAt: profile['_json'].created_at,
				updatedAt: profile['_json'].updated_at,
				accessToken: user.accessToken,
			},
			{ upsert: true },
		)

		return user
	}
}
