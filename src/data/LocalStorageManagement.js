import { petsData as defaultPetsData } from './pets';
import { initialReservations as defaultReservationsData } from './reservations';
import { users as defaultUsersData } from './users';

const LOCAL_STORAGE_KEYS = {
  pets: 'pets',
  reservations: 'reservations',
  users: 'users',
};

export const initializeLocalStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.pets)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.pets, JSON.stringify(defaultPetsData));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.reservations)) {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.reservations,
      JSON.stringify(defaultReservationsData)
    );
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.users)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.users, JSON.stringify(defaultUsersData));
  }
};

export const getData = (key) => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
  return data ? JSON.parse(data) : null;
};

export const updateData = (key, newData) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS[key], JSON.stringify(newData));
};

export const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.pets);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.reservations);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.users);
};
