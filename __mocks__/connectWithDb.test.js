import connectWithDb from '../mongo';
import mongoose from 'mongoose';

jest.mock('mongoose');

describe('connectWithDb', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to the database', async () => {
    const result = await connectWithDb();
    expect(mongoose.connect).toHaveBeenCalledWith(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    expect(result).toBe(true);
  });
});
