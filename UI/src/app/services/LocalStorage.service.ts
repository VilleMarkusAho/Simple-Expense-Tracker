import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

// Defined used keys for local storage for better type safety and maintainability
export enum LocalStorageKey {
  USER = 'user'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: LocalStorageKey, value: string | object): void {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  }

  getItem<T>(key: LocalStorageKey): T | null {
    const itemString = localStorage.getItem(key);

    if (itemString === null) {
      return null;
    }

    return JSON.parse(itemString) as T;
  }

  getUser(): IUser | null {
    return this.getItem<IUser>(LocalStorageKey.USER);
  }
}
