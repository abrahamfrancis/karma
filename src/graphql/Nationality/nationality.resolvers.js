const connection = require('../../db/db');

module.exports = {
  Query: {
    nationality: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('nationality').select().where('id', id);
      } else {
        result = await connection('nationality').select();
      }
      return result;
    },
  },
};
