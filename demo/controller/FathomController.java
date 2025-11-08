package com.hackutd25.demo.controller;

import com.hackutd25.demo.model.MeetingResponse;
import com.hackutd25.demo.service.FathomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fathom")
public class FathomController {
    
    @Autowired
    private FathomService fathomService;
    
    @GetMapping("/latest-meeting")
    public ResponseEntity<MeetingResponse> getLatestMeeting() {
        try {
            MeetingResponse response = fathomService.getLatestMeeting();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}