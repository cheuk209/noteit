export interface User {
  id: string;
  name: string;
  avatar: string;
  concertsAttended: number;
}

export interface ConcertConnection {
  id: string;
  user: User;
  concertId: string;
  willAttend: boolean;
  hasAttended: boolean;
  sharedExperience?: string;
}