import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Form, Repositories, Title } from './styles';
const Dashboard: React.FC = () => {
    return (
        <>  
            <img src={logoImg} alt="Github Explorer"/>
            <Title>Explore repositório no Github.</Title>
            <Form>
                <input placeholder="Digite o nome do repositório" />
                <button type="submit"> Pesquisar </button>
            </Form>
            <Repositories>
                <a href="teste">
                    <img src="teste" alt="teste"/>
                    <div>
                        <strong> teste </strong>
                        <p> teste </p>
                    </div>

                    <FiChevronRight size={20} />
                </a>

            </Repositories>
        </>
    );
}

export default Dashboard;