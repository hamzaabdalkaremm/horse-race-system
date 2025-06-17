export interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  ownerId: string;
  ownerName: string;
  trainerId?: string;
  trainerName?: string;
  color: string;
  weight: number;
  wins: number;
  races: number;
  image?: string;
}

export interface Race {
  id: string;
  name: string;
  date: string;
  time: string;
  distance: number;
  ageCategory: string;
  maxHorses: number;
  registeredHorses: string[];
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  prize: number;
  location: string;
  organizerId: string;
  organizerName: string;
}

export interface RaceResult {
  id: string;
  raceId: string;
  raceName: string;
  horseId: string;
  horseName: string;
  position: number;
  time: string;
  jockeyName: string;
  penalties?: string;
  notes?: string;
  judgeId: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Statistics {
  totalRaces: number;
  totalHorses: number;
  totalOwners: number;
  upcomingRaces: number;
  topHorses: Array<{horse: Horse;wins: number;}>;
  topOwners: Array<{ownerName: string;wins: number;}>;
  recentResults: RaceResult[];
}