import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtModule } from '@nestjs/jwt'
import { User } from './auth/schemas/user.schema'
import { JwtManagerService } from './core/services/jwtmanager.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRATION,
			},
		}),
		MongooseModule.forRoot(
			process.env.NODE_ENV === 'development'
				? `mongodb://mongodb/oauth-passport` // Test
				: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, // Prod
		),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService, JwtManagerService],
})
export class AppModule {}
