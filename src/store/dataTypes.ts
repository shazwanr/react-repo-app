export interface Repo {
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    language: string;
    html_url: string;
}

export interface DataState {
    repoList: Repo[];
    repoListLoading: boolean;
    repoListError: string | null;
    repoListHasMore: boolean;

    repoSearch: Repo[];
    repoSearchLoading: boolean;
    repoSearchoError: string | null;
    repoSearchHasMore: boolean;
}