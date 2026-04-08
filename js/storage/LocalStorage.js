const LocalStorageService = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Ошибка сохранения в LocalStorage", e);
        }
    },

    get(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
};

export default LocalStorageService;
