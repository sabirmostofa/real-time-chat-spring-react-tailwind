package com.doodle.chat.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String message;

    @NonNull
    private String sender;
    @NonNull
    private String senderId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd LLL yyyy HH:mm:ss")
    private LocalDateTime timestamp;

    public Message(String message, String sender, String senderId, LocalDateTime timestamp) {
        this.message = message;
        this.sender = sender;
        this.senderId = sender;
        this.timestamp = timestamp;
    }
}
