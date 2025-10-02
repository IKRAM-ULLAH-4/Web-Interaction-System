function MockupSection() {
  return (
    <section className="py-5 px-3 bg-light">
      <h2 className="text-center mb-4 fw-bold">Preview</h2>
      <div className="card mx-auto shadow" style={{ maxWidth: "400px" }}>
        
        <div className="card-header bg-primary text-white fw-semibold">
          Chat Room
        </div>

        
        <div
          className="card-body overflow-auto"
          style={{ height: "250px" }}
        >
          <div className="d-flex mb-3">
            <div className="bg-light border rounded px-3 py-2">
              Hey! How's it going?
            </div>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <div className="bg-primary text-white rounded px-3 py-2">
              All good working on my MERN project!
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="bg-light border rounded px-3 py-2">
              Nice! Can't wait to see it.
            </div>
          </div>
        </div>

        
        <div className="card-footer d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
          />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </section>
  );
}

export default MockupSection;
