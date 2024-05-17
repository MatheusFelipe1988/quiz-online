package com.onlie.quiz.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String question;

    @NotBlank
    private String questionType;

    @NotBlank
    private String subject;

    @ElementCollection
    private List<String> choices;

    @ElementCollection
    private List<String> correctAnswers;
}
