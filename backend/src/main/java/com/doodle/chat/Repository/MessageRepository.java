package com.doodle.chat.Repository;

import com.doodle.chat.Model.Message;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findTopByOrderByIdDesc(Pageable pageable);

    List<Message> findFirst20ByOrderByIdDesc();

    @Query(value = "SELECT * FROM message e ORDER BY e.id DESC LIMIT ?1", nativeQuery = true)
    List<Message> findLastNRecords(int n);

}
