import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import IRepository from './interfaces/repository.interface';
import { Form, Repositories, Title } from './styles';

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');

    const [repositories, setRepositories] = useState<IRepository[]>([]);

    async function handleAddRepository(event: FormEvent): Promise<void> {
        event.preventDefault();
        const response = await api.get<IRepository>(`repos/${newRepo}`);
        const repository = response.data;
        setRepositories([...repositories, repository]);
        setNewRepo('');
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositório no Github.</Title>
            <Form onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />
                <button type="submit"> Pesquisar </button>
            </Form>
            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">
                        <img 
                            src={repository.owner.avatar_url} 
                            alt={repository.owner.login}  
                        />
                        <div>
                            <strong> {repository.full_name} </strong>
                            <p> {repository.description} </p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    );
}

export default Dashboard;