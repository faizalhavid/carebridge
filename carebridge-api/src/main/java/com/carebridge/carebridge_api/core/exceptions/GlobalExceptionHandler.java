package com.carebridge.carebridge_api.core.exceptions;


import com.carebridge.carebridge_api.core.responses.ErrorDetails;
import com.carebridge.carebridge_api.core.responses.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import jakarta.validation.ConstraintViolation;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse<?>> handleConstraintViolationException(ConstraintViolationException e) {
        List<ErrorDetails> errors = new ArrayList<>();

        for (ConstraintViolation<?> violation : e.getConstraintViolations()) {
            errors.add(new ErrorDetails(violation.getPropertyPath().toString(), violation.getMessage()));
        }

        log.error("An error occured: {}", e.getMessage(), e);

        ErrorResponse<List<Map<String, String>>> response = new ErrorResponse<>(
                "fail",
                "Validation failed",
                errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse<?>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        List<ErrorDetails> errors = new ArrayList<>();
        e.getBindingResult().getFieldErrors().forEach(error -> {
            errors.add(new ErrorDetails(error.getField(), error.getDefaultMessage()));
        });

        log.error("An error occured: {}", e.getMessage(), e);

        ErrorResponse<List<Map<String, String>>> response = new ErrorResponse<>(
                "fail",
                "Validation failed for arguments", errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse<String>> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e) {
        log.error("An error occured: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("request", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "Malformed request body", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(org.springframework.security.authentication.LockedException.class)
    public ResponseEntity<ErrorResponse<String>> handleLockedException(org.springframework.security.authentication.LockedException e) {
        log.error("An error occurred: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("lock", e.getMessage()));
        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "User account is locked", errors);

        return new ResponseEntity<>(response, HttpStatus.LOCKED);
    }


    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse<String>> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e) {
        log.error("An error occured: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("request", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Missing request parameter", errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse<String>> handleHttpMediaTypeNotSupportedException(
            HttpMediaTypeNotSupportedException e) {
        log.error("An error occured: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("mediaType", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Unsupported media type", errors);

        return new ResponseEntity<>(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(HttpMediaTypeNotAcceptableException.class)
    public ResponseEntity<ErrorResponse<String>> handleHttpMediaTypeNotAcceptableException(
            HttpMediaTypeNotAcceptableException e) {
        String errorMessage = "The requested media type is not acceptable. Supported media types are: "
                + e.getSupportedMediaTypes();
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("mediaType", errorMessage));

        log.error("An error occured: {}", errorMessage, e);

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Media type not acceptable", errors);

        return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse<?>> handleHandlerMethodValidationException(
            HandlerMethodValidationException e) {
        List<ErrorDetails> errors = new ArrayList<>();
        e.getValueResults().forEach(validationResult -> {
            System.out.println(validationResult.getResolvableErrors());
            errors.add(new ErrorDetails("validation", validationResult.getResolvableErrors().toString()));
        });

        ErrorResponse<List<Map<String, String>>> response = new ErrorResponse<>(
                "fail",
                "Validation failed", errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

   /* @ExceptionHandler(CoreRoleValidationException.class)
    public ResponseEntity<ErrorResponse<?>> handleCoreRoleValidationException(CoreRoleValidationException e) {
        log.error("An error occured: {}", e.getMessage(), e);

        ErrorResponse<List<Map<String, String>>> response = new ErrorResponse<>(
                "fail",
                "Validation failed",
                Collections.singletonList(
                        Map.of("message", e.getMessage(),
                                "field", e.getField())
                ));

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }*/

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse<String>> handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException e) {
        List<ErrorDetails> errors = new ArrayList<>();
        String errorMessage = "Parameter "
                + e.getName()
                + " should be of type ";
        Class<?> requiredTypeArgument = e.getRequiredType();
        errorMessage += (requiredTypeArgument != null)
                ? requiredTypeArgument.getSimpleName()
                : "unknown";
        errors.add(new ErrorDetails("argument", errorMessage));

        log.error("An error occured: {}", errorMessage, e);

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Invalid parameter type", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse<String>> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {
        String errorMessage = "Request method " + e.getMethod() + " is not supported for this route";
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("method", errorMessage));

        log.error("An error occured: {}", errorMessage, e);

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Method not supported", errors);

        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse<String>> handleNoHandlerFoundException(NoHandlerFoundException e) {
        List<ErrorDetails> errors = new ArrayList<>();
        String errorMessage = "No resource found for "
                + e.getHttpMethod()
                + " "
                + e.getRequestURL();
        errors.add(new ErrorDetails("resource", errorMessage));

        log.error("An error occured: {}", errorMessage, e);

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Not found", errors);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse<String>> handleDataIntegrityViolationException(
            DataIntegrityViolationException e) {
        String errorMessage = "Data conflict: " + e.getMostSpecificCause().getMessage();
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("data", errorMessage));

        log.error("An error occured: {}", errorMessage, e);
        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Data conflict", errors);

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse<String>> handleUsernameNotFoundException(UsernameNotFoundException e) {
        log.error("An error occured: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("username", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "User not found", errors);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse<String>> handleResourceNotFoundException(ResourceNotFoundException e) {
        log.error("An error occured: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("resource", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Resource not found", errors);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse<String>> handleBadRequestException(BadRequestException e) {
        log.error("An error occurred: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails(e.getField(), e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "Bad request", errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse<String>> handleAccessDeniedException(AccessDeniedException e) {
        List<ErrorDetails> errors = new ArrayList<>();
        log.error("An error occured: {}", e.getMessage(), e);
        errors.add(new ErrorDetails("access", e.getMessage()));
        ErrorResponse<String> response = new ErrorResponse<String>(
                "fail",
                "Access denied", errors);
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    // Global Error Handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse<String>> handleUncaughtExceptions(Exception e) {
        log.error("An error occured: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("error", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<String>(
                "error",
                "Server error", errors);

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse<String>> handleExpiredJwtException(ExpiredJwtException e) {
        log.error("An error occurred: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("token", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "Token has expired",
                errors);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ErrorResponse<String>> handleMalformedJwtException(MalformedJwtException e) {
        List<ErrorDetails> errors = new ArrayList<>();
        log.error("An error occurred: {}", e.getMessage(), e);
        errors.add(new ErrorDetails("token", e.getMessage()));
        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "Invalid token",
                errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ErrorResponse<String>> handleSignatureException(io.jsonwebtoken.security.SignatureException e) {
        List<ErrorDetails> errors = new ArrayList<>();
        log.error("An error occurred: {}", e.getMessage(), e);
        errors.add(new ErrorDetails("signature", e.getMessage()));
        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "Invalid token signature",
                errors);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UnsupportedJwtException.class)
    public ResponseEntity<ErrorResponse<String>> handleUnsupportedJwtException(UnsupportedJwtException e) {
        log.error("An error occurred: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("token", e.getMessage()));
        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "Unsupported token",
                errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse<String>> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("An error occurred: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("argument", e.getMessage()));
        ErrorResponse<String> response = new ErrorResponse<>(
                "fail",
                "Token is null or empty",
                errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    //    ResponseStatusException
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse<String>> handleApiException(ResponseStatusException e) {
        log.error("An error occurred: {}", e.getMessage(), e);
        List<ErrorDetails> errors = new ArrayList<>();
        errors.add(new ErrorDetails("response", e.getMessage()));

        ErrorResponse<String> response = new ErrorResponse<>(
                e.getStatusCode().value() < 500 ? "fail" : "error",
                e.getReason() != null ? e.getReason() : "Unexpected error", errors);

        return new ResponseEntity<>(response, e.getStatusCode());
    }
}
