import { Controller, Get, Render, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { AppService } from './app.service'

@Controller('')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/')
	@Render('home')
	homePage(@Req() req: Request, @Res() res: Response) {
		return this.appService.homePage(req, res)
	}

	@Get('/auth')
	@Render('auth')
	authPage(@Req() req: Request, @Res() res: Response) {
		return this.appService.authPage()
	}
}
