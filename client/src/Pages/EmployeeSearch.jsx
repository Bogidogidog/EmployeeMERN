import React, { useEffect, useState } from 'react';
import EmployeeTable from '../Components/EmployeeTable';
import Loading from '../Components/Loading';

const fetchEmployees = (name, dataSetter) => {
    return fetch(`/api/employees/search/${name}`)
        .then((res) => res.json(res))
        .then((data) => dataSetter(data));
};

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const EmployeeSearch = () => {
    const [employees, setEmployees] = useState(null);

    const path = window.location.pathname;
    const parts = path.split('/');
    const parameterValue = parts[parts.length - 1];
   

    useEffect(() => {
        fetchEmployees(parameterValue, setEmployees)

    }, [parameterValue]);

    if (!employees) {
        return <Loading />;
    }

    return (
        <div>
            <EmployeeTable
                employees={employees}
                onDelete={deleteEmployee}
            />;
        </div>
    )
};

export default EmployeeSearch
