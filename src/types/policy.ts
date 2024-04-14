export type Policy = {
    id: number;
    descricao: string;
    cpf: number;
    situacao: string;
    premioTotal: number;
    dataCriacao: string; // ou Date, dependendo de como você deseja manipular as datas
    dataAlteracao: string; // ou Date
    usuarioCriacao: number;
    usuarioAlteracao: number;
    installments: Installment[];
}

export type Installment = {
    id: number;
    premio: number;
    formaPagamento: string;
    dataPagamento: string; // ou Date
    dataPago: string; // ou Date
    juros: number;
    situacao: string;
    dataCriacao: string; // ou Date
    dataAlteracao: string; // ou Date
    usuarioCriacao: number;
    usuarioAlteracao: number;
}

export type PolicyPage = {
    data?: Policy[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    number: number;
    numberOfElements?: number;
    size?: number;
    empty?: boolean;
}