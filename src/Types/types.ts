export interface User {
  id: number;
  name: string;
  email: string;
  refreshjwt: string;
}

export interface Expanse {
  id: number;
  userId: number;
  user: User;
  spentAt: Date;
  title: string;
  amount: number;
  category: string;
  note: string;
}
