import { useState, useEffect } from 'react';
import { Concert } from '../types/Concert';
import { ConcertService } from '../services/concertService';

export const useConcert = (concertId: string) => {
  const [concert, setConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        setLoading(true);
        const concertData = await ConcertService.getConcert(concertId);
        setConcert(concertData);
      } catch (err) {
        setError('Failed to load concert data');
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [concertId]);

  return { concert, loading, error };
};