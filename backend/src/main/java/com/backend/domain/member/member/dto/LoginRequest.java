package com.backend.domain.member.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank
        @Size(min =2, max = 100)
        String email,

        @NotBlank
        @Size(min = 2, max = 255)
        String password) {
}