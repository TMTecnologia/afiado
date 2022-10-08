import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('PGHOST', 'localhost'),
      port: env.int('PGPORT', 5432),
      database: env('PGDATABASE', 'zebstrika'),
      user: env('PGUSER', 'postgres'),
      password: env('PGPASSWORD', 'postgres'),
      schema: env('PGSCHEMA', 'public'), // Not required
      ssl: {
        rejectUnauthorized: env.bool('PGSSL_SELF', false),
      },
    },
    debug: false,
  },
});
