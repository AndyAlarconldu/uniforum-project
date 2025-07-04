package com.uniforum.registro.controller;

import com.uniforum.registro.model.Student;
import com.uniforum.registro.model.University;
import com.uniforum.registro.repository.StudentRepository;
import com.uniforum.registro.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UniversityRepository universityRepository;

    @PostMapping
    public Student create(@RequestBody Student student) {
        // Obtener el ID de universidad desde el JSON
        String universityId = student.getUniversity().getIdUniversity();

        // Buscar la universidad en la base de datos
        University university = universityRepository.findById(universityId)
                .orElseThrow(() -> new RuntimeException("Universidad no encontrada con id: " + universityId));

        // Asignar la universidad real al estudiante
        student.setUniversity(university);
        student.setRegistrationDate(LocalDateTime.now());

        return studentRepository.save(student);
    }

    @GetMapping
    public List<Student> getAll() {
        return studentRepository.findAll();
    }
}
