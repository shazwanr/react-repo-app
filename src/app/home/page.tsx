"use client";

import React from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';
import { useDispatch } from 'react-redux';
import { resetDataState } from '@/store/dataSlice';

const HomePage: React.FC = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const navigateToRepoList = () => {
        dispatch(resetDataState());
        router.push('/repo-list');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>React Explorer</h1>
            <p className={styles.description}>Explore Open-Source React Repos</p>
            <Button label="Explore" onClick={navigateToRepoList} />
        </div>
    );
};

export default HomePage;