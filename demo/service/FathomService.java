package com.hackutd25.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackutd25.demo.model.MeetingResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Service
public class FathomService {
    
    @Value("${fathom.api.key}")
    private String apiKey;
    
    @Value("${fathom.api.base-url}")
    private String baseUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public MeetingResponse getLatestMeeting() {
        try {
            // Step 1: Get the latest meeting
            String meetingsUrl = baseUrl + "/meetings?limit=1";
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<String> meetingsResponse = restTemplate.exchange(
                meetingsUrl,
                HttpMethod.GET,
                entity,
                String.class
            );
            
            JsonNode meetingsJson = objectMapper.readTree(meetingsResponse.getBody());
            JsonNode items = meetingsJson.get("items");
            
            if (items == null || items.isEmpty()) {
                throw new RuntimeException("No meetings found");
            }
            
            JsonNode latestMeeting = items.get(0);
            String recordingId = latestMeeting.get("recording_id").asText();
            
            // Step 2: Get the transcript
            String transcriptUrl = baseUrl + "/recordings/" + recordingId + "/transcript";
            ResponseEntity<String> transcriptResponse = restTemplate.exchange(
                transcriptUrl,
                HttpMethod.GET,
                entity,
                String.class
            );
            
            JsonNode transcriptJson = objectMapper.readTree(transcriptResponse.getBody());
            
            // Step 3: Combine and return
            return new MeetingResponse(latestMeeting, transcriptJson);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch meeting data: " + e.getMessage(), e);
        }
    }
    
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", apiKey);
        headers.set("Content-Type", "application/json");
        return headers;
    }
}