import { Song, OptimalLeaveTime } from '../types/Concert';

export const calculateOptimalLeaveTime = (setlist: Song[]): OptimalLeaveTime => {
  const encoreIndex = setlist.findIndex(song => song.isEncore);
  
  if (encoreIndex === -1) {
    // No encore, suggest leaving after 80% of show
    const eightyPercentIndex = Math.floor(setlist.length * 0.8);
    const timeRemaining = setlist.slice(eightyPercentIndex).reduce((acc, song) => acc + song.duration, 0);
    return {
      leaveAfter: setlist[eightyPercentIndex - 1]?.title || 'Unknown',
      timeRemaining
    };
  }
  
  const timeRemaining = setlist.slice(encoreIndex).reduce((acc, song) => acc + song.duration, 0);
  return {
    leaveAfter: setlist[encoreIndex - 1]?.title || 'Last main set song',
    timeRemaining
  };
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};