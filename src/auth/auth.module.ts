import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GithubStrategy } from 'src/core/strategies/GithubStrategy'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'
import { JwtManagerService } from 'src/core/services/jwtmanager.service'
import { GoogleStrategy } from 'src/core/strategies/GoogleStrategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, GithubStrategy, GoogleStrategy, JwtManagerService],
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	exports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
})
export class AuthModule {}
