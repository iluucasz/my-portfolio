import axios from "axios";

export const GitHubApi = axios.create({
  baseURL: "https://api.github.com/users/iluucasz/",
  timeout: 5 * 1000,
  headers: { 'Content-Type': 'application/json' }
});