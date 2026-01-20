# CORS Error Explanation & Fix

## What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a security feature implemented by web browsers to prevent malicious websites from making unauthorized requests to your API.

## The Error You Encountered

```
Access to fetch at 'https://api.bepositive.az/api/contact' from origin 'https://bepositive.az'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Why This Happened

### 1. **Cross-Origin Request**

- Your frontend: `https://bepositive.az`
- Your backend API: `https://api.bepositive.az`
- These are different origins (different subdomains)

### 2. **Preflight Request**

When your frontend sends a POST request with `Content-Type: application/json`, the browser automatically sends a **preflight OPTIONS request** first to check if the actual request is allowed.

**Flow:**

```
Browser → OPTIONS https://api.bepositive.az/api/contact (Preflight)
Backend → Should respond with CORS headers
Browser → POST https://api.bepositive.az/api/contact (Actual request)
```

### 3. **Missing CORS Headers**

Your backend wasn't properly responding to the preflight OPTIONS request with the required headers:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

## The Fix

### Changes Made to `backend/server.js`

**Before:**

```javascript
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://bepositive.az",
    "https://www.bepositive.az",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
```

**After:**

```javascript
// CORS middleware - must be before express.json()
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://bepositive.az",
    "https://www.bepositive.az",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;

  // Always set CORS headers for allowed origins
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept",
    );
    res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours
  }

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
```

### Key Improvements

1. **More Explicit Headers**: Added `X-Requested-With` and `Accept` to allowed headers
2. **Grouped CORS Headers**: All CORS headers are now set together inside the origin check
3. **Cache Control**: Added `Access-Control-Max-Age` to cache preflight responses for 24 hours (reduces unnecessary preflight requests)
4. **Better Comments**: Added clear comments explaining the middleware purpose
5. **Consistent Method**: Using `setHeader` instead of `header` for consistency

## How to Deploy the Fix

### On Your VPS (Production)

1. **Connect to your VPS via SSH**

2. **Navigate to your backend directory**

   ```bash
   cd /path/to/BePositive.az/backend
   ```

3. **Pull the latest changes**

   ```bash
   git pull origin main
   ```

4. **Restart your backend server**

   ```bash
   pm2 restart backend
   # or if using a different process manager:
   # systemctl restart bepositive-backend
   ```

5. **Check the logs**
   ```bash
   pm2 logs backend
   ```

### Testing Locally

1. **Restart your local backend server**

   ```bash
   cd backend
   npm run dev
   ```

2. **Test the contact form** on your frontend

3. **Check browser console** - the CORS error should be gone!

## Understanding the Headers

- **Access-Control-Allow-Origin**: Tells the browser which origins are allowed to access the API
- **Access-Control-Allow-Methods**: Specifies which HTTP methods are allowed
- **Access-Control-Allow-Headers**: Lists which headers can be sent in the request
- **Access-Control-Allow-Credentials**: Allows cookies/authentication to be sent
- **Access-Control-Max-Age**: How long (in seconds) the browser can cache the preflight response

## Prevention Tips

1. **Always test CORS** when deploying to production with different domains/subdomains
2. **Use environment variables** for allowed origins (consider adding this in the future)
3. **Monitor logs** for CORS-related errors
4. **Test preflight requests** using tools like Postman or curl

## Additional Resources

- [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Understanding CORS](https://web.dev/cross-origin-resource-sharing/)
