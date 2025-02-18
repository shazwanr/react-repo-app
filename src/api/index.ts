import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const fetchRepoList = (page: number, per_page: number) =>{
  return api.get(`/users/reactjs/repos?per_page=${per_page}&page=${page}`);
}

export const fetchRepo = (searchWord: string) => {
  return api.get(`/search/repositories?q=${searchWord}+user:reactjs`);
}