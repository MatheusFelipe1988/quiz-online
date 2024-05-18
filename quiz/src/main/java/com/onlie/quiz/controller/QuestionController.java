package com.onlie.quiz.controller;

import com.onlie.quiz.domain.Question;
import com.onlie.quiz.service.IQuestaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuestionController {
    private final IQuestaoService questaoService;


    @Operation(summary = "Criando nova quiz", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = " um novo quiz criado for OK"),
            @ApiResponse(responseCode = "500", description = "Erro na criação do quiz")
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/create-new-question")
    public ResponseEntity<Question> createQuestao(@Valid @RequestBody Question question){
        Question createdQuestion = questaoService.create(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
    }

    @Operation(summary = "buscando todos os questionarios", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "listando todos o questionario for OK"),
            @ApiResponse(responseCode = "500", description = "quando der erro na hora de listar os questionarios")
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questions = questaoService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @Operation(summary = "buscando um quiz", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca por ID for OK"),
            @ApiResponse(responseCode = "500", description = "erro causado por errar o ID")
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestao = questaoService.getQuestionById(id);
        if(theQuestao.isPresent()){
            return ResponseEntity.ok(theQuestao.get());
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @Operation(summary = "atualizando um questionario", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "a atualização for bem sucedida"),
            @ApiResponse(responseCode = "500", description = "erro na hora de atualizar um quiz")
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/question/{id}/update")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question)
            throws ChangeSetPersister.NotFoundException {
        Question updatedQuestion = questaoService.updateQuestion(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @Operation(summary = "deletando um questionarior", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "a remoção for OK"),
            @ApiResponse(responseCode = "500", description = "Erro ao escolher o quiz")
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion (@PathVariable Long id){
        questaoService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }


    @Operation(summary = "listando todas as escolhasr", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "listagem das escolhas for OK"),
            @ApiResponse(responseCode = "500", description = "falha ao listar escolhas")
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects() {
        List<String> subject = questaoService.getAllSubjects();
        return ResponseEntity.ok(subject);
    }

    @Operation(summary = "listando quiz do usuario", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "listagem for bem sucedida"),
            @ApiResponse(responseCode = "500", description = "erro ao buscar o integer")
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/quiz/fetch-question-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(@RequestParam Integer numberOfQuestions, @RequestParam
                                                              String subject){
        List<Question> allQuestions = questaoService.getQuestionForUser(numberOfQuestions, subject);

        List<Question> mutableQuestions = new ArrayList<>(allQuestions);
        Collections.shuffle(mutableQuestions);

        int avaliableQuestions = Math.min(numberOfQuestions, mutableQuestions.size());
        List<Question> randomQuestions = mutableQuestions.subList(0, avaliableQuestions);
        return ResponseEntity.ok(randomQuestions);
    }
}
