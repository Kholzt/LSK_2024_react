import React, { useState } from "react";
import Layout from "../../Layout";
import { API } from "../../helper";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const [Errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, slug, description, allowed_domains, limit_one_response } =
      e.target;

    const data = {
      name: name.value,
      slug: slug.value,
      description: description.value,
      allowed_domains: allowed_domains.value.split(","),
      limit_one_response: limit_one_response.value,
    };
    const res = await API("/forms", "post", data);
    setErrors([]);
    if (res.data.errors) {
      setErrors(res.data.errors);
    } else {
      alert(res.data.message);
      navigate("/");
    }
  };
  return (
    <Layout>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Create Form</h1>
          <div className="row">
            <div className="form-group mb-2 col-md-6 col-12">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
              />
              <small className="text-danger">{Errors?.name}</small>
            </div>
            <div className="form-group mb-2 col-md-6 col-12">
              <label htmlFor="slug">Slug</label>
              <input
                className="form-control"
                type="text"
                name="slug"
                id="slug"
              />
              <small className="text-danger">{Errors?.slug}</small>
            </div>
            <div className="form-group mb-2 col-md-6 col-12">
              <label htmlFor="description">Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
              />
            </div>

            <div className="form-group mb-2 col-md-6 col-12">
              <label htmlFor="allowed_domains">Allowed domains </label>
              <input
                className="form-control"
                type="text"
                name="allowed_domains"
                id="allowed_domains"
              />
              <small className="text-danger">{Errors?.allowed_domains}</small>
            </div>
            <div className="form-group mb-2 col-md-6 col-12">
              <div>limit one response </div>
              <label htmlFor="">
                <input
                  checked
                  type="radio"
                  name="limit_one_response"
                  value={0}
                />
                No
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="limit_one_response"
                  id="limit_one_response"
                  value={1}
                />
                Yes
              </label>
              <small className="text-danger ">
                {Errors?.limit_one_response}
              </small>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
}
