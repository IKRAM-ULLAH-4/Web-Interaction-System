import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  img: { type: String, required: true },       // Store image path or URL
  title: { type: String, required: true },
  text: { type: String, required: true },
  link: { type: String, default: "#" },      
});

export default mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);
