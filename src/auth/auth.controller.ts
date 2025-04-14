import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  Signup(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.createUser(authCredentialDto);
  }

  @Post('/signin')
  Signin(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signin(authCredentialDto);
  }
}
