export function useLocalStorage() {
  function setItemL(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  }

  function getItemL(key, defaultValue) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error getting localStorage item:", error);
      return defaultValue;
    }
  }

  function removeItemL(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  }

  return { setItemL, getItemL, removeItemL };
}

export function useSessionStorage() {
  function setItemS(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting sessionStorage item:", error);
    }
  }

  function getItemS(key, defaultValue) {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error getting sessionStorage item:", error);
      return defaultValue;
    }
  }

  function removeItemS(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing sessionStorage item:", error);
    }
  }

  return { setItemS, getItemS, removeItemS };
}
