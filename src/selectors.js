export const getUsers = state => state.users;
export const getLoggedUserId = state => state.auth;
export const getLoggedUser = state => getusers(state[getLoggedUserId(state)]);

