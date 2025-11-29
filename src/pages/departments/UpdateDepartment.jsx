import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const UpdateDepartment = () => {
  const { data: department } = useLoaderData();
  console.log(department);
    const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    //console.log(data);
    const updateRes = await axiosSecure.put(`/Department/update-department/${department.department_id}`, data);
    console.log(updateRes);
    if(updateRes.data.success){
        reset();
        toast.success("Department updated successfully");
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full my-6">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            defaultValue={department.name}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control  w-full ">
          <div className="label">
            <span className="label-text mt-2">Code</span>
          </div>
          <input
            {...register("code")}
            placeholder="code"
            defaultValue={department.code}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full my-6">
          <div className="label">
            <span className="label-text mt-2">Description</span>
          </div>
          <br />
          <textarea
            {...register("description")}
            placeholder="Description"
            defaultValue={department.description}
            className="textarea textarea-bordered h-50 w-full"
          />
        </label>
        
        <input className="btn btn-primary mt-2" type="submit" />
      </form>
    </div>
  );
};

export default UpdateDepartment;
