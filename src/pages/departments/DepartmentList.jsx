import React from "react";
import useDepartment from "../../hooks/useDepartment";
import { Link } from "react-router";

const DepartmentList = () => {
  const [departments] = useDepartment();
  console.log(departments);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Code</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 2 */}
            {/* <tr> */}
            {departments.map((department, index) => (
              <tr key={department.id}>
                <th>{index + 1}</th>
                <td>{department.name}</td>
                <td>{department.code}</td>
                <td>{department.description}</td>
                <td>
                  {/* Action buttons can be added here */}
                  <Link to={`update-department/${department.department_id}`}>
                    <button className="btn btn-sm btn-primary">Edit</button>
                  </Link>
                  <button className="btn disabled btn-sm btn-danger ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
