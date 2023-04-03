module.exports = {
  async up(db) {
    await db.createCollection('posts',{
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [ "author", "title", "body", "createdAt" ],
          properties: {
            author: {
              bsonType: "string",
              description: "must be a object id and is required"
            },
            title: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            body: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            thumbnail: {
              bsonType: "string",
              description: "must be a image in : jpg, png, jpeg only for image type"
            },
            location: {
              bsonType: "string",
              description: "must be a string"
            },
            totalLike: {
              bsonType: "string",
              description: "must be a number, default: 0"
            },
            comments: {
              bsonType: "array",
              description: "must be a array object"
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
    await db.dropCollection('posts');
  },
};
