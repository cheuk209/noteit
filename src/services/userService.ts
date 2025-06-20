import { ConcertConnection } from '../types/User';
import { mockConnections } from '../data/mockData';

export class UserService {
  static async getConnectionsForConcert(concertId: string): Promise<ConcertConnection[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockConnections.filter(conn => conn.concertId === concertId));
      }, 300);
    });
  }

  static async connectWithUser(userId: string): Promise<boolean> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }

  static async sendMessage(userId: string, message: string): Promise<boolean> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
}