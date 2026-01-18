const CACHE_NAME = 'insect-explorer-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Jua&family=Nanum+Gothic:wght@400;700;800&display=swap'
];

// 설치 이벤트 - 캐시 저장
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] All files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Cache install failed:', error);
      })
  );
});

// 활성화 이벤트 - 오래된 캐시 정리
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[SW] Activated and claimed clients');
      return self.clients.claim();
    })
  );
});

// fetch 이벤트 - 네트워크 요청 처리
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 같은 origin에 대해서만 처리 (CDN 외부 리소스는 통과)
  if (url.origin !== self.location.origin) {
    // CDN 리소스는 캐시 우선, 네트워크 폴백
    if (url.href.includes('cdn.tailwindcss.com') || url.href.includes('fonts.googleapis.com')) {
      event.respondWith(
        caches.match(request).then((response) => {
          return response || fetch(request).catch(() => null);
        })
      );
    }
    return;
  }

  // 네비게이션 요청 (페이지 이동) - 항상 index.html로 폴백
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 응답이 유효하면 캐시에 저장
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패 시 캐시된 index.html 반환
          console.log('[SW] Network failed, trying cache for navigation');
          return caches.match('./index.html').then((cached) => {
            if (cached) {
              return cached;
            }
            // 캐시에도 없으면 오프라인 페이지 대신 index.html 시도
            return caches.match('./').then((rootCached) => {
              return rootCached || new Response('Offline - App not cached', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({ 'Content-Type': 'text/plain' })
              });
            });
          });
        })
    );
    return;
  }

  // 기타 리소스 요청 - 캐시 우선, 네트워크 폴백
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          // 유효한 응답인지 확인
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 응답을 복제하여 캐시에 저장
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          console.log('[SW] Fetch failed:', error);
          // 이미지 등의 경우 캐시에 없으면 실패 반환
          return null;
        });
    })
  );
});
