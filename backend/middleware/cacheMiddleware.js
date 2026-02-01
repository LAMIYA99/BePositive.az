const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

const cacheMiddleware = (duration) => (req, res, next) => {
  // Only cache GET requests
  if (req.method !== "GET") {
    return next();
  }

  const key = `__express__${req.originalUrl || req.url}`;
  const cachedData = cache.get(key);

  if (cachedData) {
    try {
      const data = JSON.parse(cachedData);
      return res.json(data);
    } catch (e) {
      // If parsing fails, delete key and continue
      cache.del(key);
    }
  }

  // Intercept res.json
  const originalJson = res.json;
  res.json = function (data) {
    if (res.statusCode === 200 && data) {
      try {
        cache.set(key, JSON.stringify(data), duration);
      } catch (e) {
        console.error("Caching error:", e);
      }
    }
    return originalJson.call(this, data);
  };

  next();
};

const clearCache = (prefix) => {
  try {
    const keys = cache.keys();
    const keysToDelete = keys.filter((k) => k.includes(prefix));
    if (keysToDelete.length > 0) {
      cache.del(keysToDelete);
    }
  } catch (e) {
    console.error("Clear cache error:", e);
  }
};

module.exports = { cacheMiddleware, clearCache };
