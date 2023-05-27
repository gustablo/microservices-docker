import express from 'express';

import { useRabbitMQ } from '../shared/rabbitmq.js';
import { CHANNELS } from '../shared/channels.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async function() {
    const { send, bind } = await useRabbitMQ();
    
    app.post('/orders/request', async (_req, res) => {
        const queue = CHANNELS.CREATED_ORDER_REQUEST;
    
        await bind(queue);
    
        await send(queue, JSON.stringify({ name: 'pasta', price: '39.90', customer: 'Robert' })); 
    
        return res.status(200).send('order request sent');
    });

    app.post('/orders/confirm', (_req, res) => {
        console.log('order confirmed by webhook');
        return res.status(200).end();
    });
    
    app.listen(3000);
})();
