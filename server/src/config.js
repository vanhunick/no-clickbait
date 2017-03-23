export default {
  database: {
    url : 'mongodb://localhost:27017/no-clickbait',
    database: process.env.DATABASE_NAME || 'mongodb://localhost:27017/no-clickbait',
    username: process.env.DATABASE_USER || 'user',
    password: process.env.DATABASE_PASSWORD || 'Passw0rd',
    host: process.env.DATABASE_SERVER || 'example.database.windows.net',
  }
};
