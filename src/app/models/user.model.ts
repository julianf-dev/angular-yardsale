export interface User{
  id: string;
  name: string;
  string: string;
  password:string;
}

export interface CreateUserDTO extends Omit<User, 'id'>{
}
