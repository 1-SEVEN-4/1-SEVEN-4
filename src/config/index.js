import dotenv from "dotenv";
dotenv.config({ debug: true, path: ".env" });

export const PORT = process.env.PORT;

export const POSTGRES_CONFIG = {
  user: "사용자 이름",
  host: "로컬호스트",
  database: "DB명",
  password: "사용자 비밀번호",
  port: 5432,
};
