import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (level, position, sort, sortByNameAscDes) => {
  const params = new URLSearchParams();
  params.append("level", level);
  params.append("position", position);
  params.append("sort", sort);
  params.append("sortByNameAscDes", sortByNameAscDes);
  return fetch(`/api/employees/?${params.toString()}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [sort, setSort] = useState("");
  const [sortByNameAscDes, setSortByNameAscDes] = useState(null);


  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleSortByNameAscDes = () => {
    if (sortByNameAscDes === null) {
      setSortByNameAscDes("asc");
    } else if (sortByNameAscDes === "asc") {
      setSortByNameAscDes("des");
    } else if (sortByNameAscDes === "des") {
      setSortByNameAscDes("asc");
    }
  }


  useEffect(() => {
    fetchEmployees(level, position, sort, sortByNameAscDes)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);

      });
  }, [level, position, sort, sortByNameAscDes]);


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <label>
          Filter by Position:
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setPosition(e.target.value);
              }
            }}
          />
        </label>
        <label>
          Filter by Level:
          <input onChange={(e) => setLevel(e.target.value)}
          />
        </label>
        <label>
          Sort By:
          <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
            <option value=''>Choose an option</option>
            <option value='name'>Name</option>
            <option value='level'>Level</option>
            <option value='position'>Position</option>
          </select>
        </label>
      </div>
      <EmployeeTable employees={employees} onDelete={handleDelete} onSortByNameAscDes={handleSortByNameAscDes} />
    </>
  );
};


export default EmployeeList;
