import { Queue, ConnectionOptions } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const connectionOptions: ConnectionOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
};

const emailQueue = new Queue('emailQueue', { connection: connectionOptions });

export async function addToQueue() {
    const jobs = [
        { name: 'email to nishant', data: { email: 'nishant19072003@gmail.com', subject: 'Onboarding', body: 'Hello Nishant' } },
        { name: 'email to nishant', data: { email: 'nishant19072003@gmail.com', subject: 'Onboarding', body: 'Hello Nishant' } },
        { name: 'email to nishant', data: { email: 'nishant19072003@gmail.com', subject: 'Onboarding', body: 'Hello Nishant' } },
    ];

    try {
        await emailQueue.addBulk(jobs);
        console.log('Jobs added to queue');
    } catch (error) {
        console.error('Error adding jobs to queue', error);
    }
}
