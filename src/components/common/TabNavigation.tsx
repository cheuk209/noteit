import React from 'react';
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
});