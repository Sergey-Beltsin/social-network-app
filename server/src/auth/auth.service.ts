import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entites/users.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { validate } from 'class-validator';
import { EMAIL_OR_PASSWORD_INCORRECT } from './auth.constants';
import { compareSync, hash } from 'bcrypt';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async login(
    user: UserLoginDto,
  ): Promise<{ message: { email: string; access_token: string } }> {
    validate(user).then((errors) => {
      if (errors.length > 0) {
        throw new HttpException(errors.join(', '), HttpStatus.BAD_REQUEST);
      }
    });

    const userDetails = await this.usersRepository.findOne({
      email: user.email,
    });

    if (!userDetails) {
      throw new HttpException(
        EMAIL_OR_PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValid: boolean = compareSync(user.password, userDetails.password);

    if (!isValid) {
      throw new HttpException(
        EMAIL_OR_PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: {
        email: user.email,
        access_token: this.jwtService.sign({
          email: user.email,
          sub: userDetails.id,
        }),
      },
    };
  }

  async create(user: UserCreateDto): Promise<{ message: string }> {
    const userDTO = { ...user, password: await hash(user.password, 10) };

    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        throw new HttpException(errors.join(', '), HttpStatus.BAD_REQUEST);
      }
    });

    await this.usersRepository.save(userDTO).catch((error) => {
      console.log(error);
      throw new HttpException('alreadyExists', HttpStatus.BAD_REQUEST);
    });

    return {
      message: 'User created success',
    };
  }
}
