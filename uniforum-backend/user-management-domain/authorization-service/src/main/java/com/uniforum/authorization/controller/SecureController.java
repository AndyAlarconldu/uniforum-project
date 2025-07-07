package com.uniforum.authorization.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecureController {

    @GetMapping("/secure/student")
    public String studentAccess() {
        return "Access granted: STUDENT";
    }

    @GetMapping("/secure/moderator")
    public String moderatorAccess() {
        return "Access granted: MODERATOR";
    }

    @GetMapping("/secure/admin")
    public String adminAccess() {
        return "Access granted: ADMIN";
    }
}
