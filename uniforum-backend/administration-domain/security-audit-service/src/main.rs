mod models;
mod repositories;
mod services;
mod controllers;
mod routes;

use actix_web::{App, HttpServer};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::env;
use routes::audit_routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("Falta DATABASE_URL");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("No se pudo conectar a la base de datos");

    let port = env::var("PORT").unwrap_or_else(|_| "8023".to_string());

    println!("🚀 Servidor activo en http://localhost:{}", port);

    HttpServer::new(move || {
        App::new()
            .app_data(actix_web::web::Data::new(pool.clone()))
            .configure(audit_routes)
    })
    .bind(("0.0.0.0", port.parse().unwrap()))?
    .run()
    .await
}
