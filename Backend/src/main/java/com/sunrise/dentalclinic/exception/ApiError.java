package com.sunrise.dentalclinic.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/** A consistent JSON shape for every error the API returns, so the frontend can handle all errors the same way. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiError {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private List<String> details;
}
