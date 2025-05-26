const redis = require("../redis");

async function getRedisCache(searchTerm) {
  try {
    cachedResults = await redis.get(`search:${searchTerm}`);
    return cachedResults || null;
  } catch (error) {
    return null;
  }
}

async function setRedisCache(searchTerm, results) {
  redis.set(`search:${searchTerm}`, JSON.stringify(results), "EX", 3600); // Cache for 1h
}

module.exports = { getRedisCache, setRedisCache };
