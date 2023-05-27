import axios from 'axios';

import { useRabbitMQ } from '../shared/rabbitmq.js';
import { CHANNELS } from '../shared/channels.js';

(async function main() {
    const { bind } = await useRabbitMQ();
    const queue = CHANNELS.CREATED_ORDER_REQUEST;

    const channel = await bind(queue); //queue argument is passed here to create if queue still not exists

    channel.consume(queue, msg => {
        if (msg !== null) {
            console.log('order received:', msg.content.toString());
            channel.ack(msg);

            axios.post('http://app:3000/orders/confirm', {}, { headers: { 'Content-Type': 'application/json' } })
                .then(undefined);
        }
    });
})();
