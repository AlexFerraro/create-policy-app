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
                <h1 className="text-primary py-3 text-center"></h1>
                <div className="row">
                    <div className="col-lg-6">
                        <CreatePolicyPage />
                    </div>
                    <div className="col-lg-6">
                        <div className="py-3">
                            <h2 className="text-primary text-center">Apólices Cadastradas</h2>
                        </div>
                        <DataTable />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DashBoard;