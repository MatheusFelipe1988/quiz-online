package com.onlie.quiz.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Table(name = "Question")
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String questao;

    @NotBlank
    private String questionType;

    @NotBlank
    private String subject;

    @NotBlank
    @ElementCollection
    private List<String> choices;

    @NotBlank
    @ElementCollection
    private List<String> correctAnswers;
}
