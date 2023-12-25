import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
	return fetch(`/api/employees/${employee._id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(employee),
	}).then((res) => res.json());
};

const fetchEmployee = (id) => {
	return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchEquipment = () => {
	return fetch("/api/equipment")
		.then((res) => res.json())
		.then((data) => data);
};

const fetchFavoriteBrand = () => {
	return fetch("/api/favoritebrand")
		.then((res) => res.json())
		.then((data) => data);
};

const EmployeeUpdater = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [employee, setEmployee] = useState(null);
	const [updateLoading, setUpdateLoading] = useState(false);
	const [employeeLoading, setEmployeeLoading] = useState(true);
	const [equipment, setEquipment] = useState(null);
	const [favoriteBrand, setFavoriteBrand] = useState(null);

	useEffect(() => {
		setEmployeeLoading(true);
		fetchEmployee(id).then((employee) => {
			console.log("Fetched employee data:", employee);
			setEmployee(employee);
			setEmployeeLoading(false);
		}).then(()=>
		fetchEquipment().then((equipment) => {
			setEquipment(equipment);
		})).then(()=>
		fetchFavoriteBrand().then((favoritebrand) => {
			setFavoriteBrand(favoritebrand);
		}));
	}, [id]);

	const handleUpdateEmployee = (employee) => {
		setUpdateLoading(true);
		updateEmployee({
			...employee,
			favoritebrand: employee.favoritebrand,
		})
			.then(() => {
				setUpdateLoading(false);
				navigate("/");
			});
	};

	if (employeeLoading) {
		return <Loading />;
	}

	return (
		<EmployeeForm
			employee={employee}
			onSave={handleUpdateEmployee}
			disabled={updateLoading}
			onCancel={() => navigate("/")}
			equipment={equipment}
			favoritebrand={favoriteBrand}
		/>
	);
};

export default EmployeeUpdater;
