export const setCurrentUserId = (userId) => {
  // Postavlja ID korisnika u localStorage
  localStorage.setItem('currentUserId', userId);
};

export const getCurrentUsername = () => {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  return user?.name || 'Nepoznat korisnik';
};

export const setCurrentUsername = (user) => {
  localStorage.setItem('loggedUser', JSON.stringify(user));
};

export const getCurrentUserId = () => {
  return parseInt(localStorage.getItem('currentUserId'), 10);
};

export const updateUser = (userId, updatedUser) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.map((user) => (user.id === userId ? updatedUser : user));
  localStorage.setItem('users', JSON.stringify(updatedUsers));
};