use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::NaiveDateTime;

#[derive(Serialize, sqlx::FromRow)]
pub struct AuditLog {
    pub id_log: Uuid,
    pub event_type: String,
    pub username: String,
    pub description: String,
    pub ip_address: Option<String>,
    pub timestamp: NaiveDateTime,
}

#[derive(Deserialize)]
pub struct NewAuditLog {
    pub event_type: String,
    pub username: String,
    pub description: String,
    pub ip_address: Option<String>,
}
