import { Concert } from '../types/Concert';
import { mockConcert } from '../data/mockData';

export class ConcertService {
  static async getConcert(id: string): Promise<Concert | null> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id === '1' ? mockConcert : null);
      }, 500);
    });
  }

  static async getConcertsByArtist(artist: string): Promise<Concert[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([mockConcert]);
      }, 500);
    });
  }

  static async searchConcerts(query: string): Promise<Concert[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([mockConcert]);
      }, 500);
    });
  }
}