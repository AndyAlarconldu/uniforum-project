use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use crate::models::config::NewConfig;
use crate::services::config_service;
use serde_json::json;

pub async fn get_configs(pool: web::Data<PgPool>) -> impl Responder {
    match config_service::get_all_configs(pool.get_ref()).await {
        Ok(cfgs) => HttpResponse::Ok().json(cfgs),
        Err(e) => {
            eprintln!("❌ Error al obtener configuraciones: {:?}", e);
            HttpResponse::InternalServerError().json(json!({
                "error": "Error al obtener configuraciones"
            }))
        }
    }
}

pub async fn post_config(
    pool: web::Data<PgPool>,
    data: web::Json<NewConfig>
) -> impl Responder {
    match config_service::create_config(pool.get_ref(), data.into_inner()).await {
        Ok(_) => HttpResponse::Created().body("Configuración creada"),
        Err(_) => HttpResponse::InternalServerError().body("Error al crear configuración"),
    }
}

pub async fn put_config(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    data: web::Json<NewConfig>
) -> impl Responder {
    match config_service::update_config(pool.get_ref(), &path, &data.value).await {
        Ok(rows) if rows > 0 => HttpResponse::Ok().body("Configuración actualizada"),
        Ok(_) => HttpResponse::NotFound().body("No se encontró la configuración"),
        Err(_) => HttpResponse::InternalServerError().body("Error al actualizar configuración"),
    }
}
