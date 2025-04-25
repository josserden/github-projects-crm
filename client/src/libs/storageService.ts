export const StorageService = {
  setItem: <T>(key: string, value: T, shouldStringify = true): void => {
    try {
      const valueToStore = shouldStringify ? JSON.stringify(value) : String(value);

      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error("localStorage setItem error:", error);
    }
  },

  getItem: <T>(key: string, parse = false): T | string | undefined => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) return undefined;

      if (parse) return JSON.parse(item) as T;

      return item;
    } catch (error) {
      console.error("localStorage getItem error:", error);
      return undefined;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("localStorage removeItem error:", error);
    }
  },
};

export const StorageKeys = {
  token: "github_crm_token",
  user: "github_crm_user",
};
