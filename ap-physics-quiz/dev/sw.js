/**
 * Service Worker for AP Physics Quiz App
 * Provides offline functionality and caching for better performance
 */

const CACHE_NAME = 'ap-physics-quiz-v2.0.0';
const CACHE_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

// Files to cache for offline functionality
const STATIC_CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  
  // CSS files
  './css/styles-flexoki.css',
  './css/responsive.css',
  
  // JavaScript files
  './js/utils.js',
  './js/quiz-storage.js',
  './js/question-parser.js',
  './js/quiz-data.js',
  './js/quiz-ui.js',
  './js/progress-dashboard.js',
  './js/spaced-repetition.js',
  './js/teacher-panel.js',
  './js/enhanced-fill-questions-dropdown.js',
  './js/app.js',
  './js/advanced-question-types.js',
  
  // Data files
  './data/ap-physics-questions.csv',
  './data/earth-science-questions.csv',
  
  // External dependencies (CDN fallbacks)
  'https://cdn.jsdelivr.net/npm/marked@4.2.5/marked.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css'
];

// Dynamic content that should be cached when accessed
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/cdn\.jsdelivr\.net\//,
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:woff|woff2|ttf|eot)$/
];

/**
 * Install event - cache static resources
 */
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        
        // Cache files one by one to handle failures gracefully
        return Promise.allSettled(
          STATIC_CACHE_FILES.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`Failed to cache ${url}:`, error);
              return null;
            });
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Static files cached successfully');
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error during installation:', error);
      })
  );
});

/**
 * Activate event - cleanup old caches
 */
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log(`Service Worker: Deleting old cache ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        // Take control of all pages
        return self.clients.claim();
      })
      .catch(error => {
        console.error('Service Worker: Error during activation:', error);
      })
  );
});

/**
 * Fetch event - handle requests with cache-first strategy
 */
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  event.respondWith(
    handleFetchRequest(event.request)
  );
});

/**
 * Handle fetch requests with intelligent caching strategy
 * @param {Request} request - The fetch request
 * @return {Promise<Response>} Response from cache or network
 */
async function handleFetchRequest(request) {
  const url = new URL(request.url);
  
  try {
    // For HTML pages, use network-first strategy (for updates)
    if (request.headers.get('accept')?.includes('text/html')) {
      return await networkFirstStrategy(request);
    }
    
    // For API data (CSV files), use cache-first but validate freshness
    if (url.pathname.endsWith('.csv')) {
      return await cacheFirstWithFreshness(request);
    }
    
    // For static assets, use cache-first strategy
    if (isStaticAsset(url)) {
      return await cacheFirstStrategy(request);
    }
    
    // For external CDN resources, use cache-first with network fallback
    if (isDynamicCachePattern(url)) {
      return await cacheFirstStrategy(request);
    }
    
    // For everything else, try network first, then cache
    return await networkFirstStrategy(request);
    
  } catch (error) {
    console.error('Service Worker: Error handling request:', error);
    
    // Return offline fallback if available
    return getOfflineFallback(request);
  }
}

/**
 * Network-first caching strategy
 * @param {Request} request - The fetch request
 * @return {Promise<Response>} Response from network or cache
 */
async function networkFirstStrategy(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error(`Network response not ok: ${networkResponse.status}`);
    
  } catch (error) {
    // Fall back to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log(`Service Worker: Serving ${request.url} from cache (network failed)`);
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Cache-first caching strategy
 * @param {Request} request - The fetch request
 * @return {Promise<Response>} Response from cache or network
 */
async function cacheFirstStrategy(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log(`Service Worker: Serving ${request.url} from cache`);
    
    // Update cache in background if needed
    updateCacheInBackground(request);
    
    return cachedResponse;
  }
  
  // Fall back to network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      console.log(`Service Worker: Cached ${request.url} from network`);
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error(`Service Worker: Failed to fetch ${request.url}:`, error);
    throw error;
  }
}

/**
 * Cache-first with freshness validation
 * @param {Request} request - The fetch request
 * @return {Promise<Response>} Response from cache or network
 */
async function cacheFirstWithFreshness(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    const cacheDate = cachedResponse.headers.get('sw-cache-date');
    const isStale = !cacheDate || 
      (Date.now() - parseInt(cacheDate)) > CACHE_TIMEOUT;
    
    if (!isStale) {
      console.log(`Service Worker: Serving fresh ${request.url} from cache`);
      return cachedResponse;
    }
  }
  
  // Cache is stale or doesn't exist, try network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      const responseToCache = networkResponse.clone();
      
      // Add cache timestamp
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', Date.now().toString());
      
      const cachedResponseWithDate = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponseWithDate);
      console.log(`Service Worker: Updated cache for ${request.url}`);
    }
    
    return networkResponse;
    
  } catch (error) {
    // Network failed, return stale cache if available
    if (cachedResponse) {
      console.log(`Service Worker: Serving stale ${request.url} from cache (network failed)`);
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Update cache in background (fire and forget)
 * @param {Request} request - The request to update
 */
function updateCacheInBackground(request) {
  // Don't await this - fire and forget
  fetch(request)
    .then(response => {
      if (response.ok) {
        return caches.open(CACHE_NAME)
          .then(cache => cache.put(request, response));
      }
    })
    .catch(error => {
      // Silently fail - this is background update
      console.debug(`Background cache update failed for ${request.url}:`, error);
    });
}

/**
 * Check if URL is a static asset
 * @param {URL} url - The URL to check
 * @return {boolean} True if it's a static asset
 */
function isStaticAsset(url) {
  const staticExtensions = /\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/i;
  return staticExtensions.test(url.pathname);
}

/**
 * Check if URL matches dynamic cache patterns
 * @param {URL} url - The URL to check
 * @return {boolean} True if it matches dynamic cache patterns
 */
function isDynamicCachePattern(url) {
  return DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(url.href));
}

/**
 * Get offline fallback response
 * @param {Request} request - The original request
 * @return {Promise<Response>} Fallback response
 */
async function getOfflineFallback(request) {
  // For HTML requests, try to serve the main page
  if (request.headers.get('accept')?.includes('text/html')) {
    const cachedPage = await caches.match('./index.html');
    if (cachedPage) {
      return cachedPage;
    }
  }
  
  // For other requests, return a simple offline response
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'This content is not available offline'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

/**
 * Message handler for communication with main thread
 */
self.addEventListener('message', event => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_STATUS':
      getCacheStatus().then(status => {
        event.ports[0].postMessage({ type: 'CACHE_STATUS', data: status });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
      break;
      
    case 'PRELOAD_QUESTIONS':
      preloadQuestions(data).then(() => {
        event.ports[0].postMessage({ type: 'QUESTIONS_PRELOADED' });
      });
      break;
      
    default:
      console.warn('Service Worker: Unknown message type:', type);
  }
});

/**
 * Get cache status information
 * @return {Promise<Object>} Cache status data
 */
async function getCacheStatus() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  
  const status = {
    cacheName: CACHE_NAME,
    cachedFiles: keys.length,
    totalSize: 0,
    lastUpdated: null
  };
  
  // Calculate approximate cache size and find newest entry
  for (const request of keys) {
    const response = await cache.match(request);
    if (response) {
      const cacheDate = response.headers.get('sw-cache-date');
      if (cacheDate) {
        const date = parseInt(cacheDate);
        if (!status.lastUpdated || date > status.lastUpdated) {
          status.lastUpdated = date;
        }
      }
    }
  }
  
  return status;
}

/**
 * Clear all caches
 * @return {Promise<void>}
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('Service Worker: All caches cleared');
}

/**
 * Preload questions for faster offline access
 * @param {Array} questionUrls - URLs of question files to preload
 * @return {Promise<void>}
 */
async function preloadQuestions(questionUrls = []) {
  const cache = await caches.open(CACHE_NAME);
  
  const defaultUrls = [
    './data/ap-physics-questions.csv',
    './data/earth-science-questions.csv'
  ];
  
  const urlsToPreload = questionUrls.length > 0 ? questionUrls : defaultUrls;
  
  await Promise.all(
    urlsToPreload.map(url => 
      fetch(url)
        .then(response => {
          if (response.ok) {
            return cache.put(url, response);
          }
        })
        .catch(error => {
          console.warn(`Failed to preload ${url}:`, error);
        })
    )
  );
  
  console.log('Service Worker: Questions preloaded for offline access');
}

// Handle service worker updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    // Check for updates and notify client
    event.ports[0].postMessage({
      type: 'UPDATE_STATUS',
      hasUpdate: false // This would check for actual updates
    });
  }
});

console.log('Service Worker: Script loaded successfully');