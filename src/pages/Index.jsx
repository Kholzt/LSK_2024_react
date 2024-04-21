import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../helper";
import { Link } from "react-router-dom";

export default function Index() {
  const [Form, setForm] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await API("/forms");
    setForm(res.data.forms);
  };

  return (
    <Layout>
      <div className="container">
        <h1>List Form</h1>
        <div className="row ">
          {Form.map((form, i) => {
            return (
              <div key={i} className="col-md-4 col-12 mb-3">
                <Link
                  className="text-black text-decoration-none"
                  to={"/form/" + form.slug}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5>{form.name} </h5>
                      <p>{form.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
