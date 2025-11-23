import Step from "../models/Step.model.js";

export const getSteps = async (req, res) => {
  const steps = await Step.find().sort({ number: 1 });
  res.json(steps);
};

// export const createStep = async (req, res) => {
//   const step = new Step(req.body);
//   await step.save();
//   res.json({ message: "Step created", step });
// };

// export const updateStep = async (req, res) => {
//   const { id } = req.params;
//   const updated = await Step.findByIdAndUpdate(id, req.body, { new: true });
//   res.json({ message: "Step updated", updated });
// };

// export const deleteStep = async (req, res) => {
//   const { id } = req.params;
//   await Step.findByIdAndDelete(id);
//   res.json({ message: "Step deleted" });
// };
