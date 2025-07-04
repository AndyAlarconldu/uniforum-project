import pika
import json
import os
from dotenv import load_dotenv

load_dotenv()

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")

def publish_notification(message: dict):
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
        channel = connection.channel()
        channel.queue_declare(queue="notifications")
        channel.basic_publish(
            exchange="",
            routing_key="notifications",
            body=json.dumps(message)
        )
        connection.close()
        print(f"Mensaje publicado a la cola de notificaciones: {message['subject']}")
    except Exception as e:
        print(f"Error publicando mensaje: {e}")
