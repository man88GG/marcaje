  module.exports =(sequelize, Sequelize) =>{
      const Datos_Modelo = sequelize.define("obtieneD",{
          Hora_Ent:{
              type: Sequelize.STRING
          },
          Hora_Sal: {
              type: Sequelize.STRING
          },
          Empleado_ID:{
              type: Sequelize.STRING

          }

      });
      return Datos_Modelo;
  }

  