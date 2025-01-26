import React, { createContext, useContext, useCallback } from 'react';
import { petsData as petsDataFromApp } from '../data/pets';
import { initialReservations as reservationsDataFromApp } from '../data/reservations';
import { users as usersDataFromApp } from '../data/users';

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const saveDataToLocalStorage = useCallback(() => {
        localStorage.clear();
        localStorage.setItem('pets', JSON.stringify(petsDataFromApp));
        localStorage.setItem('reservations', JSON.stringify(reservationsDataFromApp));
        localStorage.setItem('users', JSON.stringify(usersDataFromApp));
    }, []);

    const loadDataFromLocalStorage = useCallback(() => {
        if (localStorage.getItem('pets') !== null && (JSON.stringify(localStorage.getItem('pets')).length !== JSON.stringify(petsDataFromApp).length ||
            JSON.stringify(localStorage.getItem('reservations')).length !== JSON.stringify(reservationsDataFromApp).length ||
            JSON.stringify(localStorage.getItem('users')).length !== JSON.stringify(usersDataFromApp).length)) {
            const petsFromStorage = JSON.parse(localStorage.getItem('pets'));
            const reservationsFromStorage = JSON.parse(localStorage.getItem('reservations'));
            const usersFromStorage = JSON.parse(localStorage.getItem('users'));
            alert("loadujem postojece");
            petsDataFromApp.length = 0;
            reservationsDataFromApp.length = 0;
            usersDataFromApp.length = 0;

            petsFromStorage.forEach((pet) => petsDataFromApp.push(pet));
            reservationsFromStorage.forEach((reservation) => reservationsDataFromApp.push(reservation));
            usersFromStorage.forEach((user) => usersDataFromApp.push(user));
            alert(JSON.stringify(reservationsDataFromApp))
        } else {
            alert("loadujem prvi put");
            alert(JSON.stringify(reservationsDataFromApp))
            saveDataToLocalStorage();
        }
    }, [saveDataToLocalStorage]);

    return (
        <DataContext.Provider
            value={{
                saveDataToLocalStorage,
                loadDataFromLocalStorage
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
