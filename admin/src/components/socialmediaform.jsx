import React, { useState, useEffect } from "react";
import Button, { Switchslider } from "./Button.jsx";
import axios from "axios";
import Linkedin from "../assets/icons/linkedin.png";
import Instagram from "../assets/icons/instagram.png";
import Facebook from "../assets/icons/facebook.png";
import Youtube from "../assets/icons/youtube.png";
import X from "../assets/icons/x.png";
import { CiSaveUp2 } from "react-icons/ci";

function socialmediaform() {
  const [formdata, setformdata] = useState({
    linkedin: {
      url: "",
      enabled: false,
    },
    instagram: {
      url: "",
      enabled: false,
    },
    facebook: {
      url: "",
      enabled: false,
    },
    youtube: {
      url: "",
      enabled: false,
    },
    x: {
      url: "",
      enabled: false,
    },
  });

  const handlechange = (data) => {
    const shallowcopy = { ...formdata };
    shallowcopy[data.name] = {
      ...shallowcopy[data.name],
      [data.field]: data.value,
    };
    setformdata(shallowcopy);
  };
  console.log(formdata);
  const url =
    import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${url}/socialmediaapi/getallsocials`);
        const alldata = response.data.data;
        setformdata({
          linkedin: {
            url: alldata.linkedin.url,
            enabled: alldata.linkedin.enabled,
          },
          instagram: {
            url: alldata.instagram.url,
            enabled: alldata.instagram.enabled,
          },
          facebook: {
            url: alldata.facebook.url,
            enabled: alldata.facebook.enabled,
          },
          youtube: {
            url: alldata.youtube.url,
            enabled: alldata.youtube.enabled,
          },
          x: {
            url: alldata.x.url,
            enabled: alldata.x.enabled,
          },
        });
      } catch (error) {
        console.log("API error while fetching socialmedia data: ", error);
      }
    };
    fetchdata();
  }, []);

  const submitchanges = async (e) => {
    e.preventDefault();
    const socialmedia = Object.entries(formdata);
    for (const [platform, data] of socialmedia) {
      if (data.enabled && (data.url === "" || !data.url.trim())) {
        console.log("If enabled , fill up...");
        return;
      }
    }

    try {
      const response = await axios.put(
        `${url}/socialmediaapi/updatesocials`,
        formdata,
      );
      const { success, message, data } = response.data;
      if (success) {
        console.log("Successfully update all social media");
        console.log(data);
      }
    } catch (error) {
      console.log("API error updating social media details:", error);
    }
  };

  return (
    <form method="put" onSubmit={submitchanges} className=" w-full">
      <div className="flex flex-col gap-6 manrope">
        <div className="flex gap-3 items-center">
          <label htmlFor="linkedin">
            <img
              src={Linkedin}
              className="navbaricons iconanimate"
              alt="Linkedin"
            />
          </label>
          <input
            disabled={!formdata.linkedin.enabled}
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="e.g. ./linkedin.com"
            className="inputbox3 "
            onChange={(e) =>
              handlechange({
                name: e.target.name,
                field: "url",
                value: e.target.value,
              })
            }
            value={formdata.linkedin.url}
          />
          <Switchslider
            checked={formdata.linkedin.enabled}
            click={() =>
              handlechange({
                name: "linkedin",
                field: "enabled",
                value: formdata.linkedin.enabled ? false : true,
              })
            }
          />
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="instagram">
            <img src={Instagram} className="navbaricons iconanimate" alt="" />
          </label>
          <input
            disabled={!formdata.instagram.enabled}
            id="linkedin"
            id="instagram"
            name="instagram"
            type="type"
            placeholder="e.g. www.instagram.com"
            className="inputbox3"
            onChange={(e) =>
              handlechange({
                name: e.target.name,
                field: "url",
                value: e.target.value,
              })
            }
            value={formdata.instagram.url}
          />
          <Switchslider
            checked={formdata.instagram.enabled}
            click={() =>
              handlechange({
                name: "instagram",
                field: "enabled",
                value: formdata.instagram.enabled ? false : true,
              })
            }
          />
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="facebook">
            <img src={Facebook} className="navbaricons iconanimate" alt="" />
          </label>
          <input
            disabled={!formdata.facebook.enabled}
            id="linkedin"
            id="facebook"
            name="facebook"
            type="url"
            placeholder="https://www.facebook.com/..."
            className="inputbox3"
            onChange={(e) =>
              handlechange({
                name: e.target.name,
                field: "url",
                value: e.target.value,
              })
            }
            value={formdata.facebook.url}
          />
          <Switchslider
            checked={formdata.facebook.enabled}
            click={() =>
              handlechange({
                name: "facebook",
                field: "enabled",
                value: formdata.facebook.enabled ? false : true,
              })
            }
          />
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="youtube">
            <img src={Youtube} className="navbaricons iconanimate" alt="" />
          </label>
          <input
            disabled={!formdata.youtube.enabled}
            id="linkedin"
            id="youtube"
            name="youtube"
            type="url"
            placeholder="https://www.yoyutube.com/..."
            className="inputbox3"
            onChange={(e) =>
              handlechange({
                name: e.target.name,
                field: "url",
                value: e.target.value,
              })
            }
            value={formdata.youtube.url}
          />
          <Switchslider
            checked={formdata.youtube.enabled}
            click={() =>
              handlechange({
                name: "youtube",
                field: "enabled",
                value: formdata.youtube.enabled ? false : true,
              })
            }
          />
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="x">
            <img src={X} className="navbaricons iconanimate" alt="" />
          </label>
          <input
            disabled={!formdata.x.enabled}
            id="linkedin"
            id="x"
            name="x"
            type="url"
            placeholder="https://www.x.com/..."
            className="inputbox3"
            onChange={(e) =>
              handlechange({
                name: e.target.name,
                field: "url",
                value: e.target.value,
              })
            }
            value={formdata.x.url}
          />
          <Switchslider
            checked={formdata.x.enabled}
            click={() =>
              handlechange({
                name: "x",
                field: "enabled",
                value: formdata.x.enabled ? false : true,
              })
            }
          />
        </div>
      </div>

      <div className=" flex mt-10 justify-start">
        <Button
          type="submit"
          themecss="bg-blue-700 rounded-[5px] buttonanimation1 text-white text-[0.8rem] px-4 py-2 manrope"
          Content="Save Links"
          icon={<CiSaveUp2 className="scale-[1.3]" />}
        />
      </div>
    </form>
  );
}

export default socialmediaform;
