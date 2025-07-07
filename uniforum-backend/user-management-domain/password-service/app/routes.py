from fastapi import APIRouter
from app.schemas import PasswordResetRequest
from app.rabbitmq import publish_notification

router = APIRouter()

@router.post("/recover")
def send_password_reset_email(request: PasswordResetRequest):
    # Simular token temporal
    reset_link = f"https://uniforum.edu/reset-password?email={request.email}"
    message = {
        "recipient": request.email,
        "subject": "Recuperación de contraseña - UniForum",
        "message": f"Haz clic en el siguiente enlace para restablecer tu contraseña: {reset_link}"
    }
    publish_notification(message)
    return {"message": "Correo de recuperación enviado"}
