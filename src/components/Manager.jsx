import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, {...form,id:uuidv4()}])
      );
      console.log(...passwordArray, form);
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Site, Username and Password must be atleast 3 characters", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
      toast("Password deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}
      <div className="p-2 md:p-0 md:mycontainer">
        <div className="heading text-white">
          <div className="text-4xl font-bold text-center">
            <span className="text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </div>
          <p className="text-lg text-green-300 text-center">
            Your own password manager
          </p>
        </div>
        <div className="flex flex-col p-4 text-white gap-2 items-center">
          <input
            type="text"
            value={form.site}
            onChange={handleChange}
            className="rounded-full text-black py-2 my-2 px-4  border-2 border-green-500 w-full"
            placeholder="Enter website URL"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
            <input
              type="text"
              value={form.username}
              onChange={handleChange}
              className="rounded-full text-black py-2 px-4 border-2 border-green-500 w-full"
              placeholder="Enter username"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                type="password"
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full text-black py-2 px-4 border-2 border-green-500 w-full"
                placeholder="Enter password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 text-black top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-400 rounded-full px-4 py-2 w-fit mt-2 border border-green-900"
          >
            <div className="invert">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
            </div>
            Save
          </button>
        </div>

        <div className="passwords text-white">
          <h2 className="text-xl text-center font-bold py-4">Your Passwords</h2>

          {passwordArray.length === 0 && (
            <div className="text-center text-lg">No passwords to show</div>
          )}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full mt-4 mb-20 overflow-hidden rounded-lg">
              <thead className="bg-gradient-to-br from-black to-gray-700">
                <tr>
                  <th className="py-2 border border-black">Site</th>
                  <th className="py-2 border border-black">Username</th>
                  <th className="py-2 border border-black">Password</th>
                  <th className="py-2 border border-black">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-br from-black to-gray-700">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-black w-32 ">
                        <div className="flex justify-center gap-1 items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordIconCopy invert cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-black w-32">
                        <div className="flex justify-center gap-1 items-center">
                          <div>{item.username}</div>
                          <div
                            className="lordIconCopy invert cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-black w-32">
                        <div className="flex justify-center items-center gap-1">
                          <div>{item.password}</div>
                          <div
                            className="lordIconCopy invert cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-black w-32">
                        <div className="flex justify-center items-center gap-4">
                          <span
                            className="cursor-pointer invert"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer invert"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
