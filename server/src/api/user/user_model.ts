import {validate, NotEmpty, IsEmail} from "class-validator";

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
  
  @NotEmpty({
    message: 'Name cannot be empty'
  })
  name: string;
  
  @NotEmpty({
    message: 'Email cannot be empty'
  })
  @IsEmail(null, {
    message: 'Email is not valid'
  })
  email: string;
  
  @NotEmpty({
    message: 'Password cannot be empty'
  })
  password: string;
  
  @NotEmpty({
    message: 'Salt cannot be empty'
  })
  salt: string;
  
  @NotEmpty({
    message: 'Role cannot be empty'
  })
  role: string;
  
  @NotEmpty({
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