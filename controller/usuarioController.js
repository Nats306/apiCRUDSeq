const { Usuario } = require("../models");
const bycrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addUser = async (req, res) => {
    try {
        const { nombre, email, password} = req.body;
        const hashContrsena = await bycrypt.hash(password, 10);

        const usuario = await Usuario.create({ nombre, email, password: hashContrsena });
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if(nombre) usuario.nombre = nombre;
        if(email) usuario.email = email;
        if(password) usuario.password = password;

        await usuario.save();

        return res.status(200).json({message: "Usuario actualizado", usuario});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario recibido en la URL
        const { estado } = req.body; // Estado recibido en el cuerpo de la petición

        // Validar que el estado sea "Activo" o "Inactivo"
        if (!["Activo", "Inactivo"].includes(estado)) {
            return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
        }

        // Buscar el usuario por ID
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualizar el estado del usuario
        usuario.estado = estado;
        await usuario.save();

        res.json({ message: `Estado actualizado a ${estado}`, usuario });
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { getUsers , addUser, updateUser, changeUserStatus}