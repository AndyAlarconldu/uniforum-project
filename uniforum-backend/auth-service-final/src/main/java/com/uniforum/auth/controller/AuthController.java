package com.uniforum.auth.controller;

import com.uniforum.auth.model.Student;
import com.uniforum.auth.repository.StudentRepository;
import com.uniforum.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Student student = studentRepository.findByEmail(email);
        if (student == null || !student.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(student);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
