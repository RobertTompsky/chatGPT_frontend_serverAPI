export const getItemFromLocalStorage = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const setItemInLocalStorage = <T>(key: string, value: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};

export const removeItemFromLocalStorage = (key: string): void => { 
    try { 
        localStorage.removeItem(key); 
    } catch (error) { 
        console.log(error); 
    } 
};

export const clearLocalStorage = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log(error);
    }
};