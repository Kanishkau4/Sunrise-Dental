package com.sunrise.dentalclinic.exception;

/** Thrown when a lookup (e.g. search by appointment number) finds nothing. */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
