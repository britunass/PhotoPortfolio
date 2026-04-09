export const API_CONFIG = {
    unsplash: {
        url: 'https://api.unsplash.com',
        apiKey: 'NZcPPJkfcwgTQLOBMKngU2Sj4WwIj3CwUKa_hV8femc', 
        endpoints: {
            photos: '/photos',
            search: '/search/photos',
            random: '/photos/random'
        }
    }
};

export const FALLBACK_DATA = {
    unsplash: [
        {
            id: 'p1',
            urls: { regular: 'images/frame2picture1.png' },
            alt_description: 'Deer (Fallback)',
            user: { name: 'Local Cache' }
        },
        {
            id: 'p2',
            urls: { regular: 'images/frame2picture2.png' },
            alt_description: 'Nature (Fallback)',
            user: { name: 'Local Cache' }
        }
    ]
};