package com.uniforum.registro.repository;

import com.uniforum.registro.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {}