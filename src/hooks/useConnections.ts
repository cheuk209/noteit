import { useState, useEffect } from 'react';
import { ConcertConnection } from '../types/User';
import { UserService } from '../services/userService';

export const useConnections = (concertId: string) => {
  const [connections, setConnections] = useState<ConcertConnection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const connectionsData = await UserService.getConnectionsForConcert(concertId);
        setConnections(connectionsData);
      } catch (err) {
        console.error('Failed to load connections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [concertId]);

  const connectWithUser = async (userId: string) => {
    try {
      await UserService.connectWithUser(userId);
      // Update local state or refetch
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  return { connections, loading, connectWithUser };
};