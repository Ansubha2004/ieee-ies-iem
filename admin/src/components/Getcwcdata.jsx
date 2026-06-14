import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { TbPhotoEdit } from "react-icons/tb";
import Button from "../components/Button.jsx";
import { successmessage, errormessage } from "../util/notification.js";

function Getcwcdata({setcount}) {
  const [cwcdata, setcwcdata] = useState([]);
  const [editId, seteditId] = useState("");
  const [editformdata, seteditformdata] = useState();
  const [preview, setpreview] = useState("");
  const url =
    import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";
  useEffect(() => {
    const fetchcwcdata = async () => {
      try {
        const getcwcdata = await axios.get(`${url}/cwcapi/getallcwc`);
        setcwcdata(getcwcdata.data.data);
        const cwc=getcwcdata.data.data.filter(member=>member.membertype==="CWC").length;
        const executives=getcwcdata.data.data.filter(member=>member.membertype==="Executives").length;
        setcount([cwc,executives]);
      } catch (err) {
        errormessage("API error fetching data....", err);
      }
    };
    fetchcwcdata();
  }, []);

  const editbutton = (cwc) => {
    editId === cwc._id ? seteditId("") : seteditId(cwc._id);
    seteditformdata({
      id: cwc.id,
      name: cwc.name,
      role: cwc.role,
      image: cwc.image,
      linkedin: cwc.socialmedia[0].link,
      email: cwc.socialmedia[1].link,
      description: cwc.description,
      membertype: cwc.membertype,
    });
    if (preview) {
      URL.revokeObjectURL(preview);
      setpreview("");
    }
  };

  const handlechange = (e) => {
    const { name, value, type, files } = e.target;
    const shallowcopy = { ...editformdata };
    shallowcopy[name] = type === "file" ? files[0] : value;
    seteditformdata(shallowcopy);
    if (files?.[0] && type === "file")
      setpreview(URL.createObjectURL(files[0]));
  };

  const submitchange = async () => {
    const { id, name, role, image, linkedin, email, description, membertype } =
      editformdata;
    if (
      !String(id).trim() ||
      !name.trim() ||
      !role.trim() ||
      !image ||
      !linkedin.trim() ||
      !email.trim() ||
      !description.trim() ||
      !membertype
    ) {
      errormessage("Dont leave the credentials blank...");
      return;
    }
    try {
      const newdata = new FormData();

      const socialmedia = JSON.stringify([
        { platform: "LinkedIn", link: linkedin.trim() },
        { platform: "Email", link: email.trim() },
      ]);

      newdata.append("id", id);
      newdata.append("name", name.trim());
      newdata.append("role", role.trim());
      if (image instanceof File) newdata.append("image", image);
      newdata.append("description", description.trim());
      newdata.append("socialmedia", socialmedia);
      newdata.append("membertype", membertype);

      const response = await axios.put(
        `${url}/cwcapi/updatecwc/${editId}`,
        newdata,
      );
      const { success, message, data } = response.data;
      if (success) {
        successmessage("Data posted successfully");
        setcwcdata((prev) =>
          prev.map((member) =>
            member._id === editId
              ? {
                  ...member,
                  id,
                  name,
                  role,
                  description,
                  socialmedia: [
                    { platform: "LinkedIn", link: linkedin },
                    { platform: "Email", link: email },
                  ],
                  membertype,
                  image: preview || member.image,
                }
              : member,
          ),
        );

        seteditId("");
        setpreview("");
      } else {
        errormessage("Error:", message || "Failed to save member");
      }
    } catch (err) {
      errormessage("API error updating members...:", err);
    }
  };

  const deletemember = async (cwc) => {
    try {
      const response = await axios.delete(`${url}/cwcapi/deletecwc/${cwc}`);
      const { success, message, error } = response.data;
      if (!success) {
        errormessage("Delete unsuccessful: ", error);
        return;
      }
      successmessage("Deletion successful:", message);
      setcwcdata((prev) => prev.filter((member) => member._id !== cwc));
    } catch (err) {
      console.log("API error deleting cwc member data: ", err);
    }
  };

  return (
    <div className="w-full h-auto mt-5">
      <div className="space-y-4">
        {cwcdata.map((cwc, index) => (
          <div
            key={index}
            className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex gap-5 flex-1">
                    <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={
                          cwc._id === editId && preview ? preview : cwc.image
                        }
                        alt={cwc.name}
                        className="w-full h-full object-cover"
                      />
                      {editId === cwc._id && (
                        <label className="absolute bottom-1 right-1 w-8 h-8 flex items-center justify-center bg-black/70 rounded-full cursor-pointer z-[5] hover:bg-black/90 transition-colors">
                          <input
                            className="hidden"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handlechange}
                          />
                          <TbPhotoEdit className="text-white text-lg" />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col  flex-1">
                      {editId === cwc._id && editformdata ? (
                        <input
                          onChange={handlechange}
                          type="text"
                          className="w-1/2 text-lg font-bold text-blue-900 border-blue-700/30 bg-blue-50 inputbox2"
                          name="name"
                          value={editformdata.name}
                        />
                      ) : (
                        <h3 className="text-lg font-bold text-blue-900">
                          {cwc.name}
                        </h3>
                      )}

                      {editId === cwc._id && editformdata ? (
                        <input
                          onChange={handlechange}
                          className="w-1/2 text-sm text-gray-600 mt-1 border-gray-200 bg-gray-100 inputbox2"
                          type="text"
                          name="role"
                          value={editformdata.role}
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{cwc.role}</p>
                      )}

                      <div className="flex gap-3">
                        {editId === cwc._id && editformdata ? (
                          <input
                            onChange={handlechange}
                            type="number"
                            min="0"
                            max="20"
                            className="w-15 text-center mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 inputbox2"
                            name="id"
                            value={editformdata.id}
                          />
                        ) : (
                          <span className="w-fit mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {cwc.id}
                          </span>
                        )}
                        {editId === cwc._id && editformdata ? (
                          <select
                            onChange={handlechange}
                            className=" text-center mt-2  rounded-full text-xs font-medium bg-blue-100 bg-white border-green-500  text-green-700 inputbox2 border-[2px]"
                            name="membertype"
                            value={editformdata.membertype}
                          >
                            <option value="">Select Type</option>
                            <option value="Founder">Founder</option>
                            <option value="CWC">CWC member</option>
                            <option value="Executives">Executive member</option>
                          </select>
                        ) : (
                          <span className="text-center mt-2 py-1 px-3 rounded-full text-xs font-medium bg-blue-100 bg-white border-green-500  text-green-700  border-[2px]">
                            {cwc.membertype}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <Button
                      themecss={`px-4 py-2 buttonanimation1 rounded-md ${editId === cwc._id ? `bg-red-500 hover:bg-red-600` : `bg-amber-500 hover:bg-amber-600`}  text-white `}
                      Content={editId === cwc._id ? `Cancel` : `Edit`}
                      click={() => editbutton(cwc)}
                    />
                    <Button
                      themecss={`px-4 py-2 rounded-md buttonanimation1 ${editId === cwc._id ? `bg-amber-500 hover:bg-amber-600` : `bg-red-500 hover:bg-red-600`}  text-white `}
                      Content={editId === cwc._id ? `Submit` : `Delete`}
                      click={() =>
                        editId === cwc._id
                          ? submitchange()
                          : deletemember(cwc._id)
                      }
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <span className="font-semibold">LinkedIn:</span>{" "}
                    {editId === cwc._id && editformdata ? (
                      <input
                        onChange={handlechange}
                        type="url"
                        className="mt-1 w-full text-sm py-1 text-gray-600 border-gray-200 bg-gray-100 inputbox2"
                        name="linkedin"
                        value={editformdata.linkedin}
                        placeholder="https://linkedin.com/in/..."
                      />
                    ) : (
                      <span className="break-all">
                        <a href={cwc.socialmedia[0]?.link} target="main">{cwc.socialmedia?.[0]?.link}</a>
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {editId === cwc._id && editformdata ? (
                      <input
                        onChange={handlechange}
                        type="email"
                        className="mt-1 w-full py-1 text-sm text-gray-600 border-gray-200 bg-gray-100 inputbox2"
                        name="email"
                        value={editformdata.email}
                        placeholder="member@example.com"
                      />
                    ) : (
                      <span className="break-all">
                        <a href={`mailto:${cwc.socialmedia?.[1]?.link}`}>{cwc.socialmedia?.[1]?.link}</a>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-3 bg-gray-50 border rounded-lg p-3">
                  {editId === cwc._id && editformdata ? (
                    <textarea
                      onChange={handlechange}
                      className="text-sm text-gray-600 border-white w-full h-30 inputbox2 p-0"
                      name="description"
                      value={editformdata.description}
                    ></textarea>
                  ) : (
                    <p className="text-sm text-gray-600  line-clamp-3">
                      {cwc.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Getcwcdata;
