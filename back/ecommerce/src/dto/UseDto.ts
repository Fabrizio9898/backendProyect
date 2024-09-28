import { IsEmail } from "class-validator";

interface userDto {
  email: string;

  name: string;

  password: string;

  address: string;

  phone: string;

  country?: string | undefined;

  city?: string | undefined;
}

export default userDto;


export class CreateUserDto{
  @IsEmail()
  email: string;

  name: string;

  password: string;

  address: string;

  phone: string;

  country?: string | undefined;

  city?: string | undefined;
}

export class UpdateUserDto{
  
}