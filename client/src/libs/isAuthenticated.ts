import { StorageKeys, StorageService } from "./storageService.ts";

export const isAuthenticated = () => !!StorageService.getItem(StorageKeys.token, true);
