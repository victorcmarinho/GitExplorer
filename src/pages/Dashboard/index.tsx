import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import IRepository from './interfaces/repository.interface';
import { Error, Form, Repositories, Title } from './styles';

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<IRepository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');
        if(storagedRepositories)
            return JSON.parse(storagedRepositories);
        else
            return [];
    });

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories])

    async function handleAddRepository(event: FormEvent): Promise<void> {
        event.preventDefault();
        if(!newRepo) {
            setInputError('Digite o auto/nome do repositório');
            return
        }
        try {
            const response = await api.get<IRepository>(`repos/${newRepo}`);
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (error) {
            setInputError('Error na busca por esse repositório');
        }

    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositório no Github.</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />
                <button type="submit"> Pesquisar </button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.full_name} href="teste" to={`/repository/${repository.full_name}`}>
                        <img 
                            src={repository.owner.avatar_url} 
                            alt={repository.owner.login}  
                        />
                        <div>
                            <strong> {repository.full_name} </strong>
                            <p> {repository.description} </p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
}

export default Dashboard;