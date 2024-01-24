import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useStaticAssets(join(__dirname, '..', 'src/core/public'))
	app.setBaseViewsDir(join(__dirname, '..', 'src/core/views'))
	app.setViewEngine('hbs')

	app.enableCors({
		credentials: true,
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST'],
	})

	await app.listen(3000)
}
bootstrap()
