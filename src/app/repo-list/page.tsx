"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepoListRequest, fetchRepoSearchRequest, resetDataState } from '@/store/dataSlice';
import { RootState } from '@/store';
import styles from './repo-list.module.css';
import Button from '@/components/Button';

const RepoListPage: React.FC = () => {
    const dispatch = useDispatch();
    const {
        repoList,
        repoListLoading,
        repoListHasMore,
        repoSearch,
        repoSearchLoading,
        repoSearchHasMore,
    } = useSelector((state: RootState) => state.data);
    const perPage = 10;
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [clicked, setClicked] = useState(-1);
    const listContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!searchQuery && repoListHasMore && page > 0) {
            dispatch(fetchRepoListRequest({ page, perPage }));
        }
        if (searchQuery && repoSearchHasMore && page > 0) {
            dispatch(fetchRepoSearchRequest({ searchQuery, page, perPage }));
        }
    }, [dispatch, page]);

    const navigateToGithub = (event: any, html_url: string) => {
        event.stopPropagation();;
        if (html_url) {
            window.open(html_url, '_blank');
        }
    }

    const searchRepo = () => {
        setPage(1);
        setClicked(-1); //collapses open cards
        dispatch(resetDataState());
        if (searchQuery) {
            dispatch(fetchRepoSearchRequest({ searchQuery, page: 1, perPage }));
        }
        if (!searchQuery) {
            dispatch(fetchRepoListRequest({ page: 1, perPage }));
        }
    }

    const handleScroll = () => {
        if (listContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                handleLoadMore();
            }
        }
    };

    const handleLoadMore = () => {
        if (!searchQuery && !repoListLoading && repoListHasMore) {
            setPage((prevPage) => prevPage + 1);
        }
        if (searchQuery && !repoSearchLoading && repoSearchHasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const listContainer = listContainerRef.current;
        if (listContainer) {
            listContainer.addEventListener('scroll', handleScroll);
            return () => {
                listContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, [listContainerRef.current, handleScroll]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>React Community Repository List</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search repository..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchRepo();
                        }
                    }}
                />
                <Button label="Search" onClick={searchRepo} />
            </div>
            <div className={styles.listContainer} ref={listContainerRef}>
                <ul>
                    {(searchQuery ? repoSearch : repoList).map((repo, index) => (
                        <li key={`${repo.name}-${index}`} className={styles.box}
                            onClick={() => {
                                clicked === index ? setClicked(-1) : setClicked(index);
                            }}>
                            <div className={styles.boxTitleContainer}>
                                <h1 className={styles.boxIndex}>{index + 1}</h1>
                                <h1 className={styles.boxTitle}>{repo.name}</h1>
                            </div>
                            <h2 className={styles.boxDescription}>{repo.description}</h2>
                            <div className={clicked === index ? "open" : "hidden"}>
                                <ul className={styles.boxDetail}>
                                    <li>
                                        <h3>{repo.stargazers_count}</h3>
                                        <h4>⭐Stars</h4>
                                    </li>
                                    <li>
                                        <h3>{repo.forks_count}</h3>
                                        <h4>⤴️Forks</h4>
                                    </li>
                                    <li>
                                        <h3>{repo.watchers_count}</h3>
                                        <h4>👀Watchers</h4>
                                    </li>
                                    <li>
                                        <h3>{repo.language}</h3>
                                        <h4>🔤language</h4>
                                    </li>
                                </ul>
                                <Button label="View on Github"
                                    onClick={(event) => navigateToGithub(event, repo.html_url)} />
                            </div>
                        </li>
                    ))}
                </ul>
                {repoListLoading && <p>Loading...</p>}
                {repoSearchLoading && <p>Loading...</p>}
            </div>

            <footer className={styles.footer}>
                <p>@shazwanr 2025</p>
            </footer>
        </div>
    );
};

export default RepoListPage;