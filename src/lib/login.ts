import { v4 as uuidv4 } from "uuid";

export function login(email: string, password: string): void {
  const userID = uuidv4();
  localStorage.setItem("userID", userID);
  if (password === "teacher") {
    localStorage.setItem("role", "teacher");
  } else {
    localStorage.setItem("role", "student");
  }
  console.info(`User with ID ${userID} logged in with email ${email}`);
}
