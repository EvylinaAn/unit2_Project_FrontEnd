import { createPinia } from 'pinia';

const pinia = createPinia();

export const useAuthStore = pinia.createStore({
  state: () => ({
    isLoggedIn: false,
    userName: '',
  }),
  actions: {
    login(userData) {
      this.isLoggedIn = true;
      this.userName = userData.given_name;
    },
    logout() {
      this.isLoggedIn = false;
      this.userName = '';
    },
  },
});

export { pinia };