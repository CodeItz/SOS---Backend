const Usuarios =  require("../models/Usuario");
const Delegacia =  require("../models/Delegacia");

module.exports = async function(){
    const countUser = await Usuarios.countDocuments();
    const countPoliceStation = await Delegacia.countDocuments();
    const id = countUser + countPoliceStation;

    return id;
}