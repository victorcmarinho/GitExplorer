import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronsLeft } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import IRepository from '../Dashboard/interfaces/repository.interface';
import { Header, Issues, RepositoryInfo } from './styles';
interface RepositoryParams {
    repository: string;
}

interface IIssue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}


const Repository: React.FC = () => {
    const [repository, setRepository] = useState<IRepository | null>(null);
    const [issues, setIssues] = useState<IIssue[]>([]);
    const { params } = useRouteMatch<RepositoryParams>();
    useEffect(() => {
        api.get(`repos/${params.repository}`).then(reponse => {
            setRepository(reponse.data)
        });

        api.get(`repos/${params.repository}/issues`).then(reponse => {
            setIssues(reponse.data)
        });
    }, [params.repository]);
    return (
        <>

            <Header>
                <img src={logoImg} alt='Github Explorer' />
                <Link to="/">
                    <FiChevronsLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (

                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues Abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map(issue => (
                    <a key={issue.id} href={issue.html_url}>
                        <div>
                            <strong> {issue.title} </strong>
                            <p> {issue.user.login} </p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>

                ))}
            </Issues>
        </>
    );
}

export default Repository;