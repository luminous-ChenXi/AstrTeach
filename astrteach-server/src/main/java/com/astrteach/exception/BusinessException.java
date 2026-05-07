package com.astrteach.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final int code;

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }

    public static BusinessException unauthorized(String message) {
        return new BusinessException(2002, message);
    }

    public static BusinessException forbidden(String message) {
        return new BusinessException(2004, message);
    }

    public static BusinessException notFound(String message) {
        return new BusinessException(1004, message);
    }

    public static BusinessException badRequest(String message) {
        return new BusinessException(1001, message);
    }

    public static BusinessException tooManyRequests(String message) {
        return new BusinessException(1009, message);
    }
}
