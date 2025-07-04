package com.uniforum.registro.model;

import jakarta.persistence.*;

@Entity
public class UniversityModerator {
    @Id
    private String idModerator;

    private String name;
    private String email;
    private String password;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

    // Getters y setters
}