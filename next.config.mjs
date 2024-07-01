// next.config.mjs
import { resolve } from 'path';

export default {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@'] = resolve('./');
    }
    return config;
  },
};
