package com.backend.global.exception;

public class ServiceException extends RuntimeException{

    private String resultCode;
    private String msg;

    public ServiceException(String resultCode, String msg) {
        super("%s : %s".formatted(resultCode, msg));
        this.resultCode = resultCode;
        this.msg = msg;
    }

    public String getResultCode() {
        return resultCode;
    }

    public String getMsg() {
        return msg;
    }


}
