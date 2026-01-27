const Service = require("../models/Service");

exports.getServices = async (req, res) => {
  console.log("GET /api/services called");
  try {
    const services = await Service.find().sort({ createdAt: -1 }).lean();
    console.log(`Successfully fetched ${services.length} services`);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error in getServices:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createService = async (req, res) => {
  const service = new Service(req.body);
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
