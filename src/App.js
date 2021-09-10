import axios from "axios";
import { useState, React, useEffect } from "react";
export default function App() {
  let data = [];
  let newTags = [];
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchProblems = async (e) => {
    e.preventDefault();
    data = await axios.get("https://codeforces.com/api/problemset.problems");
    let filteredProblems = [];
    data.data.result.problems.forEach((problem) => {
      if (problem.index === "D") filteredProblems.push(problem);
    });
    setProblems(filteredProblems);
    console.log(problems);
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const submitForm = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    console.log(e);
    newTags = [...tags];
    if (e.target["checked"] === true) {
      console.log("Entered p")
      newTags.push(e.target.name);
    } else {
      console.log("Enter");
      newTags.splice(newTags.indexOf(e.target.name), 1);
    }
    setTags(newTags);
  };

  return (
    <div className="row mid-1">
      <div className="col"></div>
      <div className="col">
        <h4 className="my-4">Hello! </h4>
        <h5>Please filter Codeforces problems by tags</h5>

        <form onSubmit={submitForm}>
          <div>
            <label className="form-label">implementation</label>
            <input
              type="checkbox"
              name="implementation"
              className="my-3"
              id="implementation"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label">graphs</label>
            <input
              type="checkbox"
              name="graphs"
              className="my-3"
              id="graphs"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn btn-primary w-20 my-3" onSubmit={fetchProblems}>Filter</button>
          </div>
        </form>
      </div>
      <div className="col"></div>
    </div>
  );
}