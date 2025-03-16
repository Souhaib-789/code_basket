
class Storage {

    static setToken = token => {
        try {
            return localStorage.setItem('@token', token);
        } catch (e) {
            return null;
        }
    };

    static getToken = () => {
        try {
            return localStorage.getItem('@token');
        } catch (e) {
            return null;
        }
    };

    static setUser = (key, value) => {
        try {
            var Value = btoa(value);

            return localStorage.setItem(key, Value);
        } catch (e) {
            return null;
        }
    };
    static setERole = (key, value) => {
        try {
            var Value = btoa(value);

            return localStorage.setItem(key, Value);
        } catch (e) {
            return null;
        }
    };
    static getERole = key => {
        try {
            const data = localStorage.getItem(key);
            return atob(data);

        } catch (e) {
            return null;
        }
    };
    static setRole = (key, value) => {
        try {
            let Value = value.slice(1, value.length - 1);
            return localStorage.setItem(key, Value);
        } catch (e) {
            return null;
        }
    };

    static getUser = () => {
        try {
            return localStorage.getItem("@user");
        } catch (e) {
            return null;
        }
    };
    static set = (key, value) => {
        try {
            return localStorage.setItem(key, value);
        } catch (e) {
            return null;
        }
    };

    static get = key => {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    };

    static clearStorage = () => {
        try {
            localStorage.clear();
        } catch (e) {
            return null;
        }
    };

    static setLanguage = value => {
        try {
            return localStorage.setItem('@selectedLanguage', value);
        } catch (e) {
            return null;
        }
    };

}

export default Storage;