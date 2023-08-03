package com.doodle.chat.Service;

import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Component;

import com.doodle.chat.Model.Message;
import com.doodle.chat.Repository.MessageRepository;

@Component
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository repo) {
        this.messageRepository = repo;
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);

    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public List<Message> getRecent20Messages(int limit) {

        List<Message> records = messageRepository.findFirst20ByOrderByIdDesc();
        Collections.reverse(records);
        return records;

    }

    /* return last limit messages */
    public List<Message> getRecentMessages(int limit) {
        List<Message> records = messageRepository.findLastNRecords(limit);
        Collections.reverse(records);
        return records;

    }

}
