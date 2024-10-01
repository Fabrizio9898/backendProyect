import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import IUser from '../../interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from 'src/dto/UseDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/dto/LoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class UserRepository {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService:JwtService
    ) {}

    public omitPassword(user: IUser): Omit<IUser, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  
 
  async changeAdmin(id:string) {
    const user = await this.userRepository.findOneBy(
       { id },
    );

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.isAdmin=true
    await this.userRepository.save(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }
  
  
  async getUsers(page: number, limit: number): Promise<Omit<User, 'password'>[]> {
    
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }


  async signIn(userData:any) {


 // Transformar userData a una instancia de LoginUserDto
 const loginUserDto = plainToInstance(LoginUserDto, userData);

 // Validar loginUserDto manualmente
 const validationErrors = validateSync(loginUserDto);

 if (validationErrors.length > 0) {
   // Si hay errores de validación, lanzar excepción con "Credenciales inválidas"
   throw new BadRequestException('Credenciales inválidas');
 }


    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
  
   
    const isPasswordValid = existingUser
      ? await bcrypt.compare(userData.password, existingUser.password)
      : false;
  
    if (!existingUser || !isPasswordValid) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const roleOfUser = existingUser.isAdmin ? ['admin'] : ['user'];

    const payload = { sub: existingUser.id, email: existingUser.email ,
    roles:roleOfUser};  

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async signUp(user: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({where:{
      email:user.email
    }});
    if (existingUser) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hashed');
    }

    try {
      const newUser = await this.userRepository.save({
        ...user,
        password: hashedPassword,
      });
      const { password, ...userNoPassword } = newUser;
      return userNoPassword;
    } catch (error) {
      console.error('Error al crear el usuario:', error); 
      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      await this.userRepository.update(id, user);
      const updatedUser = await this.userRepository.findOneBy({ id });
      const { password, ...userNoPassword } = updatedUser;
      return userNoPassword;
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      await this.userRepository.remove(user);
      const { password, ...userNoPassword } = user;
      return userNoPassword;
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        'Usuario no encontrado con este email',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
