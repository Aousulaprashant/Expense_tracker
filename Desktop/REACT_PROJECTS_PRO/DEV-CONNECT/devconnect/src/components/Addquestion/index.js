import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/UserSlice";

const Index = () => {
  const [body, setBody] = useState("");
  const user = useSelector(selectUser);
  const [title, settitle] = useState("");
  const [tags, settags] = useState([]);

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"], // Remove formatting
    ],
  };

  const handleSubmit = async () => {
    //

    try {
      if (title !== "" && body !== "") {
        const quation = {
          title: title,
          body: body,
          tags: JSON.stringify(tags),
          user: user,
        };

        console.log(quation);
        console.log(JSON.stringify(tags));
        const response = await axios.post(
          "https://dev-connect-mern-stack.onrender.com/api/question/",
          quation
        );
        if (response.status === 201) {
          console.log("quation added sucessfully");
          navigate("/");
        } else {
          console.log("quation not added");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleQuill = (value) => {
    setBody(value);
  };
  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  modules={modules}
                  className="react"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                <TagsInput
                  value={tags}
                  onChange={settags}
                  name="tages"
                  placeHolder="e.g. (asp.net-mvc php react json)"
                />

                {/* <TagsInput
                  value={tag}
                  onChange={setTag}
                  name="fruits"
                  placeHolder="press enter to add new tag"
                /> */}

                {/* <ChipsArray /> */}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit} className="button">
          Add your question
        </button>
      </div>
    </div>
  );
};

export default Index;
