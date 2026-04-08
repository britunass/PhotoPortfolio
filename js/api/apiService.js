class ApiService {
    constructor(baseURL, apikey = null) {
        this.baseURL = baseURL;
        this.apikey = apikey;
    }

    async get(endpoint, params = {}) {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `${this.baseURL}${endpoint}${queryParams ? '?' + queryParams : ''}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Client-ID ${this.apikey}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    async fetchFromAPI(endpoint, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Client-ID ${this.apikey}`
            }
        };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...defaultOptions,
                ...options
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

export default ApiService;