use sqlx::PgPool;
use crate::models::config::{Config, NewConfig};
use crate::repositories::config_repository;

pub async fn get_all_configs(pool: &PgPool) -> Result<Vec<Config>, sqlx::Error> {
    config_repository::get_all(pool).await
}

pub async fn create_config(pool: &PgPool, data: NewConfig) -> Result<(), sqlx::Error> {
    config_repository::insert(pool, data).await
}

pub async fn update_config(pool: &PgPool, key: &str, value: &str) -> Result<u64, sqlx::Error> {
    config_repository::update(pool, key, value).await
}
