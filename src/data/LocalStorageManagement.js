import { petsData as defaultPetsData } from './pets';
import { initialReservations as defaultReservationsData } from './reservations';
import { users as defaultUsersData } from './users';

const LOCAL_STORAGE_KEYS = {
  pets: 'pets',
  reservations: 'reservations',
  users: 'users',
};

// Funkcija za inicijalizaciju localStorage ako je prazan
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

// Funkcija za čitanje podataka iz localStorage
export const getData = (key) => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
  return data ? JSON.parse(data) : null;
};

// Funkcija za ažuriranje podataka u localStorage
export const updateData = (key, newData) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS[key], JSON.stringify(newData));
};

// Funkcija za brisanje podataka iz localStorage
export const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.pets);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.reservations);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.users);
};
