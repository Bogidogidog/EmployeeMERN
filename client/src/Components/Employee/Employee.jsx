import { useState } from "react"; // Import useState hook
import { Link } from "react-router-dom";


const Employee = ({ employee, onDelete }) => {
	const [attendance, setAttendance] = useState(employee.attendance); // Use useState to manage attendance state

	const handleAttendance = () => {
		const updatedAttendance = !attendance; // Toggle the attendance status
		updateEmployee(employee._id, { attendance: updatedAttendance });
		setAttendance(updatedAttendance); // Update local state with new attendance value
	};

	const updateEmployee = (id, data) => {
		fetch(`/api/employees/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((updatedEmployee) => {
				// Update the UI with the updated employee data
				// You can use the updatedEmployee data to update the UI directly without refreshing the page
				console.log("Updated Employee:", updatedEmployee);
			})
			.catch((error) => {
				console.error("Error updating attendance:", error);
			});
	};


	return (
		<tr key={employee._id}>
			<td>{employee.name}</td>
			<td>{employee.level}</td>
			<td>{employee.position}</td>
			<td>
				<input
					type="checkbox"
					checked={attendance}
					onChange={handleAttendance}
				/>
				{/* Use local attendance state and handleAttendance function */}
			</td>
			<td>{employee.equipment}</td>
			<td>{employee.favoritebrand && employee.favoritebrand.name}</td>
			<td>{employee.company && employee.company.name}</td>
			<td>
				<Link to={`/update/${employee._id}`}>
					<button type="button">Update</button>
				</Link>
				<button type="button" onClick={() => onDelete(employee._id)}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default Employee;
