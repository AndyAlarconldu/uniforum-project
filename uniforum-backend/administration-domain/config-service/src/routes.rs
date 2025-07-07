use actix_web::web;
use crate::controllers::config_controller::*;

pub fn config_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/config")
            .route("", web::get().to(get_configs))
            .route("", web::post().to(post_config))
            .route("/{key}", web::put().to(put_config))
    );
}
