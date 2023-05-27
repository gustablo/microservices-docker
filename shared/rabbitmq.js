import amqp from 'amqplib';

const RETRY_TRESHHOLD = 1000;

let connection;

const connect = async () => {
    if (connection) return;

    return new Promise(async resolve => {
        try {
            connection = await amqp.connect('amqp://rabbitmq:5672');
            return resolve(connection);
        } catch(err) {
            setTimeout(async () => {
                const retry = await connect();

                if (retry) {
                    return resolve(retry);
                }
            }, RETRY_TRESHHOLD);
        }
    });
};

const bind = async (queue) => {
    await connect();
    
    const channel = await connection.createChannel();

    if (queue) {
        await channel.assertQueue(queue);
    }

    return channel;
};

const unbind = async (channel) => {
    await connect();

    return channel.close();
}

const send = async (queue, content) => {
    await connect();

    const channel = await connection.createChannel();

    return channel.sendToQueue(queue, Buffer.from(content));
}

export const useRabbitMQ = async () => {
    await connect();

    return { bind, unbind, send };
};
