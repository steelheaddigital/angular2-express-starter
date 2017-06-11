import {validate, IsNotEmpty, IsEmail} from "class-validator";

export interface Profile{
  name: string;
  role: string;
}

export interface Token{
  id: number;
  role: string;
}

export class User {
  id: number;
  
  @IsNotEmpty({
    message: 'Name cannot be empty'
  })
  name: string;
  
  @IsNotEmpty({
    message: 'Email cannot be empty'
  })
  @IsEmail(null, {
    message: 'Email is not valid'
  })
  email: string;
  
  @IsNotEmpty({
    message: 'Password cannot be empty'
  })
  password: string;
  
  @IsNotEmpty({
    message: 'Salt cannot be empty'
  })
  salt: string;
  
  @IsNotEmpty({
    message: 'Role cannot be empty'
  })
  role: string;
  
  @IsNotEmpty({
    message: 'Provider cannot be empty'
  })
  provider: string;
  
  facebook: string;
  
  public profile = (): Profile => {
    return {
      name: this.name,
      role: this.role
    }
  }
  
  public token = (): Token => {
    return {
      id: this.id,
      role: this.role
    }
  }
}