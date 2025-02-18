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
    data: Repo[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasMore: boolean;

    //selectedRepo: Repo | null;
    selectedRepoLoading: boolean;
    selectedRepoError: string | null;
}