// __mocks__/mongoose.js

const mockConnection = {
  status: 'connected',
};

const mockMongoose = {
  connect: jest.fn().mockResolvedValue(mockConnection),
};

module.exports = mockMongoose;
