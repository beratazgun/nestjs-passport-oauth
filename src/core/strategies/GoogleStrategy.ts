import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { Model } from 'mongoose'
import { DoneCallback } from 'passport'
import { Strategy, Profile } from 'passport-google-oauth20'
import { User } from 'src/auth/schemas/user.schema'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			scope: ['email', 'profile'],
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: DoneCallback,
	) {
		const { name, emails, photos } = profile
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			userName: name.givenName + name.familyName,
			avatar: photos[0].value,
			accessToken,
			provider: 'google',
		}

		await this.userModel.findOneAndUpdate(
			{ email: user.email, provider: 'google' },
			{
				...user,
			},
			{ upsert: true },
		)

		return user
	}
}
