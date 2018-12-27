const sequelize = require('./dbconnection');

const exist = (id, tableName, transaction) => new Promise((resolve, reject) => {
  sequelize
    .query(
      `SELECT COUNT(1) total FROM ${tableName} WHERE id = :id`,
      {
        replacements: { id: parseInt(id, 10) },
        type: sequelize.QueryTypes.SELECT,
        transaction,
      },
    )
    .then(result => resolve(result[0].total))
    .catch((err) => {
      reject(err);
    });
});

const toDelete = (id, tableName, transaction) => sequelize.query(
  `DELETE FROM ${tableName} WHERE id = :id`,
  {
    replacements: { id: parseInt(id, 10) },
    type: sequelize.QueryTypes.DELETE,
    transaction,
  },
);

module.exports.tryToDelete = async (objectId, tableName, transaction, res) => {
  const exists = await exist(objectId, tableName, transaction);

  if (!exists) { res.notFoundError('Recurso no encontrado'); }

  try {
    await toDelete(objectId, tableName, transaction);
  } catch (error) {
    switch (error.name) {
      case 'SequelizeForeignKeyConstraintError':
        res.error('El elemento esta en uso');
        break;
      default:
        res.error('No se pudo eliminar el elemento');
    }
  }
};
