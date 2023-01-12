
import { createClient} from 'redis';

const client = createClient(process.env.REDIS_URL);

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();