import app from '@/app';
import { properties } from '@/properties';
import logger from '@/shared/logger.service';

const { port } = properties.server;

export default app.listen(port, () => logger.info('Express server listening on port ', port));
