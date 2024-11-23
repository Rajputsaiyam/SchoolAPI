const School = require('../model/school.model');

// Haversine formula to calculate distance between two lat-long points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;

    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

exports.addSchool = async (req, res) => {
  try {
    const { id, name, address, latitude, longitude } = req.body;

    if (!id || !name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const result = await School.addSchool({ id, name, address, latitude, longitude });
    res.status(201).json({ message: "School added successfully!", data: result });
  } catch (err) {
    console.error("Error adding school:", err.message); // Logs detailed error
    res.status(500).json({ error: "Server error." }); // Generic message for the client
  }
};


exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    // Input Validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Latitude and Longitude must be numbers.' });
    }

    try {
        const schools = await School.getSchools();

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = schools.map((school) => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
        })).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
};
