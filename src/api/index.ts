import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

const user = "reactjs";

export const fetchRepoList = (page: number, per_page: number) =>{
  return api.get(`/users/${user}/repos?per_page=${per_page}&page=${page}`);
}

export const fetchRepoSearch = (searchWord: string, page: number, per_page: number) => {
  return api.get(`/search/repositories?q=${searchWord}+user:${user}&per_page=${per_page}&page=${page}`);
}