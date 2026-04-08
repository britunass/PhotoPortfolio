
import { initGallery } from './components/modal.js';
import { initProject } from './components/slider.js';
import ApiService from './api/apiService.js';
import { API_CONFIG, FALLBACK_DATA } from './api/config.js'; 
import LocalStorageService from './storage/LocalStorage.js';
import { createElementFromData, parsePhotos } from './utils/dataParser.js';

let allPhotos = [];

function renderFavorites() {
    const container = document.getElementById('favorites-container');
    const favoriteIds = LocalStorageService.get('favorites') || [];
    if (favoriteIds.length === 0) {
        container.innerHTML = '<p class="empty-msg">Choose some favs!</p>';
        return;
    }
    container.innerHTML = '';
    const template = `
        <div class="gallery__item is-favorite">
            <figure class="gallery__figure" style="position: relative;">
                <img src="images/frame2picture{{id_num}}.png" id="{{id}}" class="gallery__image">
                <button class="favorite-btn">★</button> 
                <figcaption>ID: {{id}}</figcaption>
            </figure>
        </div>
    `;
    favoriteIds.forEach((id) => {
    const match = id.match(/\d+/); 
    const idNum = match ? match[0] : "1"; 
    const photoElement = createElementFromData({ 
        id: id, 
        id_num: idNum 
    }, template);
    container.appendChild(photoElement);
    });
}
class APITester {
    static testOfflineFunctionality(storageService) {
        try {
            const testData = { test: 'offline_data' };
            storageService.set('offline_test', testData);
            const retrieved = storageService.get('offline_test');
            const isPass = retrieved?.test === 'offline_data';
            console.log("--- Тест оффлайн-режима ---");
            console.log("Результат теста:", isPass ? "✓ PASS" : "✘ FAIL");
            return isPass;
        } catch (e) {
            console.log("X Error: ", e.message);
            return false;
        }
    }
}

const unsplashApi = new ApiService(API_CONFIG.unsplash.url, API_CONFIG.unsplash.apiKey);

async function loadUnsplashPhotos() {
    const container = document.getElementById('unsplash-gallery'); 
    if (!container) return;
    try {
        const response = await unsplashApi.get(API_CONFIG.unsplash.endpoints.photos, { per_page: 8 });
        allPhotos = parsePhotos(response);
        console.log('Данные из Unsplash получены:', allPhotos);
        renderUnsplash(allPhotos);
    } catch (err) {
        console.error('Unsplash недоступен, показываю запасные фото API:', err);
        allPhotos = parsePhotos(FALLBACK_DATA.unsplash);
        renderUnsplash(allPhotos);
    }
}

function renderUnsplash(photos) {
    const container = document.getElementById('unsplash-gallery');
    container.innerHTML = '';
    const unsplashTemplate = `
        <div class="gallery__item">
            <figure class="gallery__figure">
                <img src="{{url}}" id="{{id}}" class="gallery__image" alt="{{alt}}">
                <figcaption>Photo by Unsplash</figcaption>
            </figure>
        </div>
    `;
    photos.forEach(photo => {
        const element = createElementFromData(photo, unsplashTemplate);
        container.appendChild(element);
    });
}

function setupFavorites() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite-btn')) {
            const btn = e.target;
            const item = btn.closest('.gallery__item');
            if (!item) return;

            const img = item.querySelector('.gallery__image');
            const photoId = img.id; 

            if (!photoId) return;

            let favorites = LocalStorageService.get('favorites') || [];

            if (favorites.includes(photoId)) {
                favorites = favorites.filter(id => id !== photoId);
                console.log(`Удалено из избранного: ${photoId}`);
            } else {
                favorites.push(photoId);
                console.log(`Добавлено в избранное: ${photoId}`);
            }
            LocalStorageService.set('favorites', favorites);
            syncAllStars(photoId, favorites.includes(photoId));
            renderFavorites();
        }
    });
}

function syncAllStars(photoId, isFavorite) {
    const allImagesWithId = document.querySelectorAll(`.gallery__image[id="${photoId}"]`);
    allImagesWithId.forEach(img => {
        const item = img.closest('.gallery__item');
        if (item) {
            const btn = item.querySelector('.favorite-btn');
            if (btn) {
                btn.textContent = isFavorite ? '★' : '☆';
                isFavorite ? item.classList.add('is-favorite') : item.classList.remove('is-favorite');
            }
        }
    });
}

function initApp() {
    APITester.testOfflineFunctionality(LocalStorageService);
    loadUnsplashPhotos();
    initGallery();
    initProject();
    const favoriteIds = LocalStorageService.get('favorites') || [];
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach(item => {
        const img = item.querySelector('.gallery__image');
        if (!img) return;
        const photoId = img.id;
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        if (favoriteIds.includes(photoId)) {
            favoriteBtn.textContent = '★';
            item.classList.add('is-favorite');
        } else {
            favoriteBtn.textContent = '☆';
        }
        const figure = item.querySelector('.gallery__figure');
        if (figure) {
            figure.style.position = 'relative';
            figure.appendChild(favoriteBtn);
        }
    });
    setupFavorites();
    renderFavorites(); 
}
document.addEventListener('DOMContentLoaded', initApp);
