package com.doodle.chat.Config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.doodle.chat.Model.Message;
import com.doodle.chat.Repository.MessageRepository;

@Configuration
public class MessageConfig {

    /**
     * 
     * @param repo
     * @return
     * 
     *         Setting dummy data
     */
    @Bean
    CommandLineRunner commandLineRunner(MessageRepository repo) {
        return args -> {
            Message msgSabir = new Message("Hello from Sabir", "Sabir", LocalDateTime.now());
            Message msgDoodle = new Message("Hello from Doodle", "DoodleTest", LocalDateTime.now());
            Message msgRandom = new Message("Hello from Random", "Random", LocalDateTime.now());
            repo.saveAll(List.of(msgSabir, msgDoodle, msgRandom));
        };
    }

}
