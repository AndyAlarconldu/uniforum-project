use sqlx::PgPool;
use crate::models::config::{Config, NewConfig};
use uuid::Uuid;

pub async fn get_all(pool: &PgPool) -> Result<Vec<Config>, sqlx::Error> {
    sqlx::query_as::<_, Config>("SELECT * FROM system_config")
        .fetch_all(pool)
        .await
}

pub async fn insert(pool: &PgPool, data: NewConfig) -> Result<(), sqlx::Error> {
    let id = Uuid::new_v4();
    sqlx::query("INSERT INTO system_config (id_config, key, value) VALUES ($1, $2, $3)")
        .bind(id)
        .bind(data.key)
        .bind(data.value)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn update(pool: &PgPool, key: &str, value: &str) -> Result<u64, sqlx::Error> {
    let res = sqlx::query("UPDATE system_config SET value = $1, updated_at = now() WHERE key = $2")
        .bind(value)
        .bind(key)
        .execute(pool)
        .await?;
    Ok(res.rows_affected())
}
