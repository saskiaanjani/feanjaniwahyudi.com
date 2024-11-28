export const isAuthenticated = () => {
    return !!localStorage.getItem('authTokenSitusNews');
  };