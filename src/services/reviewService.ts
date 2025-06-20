import { ConcertReview, NewReviewData } from '../types/Review';
import { mockReviews } from '../data/mockData';

export class ReviewService {
  static async getReviewsForConcert(concertId: string): Promise<ConcertReview[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReviews);
      }, 300);
    });
  }

  static async submitReview(concertId: string, reviewData: NewReviewData): Promise<ConcertReview> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview: ConcertReview = {
          id: Date.now().toString(),
          userId: 'current-user',
          userName: 'You',
          rating: reviewData.rating,
          comment: reviewData.comment,
          date: new Date().toISOString().split('T')[0],
          likes: 0
        };
        resolve(newReview);
      }, 500);
    });
  }

  static async likeReview(reviewId: string): Promise<boolean> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }
}