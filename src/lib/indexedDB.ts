'use client'

import { useState, useEffect, useCallback } from "react";

const DB_NAME = 'conferenceTicketDB';
const STORE_NAME = 'formData';
const DB_VERSION = 1;


export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export function useIndexedDB<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial data from IndexedDB
  useEffect(() => {
    const loadInitialValue = async () => {
      try {
        setIsLoading(true);
        const db = await initDB();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => {
          const value = request.result;
          if (value !== undefined) {
            setStoredValue(value);
          }
          setIsLoading(false);
        };

        request.onerror = () => {
          throw new Error('Failed to load data from IndexedDB');
        };
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    loadInitialValue();
  }, [key]);

  // Save data to IndexedDB and update state
  const setValue = useCallback(async (valueOrFn: T | ((prev: T) => T)) => {
    try {
      // Update state first for immediate UI feedback
      const newValue = valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn;
      setStoredValue(newValue);

      // Then save to IndexedDB
      const db = await initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise<void>((resolve, reject) => {
        const request = store.put(newValue, key);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          // Rollback state if save fails
          setStoredValue(storedValue);
          reject(new Error('Failed to save data to IndexedDB'));
        };
      });
    } catch (err) {
      // Rollback state if save fails
      setStoredValue(storedValue);
      throw err;
    }
  }, [key, storedValue]);

  // Remove data from IndexedDB
  const removeValue = useCallback(async () => {
    try {
      const db = await initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise<void>((resolve, reject) => {
        const request = store.delete(key);

        request.onsuccess = () => {
          setStoredValue(initialValue);
          resolve();
        };

        request.onerror = () => {
          reject(new Error('Failed to remove data from IndexedDB'));
        };
      });
    } catch (err) {
      throw err;
    }
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    isLoading,
    error
  };
}

