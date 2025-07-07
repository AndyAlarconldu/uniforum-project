use sqlx::PgPool;
use uuid::Uuid;
use crate::models::audit::{AuditLog, NewAuditLog};

pub async fn insert_log(pool: &PgPool, log: NewAuditLog) -> Result<(), sqlx::Error> {
    let id = Uuid::new_v4();
    sqlx::query("INSERT INTO audit_log (id_log, event_type, username, description, ip_address) VALUES ($1, $2, $3, $4, $5)")
        .bind(id)
        .bind(log.event_type)
        .bind(log.username)
        .bind(log.description)
        .bind(log.ip_address)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_logs(pool: &PgPool) -> Result<Vec<AuditLog>, sqlx::Error> {
    sqlx::query_as::<_, AuditLog>("SELECT * FROM audit_log ORDER BY timestamp DESC")
        .fetch_all(pool)
        .await
}
