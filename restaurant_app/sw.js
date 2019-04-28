// Adds eventlisterner to serviceWorker to install the cache
  self.addEventListener('install', function(e) {

      e.waitUntil(
          caches.open('v1').then(function(cache) {
          //creating cache
              return cache.addAll([
                './restaurant_app',
                './restaurant_app/index.html',
                './restaurant_app/css/styles.css',
                './restaurant_app/js/dbhelper.js',
                './restaurant_app/js/main.js',
                './restaurant_app/js/restaurant_info.js',
                './restaurant_app/data/restaurants.json',
                './restaurant_app/img/1.jpg',
                './restaurant_app/img/2.jpg',
                './restaurant_app/img/3.jpg',
                './restaurant_app/img/4.jpg',
                './restaurant_app/img/5.jpg',
                './restaurant_app/img/6.jpg',
                './restaurant_app/img/7.jpg',
                './restaurant_app/img/8.jpg',
                './restaurant_app/img/9.jpg',
                './restaurant_app/img/10.jpg',
              ]);
          })
      );
  });
// Fetches cache data when network is unavailable
  self.addEventListener('fetch', function(e) {
      e.respondWith(
          caches.match(e.request).then(function(response) {
            if (response) {

              return response;
            }
            else {

              return fetch(e.request)
              .then(function(response) {
                  const clonedResponse = response.clone();
                  caches.open('v1').then(function(cache) {
                      cache.put(e.request, clonedResponse);
                  })
                  return response;
              })
              .catch(function(err) {
                  console.error(err);
              });
            }
        })
      );
  });
