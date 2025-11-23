import { useState } from "react";

function ChannelManagement() {
  const [channelData, setchannleData] = useState({});
  const handleChage = (e) => {
    setchannleData({ ...channelData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(channelData);
  };
  return (
    <section>
      <div className="container">
        <h2>Channel Management</h2>
        <p>Create and Manage Chat Channels and Rooms</p>
        <div className="row g-4">
          <div className="col-md-6">
            <label htmlFor="channel-name" className="label-form">
              Channel Name
            </label>
            <input
              type="text"
              name="Channel Name"
              id="channel-name"
              className="form-control"
              placeholder="Ganeral-chat"
              onChange={handleChage}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="catogary" className="label-form">
              Catogary
            </label>
            <select
              name="Catogary"
              id="catogary"
              className="form-control"
              onChange={handleChage}
            >
              <option value="Ganeral">Ganeral</option>
              <option value="Support">Support</option>
              <option value="Announcement">Announcement</option>
              <option value="Community">Community</option>
              <option value="Prvate">Private</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="type" className="label-form">
              Channel Type
            </label>
            <select
              name="Channel Type"
              id="type"
              className="form-control"
              onChange={handleChage}
            >
              <option value="">Public</option>
              <option value="">Private</option>
              <option value="">Restricted</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="member" className="label-form">
              Max Members
            </label>
            <input
              type="number"
              name="Max Joining"
              id="member"
              onChange={handleChage}
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="desc" className="label-form fw-medium">
              Description
            </label>
            <textarea
              name="Description"
              onChange={handleChage}
              id="desc"
              className="form-control"
              placeholder="Enter Channel Description here"
            ></textarea>
          </div>
          <div className="col">
            <label htmlFor="mods" className="label-form">
              Moderator IDs
            </label>
            <textarea
              name="Mod ID"
              onChange={handleChage}
              id=""
              className="form-control"
              placeholder="ID1 , ID2 , ID3"
            ></textarea>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="border rounded px-4 py-3 bg-white shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="isActive"
                    className="form-label mb-0 fw-semibold"
                  >
                    Active
                  </label>
                  <div className="form-check form-switch m-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      name="IsActive"
                      checked={true}
                      onChange={handleChage}
                    />
                  </div>
                </div>
                <p className="text-muted small mt-2 mb-0 ms-1">
                  Channel is active
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded px-4 py-3 bg-white shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="fileStorage">File Storage</label>
                  <div className="form-check form-switch m-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="fileStorage"
                      checked={true}
                      name="File Storage Enable?"
                      onChange={handleChage}
                    />
                  </div>
                </div>
                <p className="text-muted small mt-2 mb-0 ms-1">
                  Allow files Upload
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded px-4 py-3 bg-white shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="fileStorage">File Storage</label>
                  <div className="form-check form-switch m-0">
                    <input
                      name="File Storage"
                      className="form-check-input"
                      type="checkbox"
                      id="fileStorage"
                      checked={true}
                      onChange={handleChage}
                    />
                  </div>
                </div>
                <p className="text-muted small mt-2 mb-0 ms-1">
                  Allow files Upload
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Create Channel
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
export default ChannelManagement;
