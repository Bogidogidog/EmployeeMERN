import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
    return fetch("/api/employees/").then((res) => res.json());
};

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const EmployeeMissing = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);

    const handleDelete = (id) => {
        deleteEmployee(id);

        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });
    };

    useEffect(() => {
        fetchEmployees()
            .then((response) => {
                setLoading(false);
                //console.log(response.employees); // Access the "employees" key IST FALSCH es reicht response
                // Filter employees by attendance === false
                const filteredEmployees = response.filter(
                    (employee) => employee.attendance === false
                );
                setEmployees(filteredEmployees);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return <EmployeeTable employees={employees} onDelete={handleDelete} />;
};

export default EmployeeMissing;

