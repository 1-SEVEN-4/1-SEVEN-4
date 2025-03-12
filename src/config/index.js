import dotenv from 'dotenv';
dotenv.config({ debug: true, path: '.env' });

export const PORT = process.env.PORT;

