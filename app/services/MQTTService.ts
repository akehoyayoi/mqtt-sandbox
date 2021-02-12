import * as dotenv from 'dotenv';
import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';

// TODO: implement adhoc cases reponse
export interface IResult {
    status: string;
}
type Callback = (topic: string, message: string) => void;

export class MQTTService {
    
    private static instance: MQTTService;
    private callbacks: Map<string, Callback>;
    client: MqttClient;
    private constructor() {
        dotenv.config({ path: __dirname+'/../../.env' });
        // TODO: error handling
        this.client = mqtt.connect(process.env.MQTT_SERVER_HOST, {
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD
        });
        this.callbacks = new Map<string, Callback>();
        this.client.on('message', (topic, message) => {
            this.callbacks.forEach((value: Callback, key: string) => {
                value(topic, message.toString());
            });
        });
    }

    static getInstance() {
        if (!MQTTService.instance) {
            MQTTService.instance = new MQTTService();
        }
        return MQTTService.instance;
    }

    public async addCallback(
        key: string, 
        callback: Callback
    ): Promise<IResult> {
        this.callbacks.set(key, callback);
        return {
            status: 'OK'
        }
    }

    public async deleteCallback(
        key: string
    ) {
        this.callbacks.delete(key);
        return {
            status: 'OK'
        }
    } 

    public async subscribe(
        topic: string
    ): Promise<IResult> {
        this.client.subscribe(topic, (error, granted) => {
            console.log('subscriber.subscribed: ' + topic);
        });
        return {
            status: 'OK'
        }
    }

    public async publish(
        topic: string,
        message: string): Promise<IResult> {
        this.client.publish(topic, message);
        return {
            status: 'OK'
        } 
    }
}
