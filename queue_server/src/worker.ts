import { Worker, ConnectionOptions } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const connectionOptions: ConnectionOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
};

export function startWorker() {
  const sendEmail = () =>
    new Promise<void>((resolve) => setTimeout(resolve, 5 * 1000));

  const worker = new Worker(
    "emailQueue",
    async (job) => {
      try {
        console.log(`Message received job id = ${job.id}`);
        console.log("Processing message");
        console.log(`Sending email to ${job.data.email}`);

        await sendEmail();

        console.log("Email sent");
      } catch (error) {
        console.error("Error processing job", error);
      }
    },
    { connection: connectionOptions }
  );

  worker.on("completed", (job) => {
    console.log(`Job with id ${job.id} has been completed`);
  });

  worker.on("failed", (job: any, err) => {
    console.error(`Job with id ${job.id} has failed with error ${err.message}`);
  });
}
