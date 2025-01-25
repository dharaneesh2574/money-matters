import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_lBHa8G6pTiMe@ep-red-base-a1k2yglr-pooler.ap-southeast-1.aws.neon.tech/money-matters?sslmode=require',
  },
});
