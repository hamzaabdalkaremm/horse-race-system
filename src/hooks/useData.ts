import { useState, useEffect } from 'react';
import { Horse, Race, RaceResult, Notification } from '@/types';

// Mock data
const mockHorses: Horse[] = [
{
  id: '1',
  name: 'البرق الأصيل',
  breed: 'عربي أصيل',
  age: 5,
  ownerId: '3',
  ownerName: 'فاطمة الخيل',
  trainerName: 'سعد المدرب',
  color: 'كستنائي',
  weight: 450,
  wins: 12,
  races: 20
},
{
  id: '2',
  name: 'نسيم الصحراء',
  breed: 'عربي مختلط',
  age: 4,
  ownerId: '3',
  ownerName: 'فاطمة الخيل',
  trainerName: 'أحمد الخبير',
  color: 'أشقر',
  weight: 420,
  wins: 8,
  races: 15
},
{
  id: '3',
  name: 'فارس الشام',
  breed: 'عربي أصيل',
  age: 6,
  ownerId: '6',
  ownerName: 'خالد الفارس',
  trainerName: 'محمد الأسطورة',
  color: 'أدهم',
  weight: 480,
  wins: 15,
  races: 18
}];


const mockRaces: Race[] = [
{
  id: '1',
  name: 'كأس الملك للخيول العربية',
  date: '2024-12-25',
  time: '15:00',
  distance: 2000,
  ageCategory: '4 سنوات فما فوق',
  maxHorses: 12,
  registeredHorses: ['1', '2', '3'],
  status: 'upcoming',
  prize: 100000,
  location: 'ميدان الرياض',
  organizerId: '2',
  organizerName: 'محمد السباق'
},
{
  id: '2',
  name: 'سباق الأمير للمهرات',
  date: '2024-12-20',
  time: '16:30',
  distance: 1600,
  ageCategory: '3-5 سنوات',
  maxHorses: 10,
  registeredHorses: ['1', '2'],
  status: 'completed',
  prize: 75000,
  location: 'ميدان جدة',
  organizerId: '2',
  organizerName: 'محمد السباق'
}];


const mockResults: RaceResult[] = [
{
  id: '1',
  raceId: '2',
  raceName: 'سباق الأمير للمهرات',
  horseId: '1',
  horseName: 'البرق الأصيل',
  position: 1,
  time: '1:38.45',
  jockeyName: 'أحمد الفارس',
  judgeId: '4',
  createdAt: '2024-12-20T16:45:00Z'
},
{
  id: '2',
  raceId: '2',
  raceName: 'سباق الأمير للمهرات',
  horseId: '2',
  horseName: 'نسيم الصحراء',
  position: 2,
  time: '1:39.12',
  jockeyName: 'محمد السريع',
  judgeId: '4',
  createdAt: '2024-12-20T16:45:00Z'
}];


export const useData = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [results, setResults] = useState<RaceResult[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const savedHorses = localStorage.getItem('horseRaceHorses');
    const savedRaces = localStorage.getItem('horseRaceRaces');
    const savedResults = localStorage.getItem('horseRaceResults');
    const savedNotifications = localStorage.getItem('horseRaceNotifications');

    setHorses(savedHorses ? JSON.parse(savedHorses) : mockHorses);
    setRaces(savedRaces ? JSON.parse(savedRaces) : mockRaces);
    setResults(savedResults ? JSON.parse(savedResults) : mockResults);
    setNotifications(savedNotifications ? JSON.parse(savedNotifications) : []);
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addHorse = (horse: Omit<Horse, 'id'>) => {
    const newHorse = { ...horse, id: Date.now().toString() };
    const updatedHorses = [...horses, newHorse];
    setHorses(updatedHorses);
    saveToStorage('horseRaceHorses', updatedHorses);
    return newHorse;
  };

  const updateHorse = (id: string, updates: Partial<Horse>) => {
    const updatedHorses = horses.map((horse) =>
    horse.id === id ? { ...horse, ...updates } : horse
    );
    setHorses(updatedHorses);
    saveToStorage('horseRaceHorses', updatedHorses);
  };

  const addRace = (race: Omit<Race, 'id'>) => {
    const newRace = { ...race, id: Date.now().toString() };
    const updatedRaces = [...races, newRace];
    setRaces(updatedRaces);
    saveToStorage('horseRaceRaces', updatedRaces);
    return newRace;
  };

  const updateRace = (id: string, updates: Partial<Race>) => {
    const updatedRaces = races.map((race) =>
    race.id === id ? { ...race, ...updates } : race
    );
    setRaces(updatedRaces);
    saveToStorage('horseRaceRaces', updatedRaces);
  };

  const registerHorseToRace = (raceId: string, horseId: string) => {
    const race = races.find((r) => r.id === raceId);
    if (race && race.registeredHorses.length < race.maxHorses) {
      const updatedRaces = races.map((r) =>
      r.id === raceId ?
      { ...r, registeredHorses: [...r.registeredHorses, horseId] } :
      r
      );
      setRaces(updatedRaces);
      saveToStorage('horseRaceRaces', updatedRaces);
      return true;
    }
    return false;
  };

  const addResult = (result: Omit<RaceResult, 'id'>) => {
    const newResult = { ...result, id: Date.now().toString() };
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    saveToStorage('horseRaceResults', updatedResults);
    return newResult;
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    saveToStorage('horseRaceNotifications', updatedNotifications);
  };

  return {
    horses,
    races,
    results,
    notifications,
    addHorse,
    updateHorse,
    addRace,
    updateRace,
    registerHorseToRace,
    addResult,
    addNotification
  };
};