use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::NaiveDateTime;

#[derive(Serialize, sqlx::FromRow)]
pub struct Config {
    pub id_config: Uuid,
    pub key: String,
    pub value: String,
    pub updated_at: NaiveDateTime,
}

#[derive(Deserialize)]
pub struct NewConfig {
    pub key: String,
    pub value: String,
}
