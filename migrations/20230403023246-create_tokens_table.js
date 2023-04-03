module.exports = {
  async up(db) {
    await db.createCollection('tokens',{
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [ "owner", "token", "createdAt" ],
          properties: {
            owner: {
              bsonType: "string",
              description: "must be a object id and is required"
            },
            token: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date and is required"
            },
          }
        }
      }
    });
  },

  async down(db) {
    await db.dropCollection('tokens');
  },
};
