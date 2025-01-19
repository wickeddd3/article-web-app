# article-web-app

Use Node.js v20.15.0

---

#### How to run on local

Install dependencies

```
yarn install
```

Create .env.local file with this value. `VITE_APP_API_BASE_URL` value is for backend api service url

```
VITE_APP_API_BASE_URL=http://localhost:3000
VITE_APP_TOKEN_LOCAL_STORAGE_NAME=article-web-app.token
VITE_APP_USER_LOCAL_STORAGE_NAME=article-web-app.user
```

Run development mode, http://localhost:5173

```
yarn dev
```

Generate build files

```
yarn build
```
