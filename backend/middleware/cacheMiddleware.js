const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); // Default 5 minutes

const cacheMiddleware = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  const key = `__express__${req.originalUrl || req.url}`;
  const cachedBody = cache.get(key);

  if (cachedBody) {
    // If it's a string (JSON), parse it or send as is
    res.setHeader("Content-Type", "application/json");
    return res.send(cachedBody);
  } else {
    // Save original send function
    const originalSend = res.send;

    res.send = function (body) {
      // Only cache successful responses
      if (res.statusCode === 200) {
        cache.set(key, body, duration);
      }
      return originalSend.call(this, body);
    };
    next();
  }
};

const clearCache = (prefix) => {
  const keys = cache.keys();
  const keysToDelete = keys.filter((k) => k.includes(prefix));
  if (keysToDelete.length > 0) {
    cache.del(keysToDelete);
  }
};

module.exports = { cacheMiddleware, clearCache };
