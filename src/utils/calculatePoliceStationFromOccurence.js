const Delegacia = require("../models/Delegacia");

module.exports = async function calculatePoliceStationFromOccurence(latitude, longitude) {

    const POLICESTATION_STANDART = 0;

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
            },
            active: true
        });

        if (delegacia.length > 0) {
            const { id } = delegacia[0];
            return id;
        }

        throw "ERROR: No one PoliceStation near";
     
    } catch (error) {
        console.error('Error');
        console.log(error);

        return POLICESTATION_STANDART;
    }

}