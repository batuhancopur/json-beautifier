package org.cprdev;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.ApplicationContext;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class BeautifyController {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ApplicationContext applicationContext;

    @PostMapping("/api/beautify")
    public ResponseEntity<Map<String, String>> beautifyJson(@RequestBody String input) {
        try {
            JsonNode jsonNode = objectMapper.readTree(input);
            String beautified = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonNode);
            return ResponseEntity.ok(Map.of("beautifiedJson", beautified));
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Geçersiz JSON: " + e.getMessage()));
        }
    }

    @PostMapping("/api/shutdown")
    public ResponseEntity<Map<String, String>> shutdown() {
        // Start shutdown in a separate thread to avoid blocking the response
        new Thread(() -> {
            try {
                Thread.sleep(1000); // Give time for response to be sent
                System.exit(0);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
        
        return ResponseEntity.ok(Map.of("message", "Shutdown initiated"));
    }
} 