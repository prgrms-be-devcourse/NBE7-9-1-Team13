package com.backend.global.rsData;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RsData<T> {

    private String resultCode;
    private String msg;
    private T data;

    public RsData(String resultCode, String msg) {
        this(resultCode, msg, null);
    }

    public static <T> RsData<T> success(String msg, T data) {
        return new RsData<>("200-1", msg, data);
    }

    public static RsData<Void> success(String msg) {
        return new RsData<>("200-1", msg, null);
    }

}