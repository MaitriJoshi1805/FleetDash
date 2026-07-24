const redisClient = require("../config/redis");

const getAllVehicles = async (req, res) => {
    try {

        const keys = await redisClient.keys("vehicle:*");

        const vehicles = [];

        for (const key of keys) {
            const data = await redisClient.get(key);
            vehicles.push(JSON.parse(data));
        }

        res.status(200).json({
            success: true,
            count: vehicles.length,
            vehicles
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch vehicles"
        });

    }
};

module.exports = {
    getAllVehicles
};