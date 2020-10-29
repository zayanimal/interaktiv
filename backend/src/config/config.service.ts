import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}

    private getValue(key: string): string {
        const value = this.env[key];

        if (!value) {
            throw new Error(`Не удалось найти параметр ${key}`);
        }

        return value;
    }

    public isProduction() {
        return this.getValue('MODE') !== 'DEV';
    }

    public getPort(): number {
        return parseInt(this.getValue('PORT'));
    }

    public getJwtSecret(): string {
        return this.getValue('JWT_SECRET');
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
            entities: [],
            migrationsTableName: 'migration',
            migrations: ['src/migration/*.ts'],
            cli: { migrationsDir: 'src/migration' }
        }
    }
}

export const configService = new ConfigService(process.env);
