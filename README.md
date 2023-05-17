# NLWSpaceTime
SpaceTime NLW project source code


## Back-End Configuration
```bash
cd server
npm install --save
```
### ESLint Configuration
```bash
npm i @rocketseat/eslint-config -D
# .eslintrc config
{
  "extends": [
    "@rocketseat/eslint-config/node"
  ]
}
``` 
### Prisma

```bash
npx prisma init --datasource-provider SQLite

# Creating your first migration
npx prisma migrate dev
```