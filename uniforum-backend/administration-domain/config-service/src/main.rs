mod models;
mod repositories;
mod services;
mod controllers;
mod routes;

use actix_web::{App, HttpServer, web};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions; // ← esto es importante
use std::env;
use routes::config_routes;
use actix_cors::Cors;
use actix_web::http::header;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("Falta DATABASE_URL");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("No se conectó a la base de datos");

    let port = env::var("PORT").unwrap_or_else(|_| "8022".to_string());

    println!("🚀 Servidor activo en http://localhost:{}", port);

    HttpServer::new(move || {
         let cors = Cors::default()
        .allow_any_origin() // ⚠️ o usa .allowed_origin("http://localhost:5173") si prefieres limitarlo
        .allowed_methods(vec!["GET", "POST", "PUT"])
        .allowed_headers(vec![header::CONTENT_TYPE])
        .max_age(3600);

        App::new()
        .wrap(cors)
        .app_data(web::Data::new(pool.clone()))
        .configure(config_routes)
    })
    .bind(("0.0.0.0", port.parse().unwrap()))?
    .run()
    .await
}
