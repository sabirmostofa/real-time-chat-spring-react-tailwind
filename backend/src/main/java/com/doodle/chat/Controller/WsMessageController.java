package com.doodle.chat.Controller;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.doodle.chat.Model.Message;
import com.doodle.chat.Service.MessageService;

@Controller
public class WsMessageController {

    private final MessageService messageService;

    public WsMessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/sendmessage")
    @SendTo("/topic/messages")
    public Message sendMessage(Message chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now());
        messageService.saveMessage(chatMessage);
        return chatMessage;

    }

    @MessageMapping("/senduser")
    @SendTo("/topic/Messages")
    public Message addUser(Message chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}
