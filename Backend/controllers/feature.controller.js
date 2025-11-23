import Feature from "../models/feature.model.js";

// Get all features
export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch features", error });
  }
};

// // Create a new feature (Admin)
// export const createFeature = async (req, res) => {
//   try {
//     const { img, title, text, link } = req.body;
//     const newFeature = new Feature({ img, title, text, link });
//     const savedFeature = await newFeature.save();
//     res.status(201).json(savedFeature);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create feature", error });
//   }
// };

// // Update a feature (Admin)
// export const updateFeature = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedFeature = await Feature.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(updatedFeature);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update feature", error });
//   }
// };

// // Delete a feature (Admin)
// export const deleteFeature = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Feature.findByIdAndDelete(id);
//     res.json({ message: "Feature deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete feature", error });
//   }
// };
