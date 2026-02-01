const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); // Default 5 minutes

const cacheMiddleware = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  const key = `__express__${req.originalUrl || req.url}`;
  const cachedBody = cache.get(key);

  if (cachedBody) {
    res.send(cachedBody);
    return;
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
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
