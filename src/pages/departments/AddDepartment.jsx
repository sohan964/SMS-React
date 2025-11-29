import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddDepartment = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const res = await axiosSecure.post("/Department/adddepartment", data);
    if(res.data.success){
        reset();
        toast.success("Department added successfully");
        navigate("/admin-dashboard/manage-departments");
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
            className="textarea textarea-bordered h-50 w-full"
          />
        </label>

        <input className="btn btn-primary mt-2" type="submit" />
      </form>
    </div>
  );
};

export default AddDepartment;
