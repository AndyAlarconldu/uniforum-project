import pika
import json
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crud import create_notification
from app.schemas import NotificationCreate
from app.email_sender import send_email

def callback(ch, method, properties, body):
    try:
        data = json.loads(body)
        payload = NotificationCreate(**data)
        db: Session = SessionLocal()
        create_notification(db, payload)
        db.close()

        send_email(payload.recipient, payload.subject, payload.message)

        print(f"Notificación procesada y enviada: {payload.subject}")
    except Exception as e:
        print(f"Error procesando mensaje: {e}")

def start_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
    channel = connection.channel()
    channel.queue_declare(queue="notifications")

    channel.basic_consume(queue="notifications", on_message_callback=callback, auto_ack=True)
    print("Esperando mensajes en la cola 'notifications'...")
    channel.start_consuming()
