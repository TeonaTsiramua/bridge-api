import { connect } from 'mongoose';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';

AdminJS.registerAdapter({ Database, Resource });

const initialize = async () => {
  const db = await connect(process.env.DATABASE_URL as string);

  return { db };
};

export default initialize;
