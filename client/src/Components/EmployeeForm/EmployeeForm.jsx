import { useEffect, useState } from "react";

// Task 6 fetch the equipment
const fetchEquipment = (dataSetter) => {
	return fetch("/api/equipment")
		.then((res) => res.json())
		.then((data) => dataSetter(data));
};

// Task 8 - favband
const fetchFavoriteBrand = (dataSetter) => {
	return fetch("/api/favoritebrand")
		.then((res) => res.json())
		.then((data) => dataSetter(data));
}

// Task 1 PA
const fetchCompanies = (dataSetter) => {
	return fetch("/api/company")
			.then((res)=>res.json())
			.then((data) => dataSetter(data))
 }
 

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
	const [favoritebrand, setFavoritebrand] = useState(undefined);
	const [equipment, setEquipment] = useState(undefined);
	const [allFavoriteBrands, setAllFavoriteBrands] = useState(undefined);
	//TASK 1 PA
	const [company, setCompany] = useState(undefined)
	const [allCompanies, setAllCompanies] = useState(undefined)
 


	useEffect(() => {
		fetchEquipment(setEquipment);
		fetchFavoriteBrand(setAllFavoriteBrands);
		fetchCompanies(setAllCompanies)
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const entries = [...formData.entries()];

		let employee = entries.reduce((acc, entry) => {
			const [k, v] = entry;
			acc[k] = v;

			return acc;
		}, {});
		// employee={...employee, level:levels.find((level)=>level.name===employee.level)}


		 return onSave(employee);
	};


	return (
		<form className="EmployeeForm" onSubmit={onSubmit}>
			{employee && (
				<input type="hidden" name="_id" defaultValue={employee._id} />
			)}

			<div className="control">
				<label htmlFor="name">First Name:</label>
				<input
					defaultValue={employee ? employee.name : null}
					name="name"
					id="name"
				/>
			</div>

			<div className="control">
				<label htmlFor="level">Level:</label>
				<input
					defaultValue={employee ? employee.level : null}
					name="level"
					id="level"
				/> 
		
			</div>

			<div className="control">
				<label htmlFor="position">Position:</label>
				<input
					defaultValue={employee ? employee.position : null}
					name="position"
					id="position"
				/>
			</div>

			{/* 
      Task 6 - create dropdown menu for the equipment */}
			<div className="control">
				<label>Equipment:</label>
				<select name="equipment" id="equipment">
					<option value="">choose equipment</option>
					{equipment?.map((item) => (
						<option key={item._id} value={item.name}>{item.name}</option>
					))}
				</select>

			</div>
			{/* Task 8 - create dropdown menu for the favbrand */}
			<div className="control">
				<label>Favorite Brand:</label>
				<select value={favoritebrand} onChange={(e) => setFavoritebrand(e.target.value)} name="favoritebrand" id="favoritebrand">
					{allFavoriteBrands?.map((favoritebrand) => (
						<option key={favoritebrand._id} value={favoritebrand._id}>{favoritebrand.name}</option> // value needs to be ._id
					))}
				</select>
			</div>

           <div className="control">
               <label>Company:</label>
               <select  value={company} onChange={(e) => setCompany(e.target.value)} name="company" id="company">
                   {allCompanies?.map((company) => (
                       <option key={company._id} value={company._id}>{company.name}</option> 
                   ))}
               </select>
           </div>

			<div className="buttons">
				<button type="submit" disabled={disabled}>
					{employee ? "Update Employee" : "Create Employee"}
				</button>
				<button type="button" onClick={onCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default EmployeeForm;
