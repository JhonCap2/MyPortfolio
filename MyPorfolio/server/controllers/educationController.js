import Education from "../models/education.js";

export const getEducations = async (req, res) => {
  const educations = await Education.find();
  res.json(educations);
};

export const createEducation = async (req, res) => {
  const education = new Education(req.body);
  await education.save();
  res.json(education);
};

export const deleteEducation = async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: "Education deleted" });
};
