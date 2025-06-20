import React from 'react';
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
});