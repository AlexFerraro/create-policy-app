import React from "react";
import DataTable from "components/DataTable";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import CreatePolicyPage from "components/CreatePolicy/CreatePolicyPage";

const DashBoard = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <h1 className="text-primary py-3 text-center">Sistema de Controle de Apólice de Seguros</h1>
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <CreatePolicyPage />
                    </div>
                </div>
                <div className="py-3">
                    <h2 className="text-primary text-center">Todas as Apólices Cadastradas</h2>
                </div>
                <DataTable />
            </div>
            <Footer />
        </>
    );
}

export default DashBoard;