use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use crate::models::audit::NewAuditLog;
use crate::services::audit_service;

/// POST /audit
pub async fn log_event(
    pool: web::Data<PgPool>,
    data: web::Json<NewAuditLog>
) -> impl Responder {
    match audit_service::create_log(pool.get_ref(), data.into_inner()).await {
        Ok(_) => HttpResponse::Created().body("Evento registrado"),
        Err(_) => HttpResponse::InternalServerError().body("Error al registrar evento"),
    }
}

/// GET /audit
pub async fn get_events(pool: web::Data<PgPool>) -> impl Responder {
    match audit_service::list_logs(pool.get_ref()).await {
        Ok(logs) => HttpResponse::Ok().json(logs),
        Err(_) => HttpResponse::InternalServerError().body("Error al obtener eventos"),
    }
}
