import { useState } from "react";
import { z } from "zod";

function ChannelManagement() {
  const [channelData, setChannelData] = useState({});
  const [errors, setErrors] = useState({});

  // ----------------------------------------------
  // ZOD SCHEMA
  // ----------------------------------------------
  const ChannelSchema = z.object({
    channelName: z.string().min(2, "Channel name is required"),
    category: z.enum([
      "General",
      "Support",
      "Announcement",
      "Community",
      "Private",
    ]),
    channelType: z.enum(["Public", "Private", "Restricted"]),
    maxMembers: z
      .number({
        required_error: "Max members is required",
        invalid_type_error: "Invalid number",
      })
      .min(1, "Must be at least 1"),

    description: z.string().min(5, "Description must be at least 5 characters"),

    modIds: z.string().optional(),

    isActive: z.boolean(),
    fileStorageEnabled: z.boolean(),
    fileUploadAllowed: z.boolean(),
  });

  // ----------------------------------------------
  // HANDLE INPUT CHANGE
  // ----------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setChannelData({
      ...channelData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ----------------------------------------------
  // HANDLE SUBMIT
  // ----------------------------------------------
  const handleClick = (e) => {
    e.preventDefault();

    // Convert numeric fields
    const processedData = {
      ...channelData,
      maxMembers: channelData.maxMembers
        ? Number(channelData.maxMembers)
        : undefined,
    };

    const result = ChannelSchema.safeParse(processedData);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors(formatted);
      console.error("Validation Errors:", formatted);
      return;
    }

    setErrors({});
    console.log("Validated Channel Data:", result.data);
    alert("Channel Created Successfully!");
  };

  return (
    <section>
      <div className="container">
        <h2>Channel Management</h2>
        <p>Create and Manage Chat Channels and Rooms</p>

        {/* ----- Validation Errors ----- */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            <strong>Please fix the following errors:</strong>
            <ul className="mt-2 mb-0">
              {Object.entries(errors).map(([key, value]) => {
                if (value?._errors) {
                  return <li key={key}>{value._errors.join(", ")}</li>;
                }
                return null;
              })}
            </ul>
          </div>
        )}

        <div className="row g-4">
          {/* Channel Name */}
          <div className="col-md-6">
            <label className="label-form">Channel Name</label>
            <input
              type="text"
              name="channelName"
              className="form-control"
              placeholder="General-chat"
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="label-form">Category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleChange}
            >
              <option value="General">General</option>
              <option value="Support">Support</option>
              <option value="Announcement">Announcement</option>
              <option value="Community">Community</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Channel Type */}
          <div className="col-md-6">
            <label className="label-form">Channel Type</label>
            <select
              name="channelType"
              className="form-control"
              onChange={handleChange}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Restricted">Restricted</option>
            </select>
          </div>

          {/* Max Members */}
          <div className="col-md-6">
            <label className="label-form">Max Members</label>
            <input
              type="number"
              name="maxMembers"
              className="form-control"
              onChange={handleChange}
              placeholder="100"
            />
          </div>

          {/* Description */}
          <div className="col-md-12">
            <label className="label-form fw-medium">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Enter Channel Description here"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Moderator IDs */}
          <div className="col">
            <label className="label-form">Moderator IDs</label>
            <textarea
              name="modIds"
              className="form-control"
              placeholder="ID1, ID2, ID3"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Toggles */}
          <div className="row mt-4">
            {/* Active */}
            <div className="col-md-4">
              <div className="border rounded px-4 py-3 bg-white shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold mb-0">Active</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isActive"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-muted small mt-2 ms-1">Channel is active</p>
              </div>
            </div>

            {/* File Storage Enabled */}
            <div className="col-md-4">
              <div className="border rounded px-4 py-3 bg-white shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <label>File Storage Enabled</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="fileStorageEnabled"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-muted small mt-2 ms-1">
                  Allows file storage
                </p>
              </div>
            </div>

            {/* File Upload Allowed */}
            <div className="col-md-4">
              <div className="border rounded px-4 py-3 bg-white shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <label>Allow File Uploads</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="fileUploadAllowed"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-muted small mt-2 ms-1">
                  Enable users to upload files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-primary" onClick={handleClick}>
            Create Channel
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setChannelData({})}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChannelManagement;
