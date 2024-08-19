import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema/user.schema';
import { LoginDto, SignupDto } from './dto/auth.dto/auth.dto';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password, name } = signupDto;

    const user = new this.userModel({ email, password, name });

    try {
      await user.save();
      return this.generateTokens(user);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new ConflictException('Validation failed');
      } else if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw error;
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  private async generateTokens(user: User): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload = { sub: user._id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRATION }),
      };
    } catch (error) {
      console.error('Error generating tokens: ', error);
      throw new UnauthorizedException('Could not generate tokens');
    }
  }
  

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userModel.findById(payload.sub);
      if (!user) throw new UnauthorizedException();
      return {
        access_token: this.jwtService.sign({ sub: user._id, email: user.email }, { expiresIn: process.env.JWT_EXPIRATION }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
