const {usuario} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const usuario = await usuario.findOne({where:{email}});
        if(!usuario){
            return res.status(404).json({message: "Lo 100to no existe el usuario"});
        }
        const validarContra = usuario.validarContrasena(password);

        if(!validarContra){
            return res.status(401).json({error: "La constraseña es inconrrecta"}); //401 Unauthorized
        }

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'} //Expira en 1 hora
            
        )

        res.json({token});

    }catch(error){
        return res.status(500).json({error: "Error al iniciar sesión"});
    }

    
}

module.exports = {login}