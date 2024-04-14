import axios from "axios";
import { useEffect, useState } from "react";
import { PolicyPage } from "types/policy";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/request";

const DataTable = () => {
    const [activePage] = useState(0);
    const [page, setPage] = useState<PolicyPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0,
        data: []
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/v1/api/apolice?skip=0&take=2147483647`)
            .then(response => {
                console.log('Dados da API:', response.data); // Adicionando o log dos dados da API
                setPage(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, [activePage])

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th> {/* Adicionado campo de ID */}
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
                            <td>{item.id}</td> {/* Adicionado campo de ID */}
                            <td>{item.descricao}</td>
                            <td>{item.cpf}</td>
                            <td>{item.situacao}</td>
                            <td>{item.premioTotal}</td>
                            <td>{formatLocalDate(item.dataCriacao, "dd/MM/yyyy HH:mm:ss")}</td>
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