import * as dotenv from 'dotenv';
import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';

// TODO: implement adhoc cases reponse
export interface ITest {
    test: string;
}

export class MQTTService {
    private static instance: MQTTService;
    client: MqttClient;
    private constructor() {
        dotenv.config({ path: __dirname+'/../../.env' });
        // TODO: error handling
        this.client = mqtt.connect(process.env.MQTT_SERVER_HOST, {
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD
        });
    }

    static getInstance() {
        if (!MQTTService.instance) {
            MQTTService.instance = new MQTTService();
        }
        return MQTTService.instance;
    }

    public async publish(
        topic: string,
        message: string): Promise<ITest> {
        this.client.publish(topic, message);
        return {
            test: 'test1'
        } 
    }
}
