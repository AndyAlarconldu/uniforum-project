use sqlx::PgPool;
use crate::models::audit::{AuditLog, NewAuditLog};
use crate::repositories::audit_repository;

pub async fn create_log(pool: &PgPool, data: NewAuditLog) -> Result<(), sqlx::Error> {
    audit_repository::insert_log(pool, data).await
}

pub async fn list_logs(pool: &PgPool) -> Result<Vec<AuditLog>, sqlx::Error> {
    audit_repository::get_logs(pool).await
}
