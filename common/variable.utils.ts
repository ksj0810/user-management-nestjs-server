export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserType {
  USER = 'USER',
}

export enum HistoryType {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum AccountStatus {
  ACTIVE = '활동계정',
  INACTIVE = '비활동계정',
  LOGOUT = '로그아웃',
}

export interface DateComponent {
  year: string;
  month: string;
  day: string;
  hour: string;
  min: string;
  sec: string;
  milSec: string;
}

export interface SecurityPassword {
  salt: string;
  hashedPassword: string;
}
