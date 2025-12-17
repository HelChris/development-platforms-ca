const AUTH_KEY = "user";

export const authService = {
  isAuthenticated() {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  },

  login(userData) {
    const user = {
      id: userData.id || "123",
      name: userData.name || userData.email,
      email: userData.email,
      token: userData.token || "fake-jwt-token",
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  //logout user
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  //get current user
  getUser() {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  },
};
