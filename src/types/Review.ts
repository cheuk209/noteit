export interface ConcertReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export interface NewReviewData {
  rating: number;
  comment: string;
}