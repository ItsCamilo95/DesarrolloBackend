const Atletas = require('../shared/models/Atletas');

// Crear atleta
const AgregarAtleta = async (req, res) => {
  try {
    const {
      Nombre,
      Apellido,
      Fecha_Nacimiento,
      Sexo,
      Documento,
      Tipo_Documento,
      Email,
      Telefono,
      Deporte,
      Disciplina,
      Categoria,
      Nivel,
      Peso,
      Talla,
      Observaciones
    } = req.body;

    // Validar campos requeridos
    if (!Nombre || !Apellido || !Fecha_Nacimiento || !Sexo || !Documento || !Email || !Telefono || !Deporte || !Disciplina || !Peso || !Talla || !Observaciones) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios: Nombre, Apellido, Fecha_Nacimiento, Sexo, Documento, Email, Telefono, Deporte, Disciplina, Peso, Talla, Observaciones' 
      });
    }

    // Obtener el último ID para generar el siguiente
    const ultimoAtleta = await Atletas.max('ID_Atleta');
    const nuevoID = (ultimoAtleta || 0) + 1;

    const nuevoAtleta = await Atletas.create({
      ID_Atleta: nuevoID,
      Nombre,
      Apellido,
      Fecha_Nacimiento,
      Sexo,
      Documento,
      Tipo_Documento: Tipo_Documento || 'DNI',
      Email,
      Telefono,
      Deporte,
      Disciplina,
      Categoria: Categoria || 'Absoluto',
      Nivel: Nivel || 'Principiante',
      Peso,
      Talla,
      Observaciones,
      Fecha_Registro: new Date(),
      Estado: true
    });

    res.status(201).json({
      message: 'El deportista se agregó de manera correcta',
      timestamp: new Date(),
      data: nuevoAtleta
    });

  } catch (error) {
    console.error('Error al agregar atleta:', error);
    res.status(500).json({ error: 'Error al agregar atleta', details: error.message });
  }
};

// Editar atleta
const EditarAtletas = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Nombre,
      Apellido,
      Fecha_Nacimiento,
      Sexo,
      Documento,
      Tipo_Documento,
      Email,
      Telefono,
      Deporte,
      Disciplina,
      Categoria,
      Nivel,
      Peso,
      Talla,
      Observaciones
    } = req.body;

    const atletaExistente = await Atletas.findByPk(id);

    if (!atletaExistente) {
      return res.status(404).json({ error: 'Atleta no encontrado' });
    }

    await atletaExistente.update({
      Nombre: Nombre || atletaExistente.Nombre,
      Apellido: Apellido || atletaExistente.Apellido,
      Fecha_Nacimiento: Fecha_Nacimiento || atletaExistente.Fecha_Nacimiento,
      Sexo: Sexo || atletaExistente.Sexo,
      Documento: Documento || atletaExistente.Documento,
      Tipo_Documento: Tipo_Documento || atletaExistente.Tipo_Documento,
      Email: Email || atletaExistente.Email,
      Telefono: Telefono || atletaExistente.Telefono,
      Deporte: Deporte || atletaExistente.Deporte,
      Disciplina: Disciplina || atletaExistente.Disciplina,
      Categoria: Categoria || atletaExistente.Categoria,
      Nivel: Nivel || atletaExistente.Nivel,
      Peso: Peso || atletaExistente.Peso,
      Talla: Talla || atletaExistente.Talla,
      Observaciones: Observaciones || atletaExistente.Observaciones
    });

    res.status(200).json({
      message: 'El atleta se editó de manera correcta',
      timestamp: new Date(),
      data: atletaExistente
    });

  } catch (error) {
    console.error('Error al editar atleta:', error);
    res.status(500).json({ error: 'Error al editar atleta', details: error.message });
  }
};

// Obtener todos los atletas
const ObtenerAtletas = async (req, res) => {
  try {
    const atletas = await Atletas.findAll();
    res.status(200).json({
      message: 'Atletas obtenidos correctamente',
      timestamp: new Date(),
      data: atletas
    });
  } catch (error) {
    console.error('Error al obtener atletas:', error);
    res.status(500).json({ error: 'Error al obtener atletas', details: error.message });
  }
};

// Obtener atleta por ID
const ObtenerAtletaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const atleta = await Atletas.findByPk(id);

    if (!atleta) {
      return res.status(404).json({ error: 'Atleta no encontrado' });
    }

    res.status(200).json({
      message: 'Atleta obtenido correctamente',
      timestamp: new Date(),
      data: atleta
    });
  } catch (error) {
    console.error('Error al obtener atleta:', error);
    res.status(500).json({ error: 'Error al obtener atleta', details: error.message });
  }
};

// Eliminar atleta
const EliminarAtleta = async (req, res) => {
  try {
    const { id } = req.params;
    const atleta = await Atletas.findByPk(id);

    if (!atleta) {
      return res.status(404).json({ error: 'Atleta no encontrado' });
    }

    await atleta.destroy();

    res.status(200).json({
      message: 'Atleta eliminado correctamente',
      timestamp: new Date(),
      data: atleta
    });
  } catch (error) {
    console.error('Error al eliminar atleta:', error);
    res.status(500).json({ error: 'Error al eliminar atleta', details: error.message });
  }
};

module.exports = { 
  AgregarAtleta,
  EditarAtletas,
  ObtenerAtletas,
  ObtenerAtletaPorId,
  EliminarAtleta
};
