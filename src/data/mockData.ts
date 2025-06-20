import { Concert, ConcertConnection, ConcertReview } from '../types';

export const mockConcert: Concert = {
  id: '1',
  artist: 'Arctic Monkeys',
  venue: 'Madison Square Garden',
  date: '2025-07-15',
  city: 'New York, NY',
  tourName: 'The Car Tour 2025',
  estimatedDuration: 120,
  averageRating: 4.6,
  totalRatings: 234,
  setlist: [
    { id: '1', title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', duration: 4 },
    { id: '2', title: 'Brianstorm', artist: 'Arctic Monkeys', duration: 3 },
    { id: '3', title: 'Snap Out of It', artist: 'Arctic Monkeys', duration: 3 },
    { id: '4', title: 'Crying Lightning', artist: 'Arctic Monkeys', duration: 4 },
    { id: '5', title: 'Teddy Picker', artist: 'Arctic Monkeys', duration: 3 },
    { id: '6', title: 'Cornerstone', artist: 'Arctic Monkeys', duration: 3 },
    { id: '7', title: 'Fluorescent Adolescent', artist: 'Arctic Monkeys', duration: 3 },
    { id: '8', title: 'When the Sun Goes Down', artist: 'Arctic Monkeys', duration: 3 },
    { id: '9', title: "Why'd You Only Call Me When You're High?", artist: 'Arctic Monkeys', duration: 3 },
    { id: '10', title: 'Mardy Bum', artist: 'Arctic Monkeys', duration: 3 },
    { id: '11', title: 'I Bet You Look Good on the Dancefloor', artist: 'Arctic Monkeys', duration: 3 },
    { id: '12', title: 'Arabella', artist: 'Arctic Monkeys', duration: 3 },
    { id: '13', title: 'One Point Perspective', artist: 'Arctic Monkeys', duration: 4 },
    { id: '14', title: 'Tranquility Base Hotel & Casino', artist: 'Arctic Monkeys', duration: 4 },
    { id: '15', title: 'Four Out of Five', artist: 'Arctic Monkeys', duration: 4 },
    { id: '16', title: 'The Ultracheese', artist: 'Arctic Monkeys', duration: 4, isEncore: true },
    { id: '17', title: 'R U Mine?', artist: 'Arctic Monkeys', duration: 3, isEncore: true },
    { id: '18', title: '505', artist: 'Arctic Monkeys', duration: 4, isEncore: true },
  ]
};

export const mockConnections: ConcertConnection[] = [
  {
    id: '1',
    user: { id: '1', name: 'Sarah M.', avatar: '👩‍🎤', concertsAttended: 47 },
    concertId: '1',
    willAttend: true,
    hasAttended: false,
    sharedExperience: 'Going with my sister! Third time seeing Arctic Monkeys'
  },
  {
    id: '2',
    user: { id: '2', name: 'Mike R.', avatar: '🎸', concertsAttended: 23 },
    concertId: '1',
    willAttend: true,
    hasAttended: true,
    sharedExperience: 'Amazing show! The energy was incredible'
  },
  {
    id: '3',
    user: { id: '3', name: 'Emma K.', avatar: '🎵', concertsAttended: 15 },
    concertId: '1',
    willAttend: true,
    hasAttended: false
  }
];

export const mockReviews: ConcertReview[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Mike R.',
    rating: 5,
    comment: "Absolutely phenomenal performance! The sound quality was perfect and Alex Turner's vocals were on point.",
    date: '2025-07-16',
    likes: 12
  },
  {
    id: '2',
    userId: '4',
    userName: 'Lisa T.',
    rating: 4,
    comment: 'Great setlist mix of old and new. Crowd was amazing, though venue was a bit crowded.',
    date: '2025-07-16',
    likes: 8
  }
];