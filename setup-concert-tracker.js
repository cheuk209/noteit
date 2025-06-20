#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Directory structure
const directories = [
  'src',
  'src/components',
  'src/components/common',
  'src/components/setlist',
  'src/components/connections',
  'src/components/reviews',
  'src/types',
  'src/services',
  'src/hooks',
  'src/utils',
  'src/data'
];

// File contents
const files = {
  // Package.json
  'package.json': `{
  "name": "concert-tracker",
  "version": "1.0.0",
  "description": "Mobile app for frequent concert goers",
  "main": "src/index.tsx",
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "build": "tsc && react-native run-android --variant=release",
    "test": "jest",
    "lint": "eslint src/**/*.{ts,tsx}",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.72.0",
    "react-native-vector-icons": "^10.0.3",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/bottom-tabs": "^6.5.8",
    "react-native-safe-area-context": "^4.7.1",
    "react-native-screens": "^3.22.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.72.0",
    "@types/react-native-vector-icons": "^6.4.13",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.45.0",
    "jest": "^29.5.0",
    "typescript": "^5.1.0"
  }
}`,

  // TypeScript config
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@types/*": ["types/*"],
      "@services/*": ["services/*"],
      "@hooks/*": ["hooks/*"],
      "@utils/*": ["utils/*"],
      "@data/*": ["data/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build"]
}`,

  // Types
  'src/types/Concert.ts': `export interface Song {
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
}`,

  'src/types/User.ts': `export interface User {
  id: string;
  name: string;
  avatar: string;
  concertsAttended: number;
}

export interface ConcertConnection {
  id: string;
  user: User;
  concertId: string;
  willAttend: boolean;
  hasAttended: boolean;
  sharedExperience?: string;
}`,

  'src/types/Review.ts': `export interface ConcertReview {
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
}`,

  'src/types/index.ts': `export * from './Concert';
export * from './User';
export * from './Review';`,

  // Utils
  'src/utils/timeCalculations.ts': `import { Song, OptimalLeaveTime } from '../types/Concert';

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
  return hours > 0 ? \`\${hours}h \${mins}m\` : \`\${mins}m\`;
};`,

  'src/utils/constants.ts': `export const TABS = {
  SETLIST: 'setlist',
  CONNECTIONS: 'connections',
  REVIEWS: 'reviews'
} as const;

export type TabType = typeof TABS[keyof typeof TABS];

export const ATTENDANCE_STATUS = {
  WILL_ATTEND: 'will_attend',
  HAS_ATTENDED: 'has_attended',
  INTERESTED: 'interested'
} as const;`,

  // Services
  'src/services/concertService.ts': `import { Concert } from '../types/Concert';
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
}`,

  'src/services/userService.ts': `import { ConcertConnection } from '../types/User';
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
}`,

  'src/services/reviewService.ts': `import { ConcertReview, NewReviewData } from '../types/Review';
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
}`,

  // Hooks
  'src/hooks/useConcert.ts': `import { useState, useEffect } from 'react';
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
};`,

  'src/hooks/useConnections.ts': `import { useState, useEffect } from 'react';
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
};`,

  'src/hooks/useReviews.ts': `import { useState, useEffect } from 'react';
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
};`,

  // Data
  'src/data/mockData.ts': `import { Concert, ConcertConnection, ConcertReview } from '../types';

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
];`,

  // Components
  'src/components/common/StarRating.tsx': `import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  interactive = false, 
  onRate,
  size = 20
}) => {
  const renderStar = (starNumber: number) => {
    const isFilled = starNumber <= rating;
    
    if (interactive) {
      return (
        <TouchableOpacity 
          key={starNumber}
          onPress={() => onRate && onRate(starNumber)}
          style={{ marginHorizontal: 1 }}
        >
          <Icon
            name="star"
            size={size}
            color={isFilled ? '#FCD34D' : '#D1D5DB'}
          />
        </TouchableOpacity>
      );
    }

    return (
      <Icon
        key={starNumber}
        name="star"
        size={size}
        color={isFilled ? '#FCD34D' : '#D1D5DB'}
        style={{ marginHorizontal: 1 }}
      />
    );
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(renderStar)}
    </View>
  );
};`,

  'src/components/common/Header.tsx': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Concert } from '../../types/Concert';
import { StarRating } from './StarRating';

interface HeaderProps {
  concert: Concert;
}

export const Header: React.FC<HeaderProps> = ({ concert }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Icon name="music-note" size={24} color="white" />
        <Text style={styles.appTitle}>ConcertTracker</Text>
      </View>
      <View style={styles.concertInfo}>
        <Text style={styles.artistName}>{concert.artist}</Text>
        <View style={styles.infoRow}>
          <Icon name="location-on" size={16} color="rgba(255,255,255,0.9)" />
          <Text style={styles.infoText}>{concert.venue}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="event" size={16} color="rgba(255,255,255,0.9)" />
          <Text style={styles.infoText}>{concert.date} • {concert.city}</Text>
        </View>
        <View style={styles.ratingRow}>
          <StarRating rating={Math.round(concert.averageRating)} size={16} />
          <Text style={styles.reviewText}>({concert.totalRatings} reviews)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8B5CF6',
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
  },
  concertInfo: {
    marginTop: 8,
  },
  artistName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reviewText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
});`,

  'src/components/common/TabNavigation.tsx': `import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabType, TABS } from '../../utils/constants';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: TABS.SETLIST, label: 'Setlist', icon: 'schedule' },
    { id: TABS.CONNECTIONS, label: 'Connections', icon: 'people' },
    { id: TABS.REVIEWS, label: 'Reviews', icon: 'star' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(({ id, label, icon }) => (
        <TouchableOpacity
          key={id}
          style={[
            styles.tab,
            activeTab === id && styles.activeTab
          ]}
          onPress={() => onTabChange(id)}
        >
          <Icon
            name={icon}
            size={16}
            color={activeTab === id ? '#8B5CF6' : '#6B7280'}
          />
          <Text style={[
            styles.tabLabel,
            activeTab === id && styles.activeTabLabel
          ]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#8B5CF6',
  },
});`,

  // README
  'README.md': `# ConcertTracker

A mobile application for frequent concert goers with three core features:

## Features

1. **Setlist & Optimal Leave Time** - View expected setlists and get recommendations for the best time to leave to avoid crowds
2. **Concert Connections** - Connect with other attendees going to the same shows/tours
3. **Performance Rating** - Rate and review concert performances

## Project Structure

\`\`\`
src/
├── components/         # React components organized by feature
│   ├── common/        # Reusable UI components
│   ├── setlist/       # Setlist-related components
│   ├── connections/   # User connection components
│   └── reviews/       # Review and rating components
├── types/             # TypeScript type definitions
├── services/          # API service layer
├── hooks/             # Custom React hooks
├── utils/             # Utility functions and constants
└── data/              # Mock data for development
\`\`\`

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm start
\`\`\`

3. Run on device:
\`\`\`bash
npm run android  # for Android
npm run ios      # for iOS
\`\`\`

## Development

- \`npm run type-check\` - Run TypeScript type checking
- \`npm run lint\` - Run ESLint
- \`npm test\` - Run tests

## Architecture

This project follows a clean architecture pattern with:
- **Service Layer** for API interactions
- **Custom Hooks** for state management
- **Component Composition** for reusable UI
- **Type Safety** with comprehensive TypeScript coverage
`
};

// Main setup function
function setupProject() {
  log('🎵 Setting up Concert Tracker project...', 'blue');
  log('', 'reset');

  // Create directories
  log('📁 Creating directory structure...', 'yellow');
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log(`  ✓ Created ${dir}`, 'green');
    } else {
      log(`  • ${dir} already exists`, 'yellow');
    }
  });

  log('', 'reset');

  // Create files
  log('📄 Creating project files...', 'yellow');
  Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(process.cwd(), filePath);
    const dir = path.dirname(fullPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write file
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content, 'utf8');
      log(`  ✓ Created ${filePath}`, 'green');
    } else {
      log(`  • ${filePath} already exists (skipping)`, 'yellow');
    }
  });

  log('', 'reset');
  log('🎉 Concert Tracker project setup complete!', 'green');
  log('', 'reset');
  log('Next steps:', 'bold');
  log('1. npm install', 'blue');
  log('2. npm start', 'blue');
  log('3. npm run android (or ios)', 'blue');
  log('', 'reset');
  log('Happy coding! 🚀', 'green');
}

// Error handling
process.on('uncaughtException', (error) => {
  log(`❌ Error: ${error.message}`, 'red');
  process.exit(1);
});

// Run setup
if (require.main === module) {
  setupProject();
}

module.exports = { setupProject };