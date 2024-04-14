import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { PolicyPage } from "types/policy";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/request";

const DataTable = () => {
    const [activePage, setActivePage] = useState(0);
    const [page, setPage] = useState<PolicyPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/v1/api/apolice`, {
                    params: {
                        skip: activePage * 15, // Ajuste para corresponder ao parâmetro de página da nova API
                        take: 15 // Ajuste para corresponder ao tamanho da página da nova API
                    }
                });
                
                const policies = response.data.data; // Lista de políticas retornadas pela API
                const totalPolicies = response.data.data.length; // Número total de políticas
    
                const policyPage: PolicyPage = {
                    data: policies,
                    last: totalPolicies < 15, // Verifica se é a última página
                    totalPages: totalPolicies,
                    totalElements: totalPolicies,
                    first: activePage === 0, // Verifica se é a primeira página
                    number: activePage,
                    empty: totalPolicies === 0 // Verifica se a lista de políticas está vazia
                };
    
                setPage(policyPage);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };
    
        fetchData();
    }, [activePage]);
    
    const formatCurrency = (value: string) => {
        const currencyValue = parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
        return currencyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const changePage = (index: number) => {
        setActivePage(index);
    }

    return (
        <>
        <Pagination page={page} onPageChange={changePage} />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>CPF</th>
                            <th>Situação</th>
                            <th>Prêmio Total</th>
                            <th>Data de Criação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.data?.map(item =>
                        (<tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.descricao}</td>
                            <td>{item.cpf}</td>
                            <td>{item.situacao}</td>
                            <td>{formatCurrency(item.premioTotal.toString())}</td>
                            <td>{formatLocalDate(item.dataCriacao, "dd/MM/yyyy")}</td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;