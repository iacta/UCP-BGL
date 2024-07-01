 
import { resolve } from 'path';

export function webpack(config) {
    config.resolve.alias['@'] = resolve('./');
    return config;
}