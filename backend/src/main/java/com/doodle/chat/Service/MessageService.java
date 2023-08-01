package com.doodle.chat.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.doodle.chat.Model.Message;
import com.doodle.chat.Repository.MessageRepository;

@Component
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
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
        // return
        // messageRepository.findAll().stream().limit(limit).collect(Collectors.toList());
        // return messageRepository.findTopByOrderByIdDesc(
        // PageRequest.of(0, limit, Sort.by(Sort.Direction.ASC, "id")));

        List<Message> records = messageRepository.findLastNRecords(limit);
        Collections.reverse(records);
        return records;

    }

}
