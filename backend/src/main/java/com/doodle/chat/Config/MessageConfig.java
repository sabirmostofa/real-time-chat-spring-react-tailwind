package com.doodle.chat.Config;

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
     * Setting dummy data
     */
    @Bean
    CommandLineRunner commandLineRunner(MessageRepository repo) {
        return args -> {
            Message msgSabir = new Message("Hello from Sabir", "Sabir", "1690975306894", LocalDateTime.now());
            Message msgDoodle = new Message("Hello from Doodle", "DoodleTest", "1690975306812", LocalDateTime.now());
            Message msgRandom = new Message("When I consider how my light is spent,", "Random1", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom1 = new Message("Ere half my days, in this dark world and wide,", "Random2",
                    "1690975306894", LocalDateTime.now());
            Message msgRandom2 = new Message("And that one Talent which is death to hide", "Random3", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom3 = new Message("Lodged with me useless, though my Soul more bent", "Random4",
                    "1690975306894", LocalDateTime.now());
            Message msgRandom4 = new Message("To serve therewith my Maker, and present", "Random5", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom5 = new Message("My true account, lest he returning chide;", "Random6", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom6 = new Message("Doth God exact day-labour, light denied?", "Random7", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom7 = new Message("I fondly ask. But patience, to prevent", "Random8", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom8 = new Message("That murmur, soon replies, “God doth not need", "Random9",
                    "1690975306894", LocalDateTime.now());
            Message msgRandom9 = new Message("Either man's work or his own gifts; who best", "Random10",
                    "1690975306894", LocalDateTime.now());
            Message msgRandom10 = new Message("Bear his mild yoke, they serve him best. His state", "Random11",
                    "1690975306894", LocalDateTime.now());
            Message msgRandom11 = new Message("Is Kingly. Thousands at his bidding speed", "Random12", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom12 = new Message("And post o'er Land and Ocean without rest:", "Random13", "1690975306894",
                    LocalDateTime.now());
            Message msgRandom13 = new Message("They also serve who only stand and wait.:", "Random114", "1690975306894",
                    LocalDateTime.now());
            repo.saveAll(List.of(msgSabir, msgDoodle, msgRandom, msgRandom1, msgRandom2, msgRandom3, msgRandom4,
                    msgRandom5, msgRandom6, msgRandom7, msgRandom8, msgRandom9, msgRandom10, msgRandom11, msgRandom12,
                    msgRandom13));
        };
    }

}
