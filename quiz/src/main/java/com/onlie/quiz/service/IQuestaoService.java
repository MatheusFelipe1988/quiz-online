package com.onlie.quiz.service;

import com.onlie.quiz.domain.Question;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface IQuestaoService {

    Question create (Question question);

    List<Question> getAllQuestions();

    Optional<Question> getQuestionById(Long id);

    List<String> getAllSubjects();

    Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException;

    void deleteQuestion(Long id);

    List<Question> getQuestionForUser(Integer numOfQuestions,String subject);
}
