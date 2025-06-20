import React from 'react';
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
};