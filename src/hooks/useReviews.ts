import { useState, useEffect } from 'react';
import { ConcertReview, NewReviewData } from '../types/Review';
import { ReviewService } from '../services/reviewService';

export const useReviews = (concertId: string) => {
  const [reviews, setReviews] = useState<ConcertReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await ReviewService.getReviewsForConcert(concertId);
        setReviews(reviewsData);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [concertId]);

  const submitReview = async (reviewData: NewReviewData) => {
    try {
      const newReview = await ReviewService.submitReview(concertId, reviewData);
      setReviews(prev => [newReview, ...prev]);
      return true;
    } catch (err) {
      console.error('Failed to submit review:', err);
      return false;
    }
  };

  const likeReview = async (reviewId: string) => {
    try {
      await ReviewService.likeReview(reviewId);
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, likes: review.likes + 1 }
          : review
      ));
    } catch (err) {
      console.error('Failed to like review:', err);
    }
  };

  return { reviews, loading, submitReview, likeReview };
};