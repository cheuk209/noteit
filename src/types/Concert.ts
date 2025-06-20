export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in minutes
  isEncore?: boolean;
}

export interface Concert {
  id: string;
  artist: string;
  venue: string;
  date: string;
  city: string;
  tourName: string;
  setlist: Song[];
  estimatedDuration: number;
  averageRating: number;
  totalRatings: number;
}

export interface OptimalLeaveTime {
  leaveAfter: string;
  timeRemaining: number;
}