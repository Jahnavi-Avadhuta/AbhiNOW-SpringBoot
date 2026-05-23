package com.abhinow.abhinow.controller;

import com.abhinow.abhinow.dto.request.LocationUpdateRequest;
import com.abhinow.abhinow.dto.response.LocationUpdateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@RequiredArgsConstructor
public class LocationWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    // Driver sends location update
    // Client sends to: /app/location.update
    // Server broadcasts to: /topic/ride/{rideId}
    @MessageMapping("/location.update")
    public void updateLocation(
            LocationUpdateRequest request) {

        LocationUpdateResponse response =
            LocationUpdateResponse.builder()
                .rideId(request.getRideId())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .driverName(request.getDriverName())
                .timestamp(LocalDateTime.now().format(
                    DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .build();

        // Broadcast to all subscribers of this ride
        messagingTemplate.convertAndSend(
            "/topic/ride/" + request.getRideId(), response);
    }
}