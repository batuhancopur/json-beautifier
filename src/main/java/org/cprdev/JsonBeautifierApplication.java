package org.cprdev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.awt.Desktop;
import java.net.URI;

@SpringBootApplication
public class JsonBeautifierApplication {

    public static void main(String[] args) {
        SpringApplication.run(JsonBeautifierApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void openBrowser() {
        try {
            // Wait a moment for the server to start
            Thread.sleep(1000);
            
            // Open the default browser
            if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                Desktop.getDesktop().browse(new URI("http://localhost:2025"));
                System.out.println("🌐 JSON Beautifier opened in your browser!");
            }
        } catch (Exception e) {
            System.out.println("⚠️  Could not open browser automatically. Please open http://localhost:2025 manually.");
        }
    }
} 