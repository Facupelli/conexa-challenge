import { Controller, Get } from '@nestjs/common';

@Controller({ version: '1', path: 'protected' })
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'HOLA MUNDO';
  }
}
