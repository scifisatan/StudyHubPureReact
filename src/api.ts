import ky from "ky";
import type { User, Session } from "./types";

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  retry: 0,
});

export async function login(email: string, password: string) {
  const user: Session = await api
    .post("/api/login", { json: { email, password } })
    .json();
  return user;
}

export async function getUser() {
  const user: User = await api.get("/api/me").json();
  return user;
}