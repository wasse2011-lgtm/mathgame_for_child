const CACHE_NAME = ‘tamagogame-v1’;
const ASSETS = [
‘./’,
‘./index.html’,
‘./manifest.json’,
‘./icons/icon-72.png’,
‘./icons/icon-96.png’,
‘./icons/icon-128.png’,
‘./icons/icon-144.png’,
‘./icons/icon-152.png’,
‘./icons/icon-192.png’,
‘./icons/icon-256.png’,
‘./icons/icon-512.png’,
];

// インストール時にすべてキャッシュ
self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener(‘activate’, event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

// リクエスト: キャッシュ優先（オフライン動作）
self.addEventListener(‘fetch’, event => {
event.respondWith(
caches.match(event.request).then(cached => cached || fetch(event.request))
);
});
