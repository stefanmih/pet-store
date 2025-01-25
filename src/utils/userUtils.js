export const getCurrentUserId = () => {
    // Pretpostavka: ID korisnika je sačuvan u cookie-u ili localStorage
    // Ovde ćemo koristiti localStorage za primer
    return localStorage.getItem('currentUserId');
  };
  
  export const setCurrentUserId = (userId) => {
    // Postavlja ID korisnika u localStorage
    localStorage.setItem('currentUserId', userId);
  };

  export const getCurrentUsername = () => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    return user?.name || 'Nepoznat korisnik';
  };
  