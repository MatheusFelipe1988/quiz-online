package com.onlie.quiz.service;

import com.onlie.quiz.domain.Question;
import com.onlie.quiz.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestaoService {

    private final QuestionRepository repository;

    @Override
    public Question create(Question question) {
        return repository.save(question);
    }

    @Override
    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<String> getAllSubjects() {
        return repository.findDistinctSubject();
    }

    @Override
    public Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException {
         Optional<Question> theQuestion = this.getQuestionById(id);

         if (theQuestion.isPresent()){
             Question updatedQuestion = theQuestion.get();
             updatedQuestion.setQuestion(question.getQuestion());
             updatedQuestion.setChoices(question.getChoices());
             updatedQuestion.setCorrectAnswers(question.getCorrectAnswers());
             return repository.save(question);
         }else {
             throw new ChangeSetPersister.NotFoundException();
         }
    }

    @Override
    public void deleteQuestion(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Question> getQuestionForUser(Integer numOfQuestions, String subject) {
        Pageable pageable = PageRequest.of(0, numOfQuestions);
        return repository.findBySubject(subject, pageable).getContent();
    }

}
