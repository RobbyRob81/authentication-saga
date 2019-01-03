
/*
Get current logged user object using a stater selector
*/

export const getUsers = state => state.users;
export const getLoggedUserId = state => state.auth;
export const getLoggedUser = state => getUsers(state[getLoggedUserId(state)]);

