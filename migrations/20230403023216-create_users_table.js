module.exports = {
  async up(db) {
    await db.createCollection('users',{
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [ "name", "email", "username", "password", "role", "createdAt" ],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            email: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            username: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            password: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            role: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            avatar: {
              bsonType: "string",
              description: "must be a image in : jpg, png, jpeg only for image type"
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date and is required"
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date"
            },
            deletedAt: {
              bsonType: "date",
              description: "must be a date"
            }
          }
        }
      }
    });
  },

  async down(db) {
    await db.dropCollection('users');
  },
};
