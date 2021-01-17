import store from '@/store';

// helper examples

const requiresAuth = (value) => new Promise((resolve) => {
  const hasToken = localStorage.getItem('token');

  if (!value) resolve(false);

  if (!hasToken) {
    resolve({
      name: 'Login',
    });
  } else if (!store.getters['isLoggedIn']) {
    store.dispatch('refreshToken').then(() => {
      resolve(false);
    }).catch(() => {
      resolve({
        name: 'Login',
      });
    });
  } else {
    resolve(false);
  }
});

const hasPermission = (value) => {
  if (
    (value && store.getters['hasPermission'])
    || (!value && !store.getters['hasPermission'])
  ) {
    return false;
  }

  return {
    name: 'Authorization',
  };
};

const requiredLevel = (value) => {
  if (value < 3) return false;
  return {
    name: 'Login',
  };
};

export default {
  requiresAuth,
  requiredLevel,
  hasPermission,
};
