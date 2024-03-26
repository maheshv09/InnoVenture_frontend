import React, { useState } from "react";
import axios from "axios";
const StartupForm = ({ startup, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: startup.name || "",
    description: startup.description || "",
    usp: startup.usp || "",
    valuation: startup.valuation,
    availableEquity: startup.availableEquity,
    photo: startup.photo || null,
    data: startup.data || null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("MAHIIII:", name);
    if (name !== "data") {
      console.log("XYZ:", name);
      setFormData({ ...formData, [name]: value });
    } else {
      //

      if (files.length > 0) {
        const file = files[0];
        setFormData({ ...formData, [name]: file });
      }
    }
  };
  const handlePhotoUpload = async (e) => {
    const photo1 = e.target.files[0];
    const formData1 = new FormData();
    formData1.set("image", photo1);
    await axios
      .post(
        "https://api.imgbb.com/1/upload?key=e260abee406449ae9e7c159665ef502c",
        formData1
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setFormData({ ...formData, photo: url });
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData1 = new FormData();
    // formData1.append("name", formData.name);
    // formData1.append("description", formData.description);
    // formData1.append("usp", formData.usp);
    // formData1.append("photo", formData.photo);
    // // If a new photo file is provided, append it to the FormData

    // // If a new data file is provided, append it to the FormData
    // if (formData.data instanceof File) {
    //   formData1.append("data", formData.data);
    // }

    onSubmit(formData);
    // try {
    //   console.log("MKVVV11");
    // const formData1 = new FormData();
    // formData1.append("name", formData.name);
    // formData1.append("description", formData.description);
    // formData1.append("usp", formData.usp);
    // formData1.append("photo", formData.photo);
    // // If a new photo file is provided, append it to the FormData

    // // If a new data file is provided, append it to the FormData
    // if (formData.data instanceof File) {
    //   formData1.append("data", formData.data);
    // }
    // console.log("FORMMMDATA::", formData1);
    //   Send updated profile data to backend
    //   const resp = await axios.patch(
    //     `http://localhost:8000/updateStartup/${email}`,
    //     formData1,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("Response:", resp);
    //   return;
    //   // Refresh startup data after update
    //   // fetchEmail();
    //   // setIsEditing(false); // Disable editing mode after saving
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />

      <label>Description</label>
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <br />

      <label>USP</label>
      <input name="usp" value={formData.usp} onChange={handleChange} required />
      <br />

      <label>Current Valuation</label>
      <input
        name="valuation"
        value={formData.valuation}
        onChange={handleChange}
        required
      />
      <br />
      <label>Current Available Equity</label>
      <input
        name="availableEquity"
        value={formData.availableEquity}
        onChange={handleChange}
        required
      />
      <br />

      <label>Photo</label>
      <input
        type="file"
        name="photo"
        onChange={handlePhotoUpload}
        accept="image/*"
      />
      <br />

      <label>Data Upload</label>
      <input type="file" name="data" onChange={handleChange} />
      <br />

      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default StartupForm;
