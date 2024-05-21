import React, { useState } from 'react';
import styles from './Header.module.scss'
import { Container } from '@/shared/ui/layout';
import { RoutePath } from '@/app/router';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { LogOut } from '@/features/user';
import ProfileLogo from '@/assets/profile.svg'
import { AppLink, Dropdown } from '@/shared/ui/components';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const isAuthed
        = useAppSelector(state => state.auth.isAuthenticated)

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header_content}>

                    <h2 className={styles.header_title}>
                        NapasGPT
                    </h2>

                    {isAuthed &&
                        <nav className={styles.header_nav}>
                            <AppLink
                                to={RoutePath.main}
                                children='Чат'
                                fontSize='medium'
                            />
                            <AppLink
                                to={RoutePath.profile}
                                children='База данных'
                                fontSize='medium'
                            />

                            <div className='header_profile'>
                                <img
                                    src={ProfileLogo}
                                    className={styles.header_profile_image}
                                    onClick={() => setIsOpen(prev => !prev)}
                                />
                                <Dropdown
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                >
                                    <nav className={styles.dropdown_list}>
                                        <AppLink
                                            to={RoutePath.profile}
                                            children='Профиль'
                                            fontSize='small'
                                            onClick={() => setIsOpen(false)}
                                        />
                                        <AppLink
                                            to={RoutePath.profile}
                                            children='Избранное'
                                            fontSize='small'
                                            onClick={() => setIsOpen(false)}
                                        />
                                        <AppLink
                                            to={RoutePath.profile}
                                            children='Настройки'
                                            fontSize='small'
                                            onClick={() => setIsOpen(false)}
                                        />
                                    </nav>
                                    <LogOut setIsOpen={setIsOpen} />
                                </Dropdown>
                            </div>
                        </nav>
                    }
                </div>
            </Container>
        </div>
    );
};
