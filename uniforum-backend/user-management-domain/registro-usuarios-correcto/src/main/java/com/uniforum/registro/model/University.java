package com.uniforum.registro.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class University {
    @Id
    private String idUniversity;

    private String name;
    private String city;
    private String type;

    @OneToMany(mappedBy = "university")
    @JsonIgnore
    private List<Student> students;

    @OneToMany(mappedBy = "university")
    @JsonIgnore
    private List<UniversityModerator> moderators;

    // Getters y setters

    public String getIdUniversity() {
        return idUniversity;
    }

    public void setIdUniversity(String idUniversity) {
        this.idUniversity = idUniversity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<UniversityModerator> getModerators() {

        return moderators;
    }

    public void setModerators(List<UniversityModerator> moderators) {
        this.moderators = moderators;
    }
}