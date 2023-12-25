import Employee from "../Employee";
import "./EmployeeTable.css";



const EmployeeTable = ({ employees, onDelete, onSortByNameAscDes }) => {
  if (!employees) {
    return null; // Return null or show a loading state or error message
  }


  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th onClick={() => onSortByNameAscDes()}>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Present</th>
            <th>Equipment</th>
            <th>Favorite Brand</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <Employee key={employee._id} employee={employee} onDelete={onDelete} /> // Pass employee as prop
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

