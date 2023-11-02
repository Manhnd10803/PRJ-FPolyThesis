// get item from local storage
export function load<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from local storage:', error);
    return null;
  }
}

// set item in local storage
export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting data in local storage:', error);
  }
}

// remove item from local storage
export function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data from local storage:', error);
  }
}

// clear local storage
export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing local storage:', error);
  }
}
