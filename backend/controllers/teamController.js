const Team = require("../models/Team");

exports.getTeamMembers = async (req, res) => {
  console.log("GET /api/team called");
  try {
    const team = await Team.find().sort({ order: 1, createdAt: -1 }).lean();
    console.log(`Successfully fetched ${team.length} team members`);
    res.status(200).json(team);
  } catch (error) {
    console.error("Error in getTeamMembers:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createTeamMember = async (req, res) => {
  const member = new Team(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
