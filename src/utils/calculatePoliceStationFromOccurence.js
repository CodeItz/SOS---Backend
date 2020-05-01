const Delegacia = require("../models/Delegacia");

module.exports = async function calculatePoliceStationFromOccurence(latitude, longitude) {

    try {
        const delegacia = await Delegacia.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            }
        });

        const { id } = delegacia[0];

        return id;
    } catch (error) {
        console.error('Error');
        console.log(error);

        return 0;
    }

}