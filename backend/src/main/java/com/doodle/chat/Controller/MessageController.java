package com.doodle.chat.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doodle.chat.Model.Message;
import com.doodle.chat.Service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/recent")
    public List<Message> getRecentMessages(@RequestParam(defaultValue = "10") Integer limit) {
        return messageService.getRecentMessages(limit);
    }

    @GetMapping("/recent20")
    public List<Message> getRecent20Messages(@RequestParam(defaultValue = "10") Integer limit) {
        return messageService.getRecent20Messages(limit);
    }
}
