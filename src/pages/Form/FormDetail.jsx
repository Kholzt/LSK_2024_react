import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import { API } from "../../helper";
export default function FormDetail() {
  const [Form, setForm] = useState([]);
  const [MessageError, setMessageError] = useState("");
  const param = useParams();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await API("/forms/" + param.slug);
    if (res.status != 200) {
      setMessageError(res.data.message);
    } else {
      setForm(res.data.form);
    }
  };
  const copyText = () => {
    navigator.clipboard
      .writeText(Form.slug)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  if (MessageError != "" && Form.length == 0) {
    return (
      <Layout>
        <h1 className="text-center">{MessageError}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <h1>{Form.name}</h1>
        <p>{Form.description}</p>
        <p>
          <span>Allowed Domains</span>:{" "}
          <b>{Form?.allowed_domains?.join(", ")}</b>
        </p>
        <div className="d-flex w-50 gap-2">
          <input
            type="text"
            value={Form.slug}
            readOnly
            className="form-control disabled"
            disabled
          />
          <button className="btn-primary btn" onClick={copyText}>
            Copy
          </button>
        </div>
        <br />
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <h2>
            Questions List
            <small className="badge text-bg-primary ms-2 fs-7">
              {Form?.questions?.length}
            </small>
          </h2>
          <Link
            to={"/form/" + Form?.slug + "/question"}
            className="btn btn-primary"
          >
            Add Question
          </Link>
        </div>

        <form>
          {Form?.questions?.map((question, i) => {
            return (
              <div className="form-group mb-2 " key={i}>
                <div className="fw-bold">Question {i + 1}</div>
                <div className="ms-4">
                  <span>Question Name </span>
                  <input
                    className="form-control mb-2"
                    type="text"
                    disabled
                    value={question.name}
                    name=""
                    id=""
                  />
                  <span>choice type </span>
                  <select
                    name="choice"
                    disabled
                    id=""
                    className="form-control mb-2"
                  >
                    <option value={question.choice_type}>
                      {question.choice_type}
                    </option>
                  </select>
                  <span>Choices </span>
                  <input
                    className="form-control mb-2"
                    type="text"
                    disabled
                    value={question.choices != "null" ? question.choices : ""}
                    name=""
                    id=""
                  />
                  <div>Is Required </div>
                  <input
                    className="mb-2"
                    checked={!question.is_required}
                    type="radio"
                    disabled
                    value={question.name}
                    name=""
                    id=""
                  />{" "}
                  No
                  <input
                    className="ms-2"
                    checked={question.is_required}
                    type="radio"
                    disabled
                    value={question.name}
                    name=""
                    id=""
                  />{" "}
                  Yes
                </div>
              </div>
            );
          })}
          {/* <button className="btn btn-primary">Save</button> */}
        </form>
      </div>
    </Layout>
  );
}
