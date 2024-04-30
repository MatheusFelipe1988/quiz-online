package com.onlie.quiz.controller;

import com.onlie.quiz.domain.Question;
import com.onlie.quiz.service.IQuestaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/quizzies")
@RequiredArgsConstructor
public class QuestionController {
    private final IQuestaoService questaoService;

    @PostMapping("create-new-question")
    public ResponseEntity<Question> createQuestao(@Valid @RequestBody Question question){
        Question createdQuestion = questaoService.create(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
    }

    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questions = questaoService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestao = questaoService.getQuestionById(id);
        if(theQuestao.isPresent()){
            return ResponseEntity.ok(theQuestao.get());
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PutMapping("/question/{id}/update")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question)
            throws ChangeSetPersister.NotFoundException {
        Question updatedQuestion = questaoService.updateQuestion(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion (@PathVariable Long id){
        questaoService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects() {
        List<String> subject = questaoService.getAllSubjects();
        return ResponseEntity.ok(subject);
    }
    @GetMapping("/quiz/fetch-question-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(@RequestParam Integer numberOfQuestions, @RequestParam
                                                              String subject){
        List<Question> allQuestions = questaoService.getAllQuestions();

        List<Question> mutableQuestions = new ArrayList<>(allQuestions);
        Collections.shuffle(mutableQuestions);

        int avaliableQuestions = Math.min(numberOfQuestions, mutableQuestions.size());
        List<Question> randomQuestions = mutableQuestions.subList(0, avaliableQuestions);
        return ResponseEntity.ok(randomQuestions);
    }
}
