use actix_web::web;
use crate::controllers::audit_controller::*;

pub fn audit_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/audit")
            .route("", web::get().to(get_events))
            .route("", web::post().to(log_event))
    );
}
