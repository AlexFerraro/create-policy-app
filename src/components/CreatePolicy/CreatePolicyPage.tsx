import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "utils/request";

interface FormData {
    id: number;
    descricao: string;
    cpf: string;
    situacao: string;
    premioTotal: string;
    formaPagamento: string;
    dataPagamento: string;
    parcelas: {
        id: number;
        premio: number;
        formaPagamento: string;
        dataPagamento: string;
    }[];
}

const CreatePolicyPage = () => {
    const [formData, setFormData] = useState<FormData>({
        id: 0,
        descricao: "",
        cpf: "",
        situacao: "ATIVA",
        premioTotal: "",
        formaPagamento: "",
        dataPagamento: "", 
        parcelas: [
            {
                id: 0,
                premio: 0,
                formaPagamento: "",
                dataPagamento: "" 
            }
        ]
    });

    const [errorFields, setErrorFields] = useState<Array<keyof FormData>>([]);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requiredFields: Array<keyof FormData> = ["descricao", "cpf", "situacao", "premioTotal", "formaPagamento", "dataPagamento"];
        const missingFields = requiredFields.filter(field => formData[field] === "");

        if (missingFields.length > 0) {
            setErrorFields(missingFields);
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            // Remover pontos e traços do CPF
            const cpfWithoutSpecialChars = formData.cpf.replace(/[.-]/g, '');

            // Validar tamanho do CPF
            if (cpfWithoutSpecialChars.length !== 11) {
                setErrorFields([...errorFields, "cpf"]);
                alert("CPF inválido. Por favor, insira um CPF válido com 11 dígitos.");
                return;
            }

            const { descricao, situacao, formaPagamento, dataPagamento } = formData;
            
            // Remover a máscara e converter para número o valor premioTotal (R$)
            const premioTotalNumber = parseFloat(formData.premioTotal.replace(/[^0-9,]*/g, '').replace(',', '.')).toFixed(2);

            const dataToSend = {
                id: formData.id,
                descricao,
                cpf: cpfWithoutSpecialChars,
                situacao,
                premioTotal: premioTotalNumber,
                parcelas: [
                    {
                        id: formData.parcelas[0].id,
                        premio: premioTotalNumber,
                        formaPagamento,
                        dataPagamento
                    }
                ]
            };

            const response = await axios.post(`${BASE_URL}/v1/api/apolice`, dataToSend);

            console.log(response.data);

            // Definindo a mensagem de sucesso
            setSuccessMessage("Apólice cadastrada com sucesso!");

            // Recarregar a página após o envio bem-sucedido
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Recarrega após 2 segundos
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrorFields([]);
    };

    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const formatCurrency = (value: string) => {
        const currencyValue = parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
        return currencyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleSubmit} style={{ width: "400px", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", backgroundColor: "#f9f9f9", marginTop: "1px", marginBottom: "25px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Criar Apólice</h2>
                {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}      
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="cpf" style={{ display: "block", marginBottom: "5px" }}>CPF:</label>
                    <input type="text" id="cpf" name="cpf" maxLength={14} value={formatCPF(formData.cpf)} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${errorFields.includes("cpf") ? 'red' : '#ccc'}` }} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="premioTotal" style={{ display: "block", marginBottom: "5px" }}>Prêmio Total:</label>
                    <input type="text" id="premioTotal" name="premioTotal" value={formatCurrency(formData.premioTotal)} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${errorFields.includes("premioTotal") ? 'red' : '#ccc'}` }} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="situacao" style={{ display: "block", marginBottom: "5px" }}>Situação:</label>
                    <select id="situacao" name="situacao" value={formData.situacao} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${errorFields.includes("situacao") ? 'red' : '#ccc'}` }}>
                        <option value="ATIVA">Ativa</option>
                        <option value="INATIVA">Inativa</option>
                    </select>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="formaPagamento" style={{ display: "block", marginBottom: "5px" }}>Forma de Pagamento:</label>
                    <select id="formaPagamento" name="formaPagamento" value={formData.formaPagamento} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${errorFields.includes("formaPagamento") ? 'red' : '#ccc'}` }}>
                        <option value="">Selecione...</option>
                        <option value="CARTAO">Cartão</option>
                        <option value="BOLETO">Boleto</option>
                        <option value="DINHEIRO">Dinheiro</option>
                    </select>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="dataPagamento" style={{ display: "block", marginBottom: "5px" }}>Data de Pagamento:</label>
                    <input type="date" id="dataPagamento" name="dataPagamento" value={formData.dataPagamento} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${errorFields.includes("dataPagamento") ? 'red' : '#ccc'}` }} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="descricao" style={{ display: "block", marginBottom: "5px" }}>Descrição:</label>
                    <input type="text" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${errorFields.includes("descricao") ? 'red' : '#ccc'}` }} />
                </div>
                <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Enviar</button>
            </form>
        </div>
    );
};

export default CreatePolicyPage;
