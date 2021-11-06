import * as fs from 'fs';
import { getTypeOrmConfig } from '../configs/typeorm.config';

const generate = async () => {
  const options = await getTypeOrmConfig({
    get(name: string) {
      return process.env[name];
    },
  });

  fs.writeFileSync('ormconfig.json', JSON.stringify(options, null, 2));
};

generate();
