export const TABS = {
  SETLIST: 'setlist',
  CONNECTIONS: 'connections',
  REVIEWS: 'reviews'
} as const;

export type TabType = typeof TABS[keyof typeof TABS];

export const ATTENDANCE_STATUS = {
  WILL_ATTEND: 'will_attend',
  HAS_ATTENDED: 'has_attended',
  INTERESTED: 'interested'
} as const;