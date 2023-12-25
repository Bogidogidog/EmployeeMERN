import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyForm from "../Components/CompanyForm";

const createCompany = (company) => {
   return fetch("/api/company", {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify(company),
   }).then((res) => res.json());
};
const CompanyCreator = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);


   const handlecreateCompany = (company) => {
       setLoading(true);
       createCompany(company)
           .then(() => {
               setLoading(false);
               navigate("/");
           })
           .catch((error) => {
               setLoading(false);
               console.error("Failed to create company:", error);
           });
   };
   return (
       <CompanyForm
           onCancel={() => navigate("/")}
           disabled={loading}
           onSave={handlecreateCompany}
       />
   );
};


export default CompanyCreator;
