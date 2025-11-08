package com.hackutd25.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MeetingResponse {
    
    @JsonProperty("meeting_details")
    private Object meetingDetails;
    
    @JsonProperty("transcript_data")
    private Object transcriptData;
    
    public MeetingResponse() {}
    
    public MeetingResponse(Object meetingDetails, Object transcriptData) {
        this.meetingDetails = meetingDetails;
        this.transcriptData = transcriptData;
    }
    
    public Object getMeetingDetails() {
        return meetingDetails;
    }
    
    public void setMeetingDetails(Object meetingDetails) {
        this.meetingDetails = meetingDetails;
    }
    
    public Object getTranscriptData() {
        return transcriptData;
    }
    
    public void setTranscriptData(Object transcriptData) {
        this.transcriptData = transcriptData;
    }
}