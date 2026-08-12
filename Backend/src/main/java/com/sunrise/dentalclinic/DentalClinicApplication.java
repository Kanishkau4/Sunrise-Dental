package com.sunrise.dentalclinic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point of the whole backend.
 *
 * @SpringBootApplication is actually three annotations combined:
 *  - @Configuration   : this class can define Spring beans
 *  - @EnableAutoConfiguration : Spring Boot guesses sensible defaults based on what's
 *                        on the classpath (e.g. it sees spring-boot-starter-web and
 *                        automatically configures an embedded Tomcat web server)
 *  - @ComponentScan   : Spring scans this package and all sub-packages for classes
 *                        annotated with @Component, @Service, @Repository, @RestController
 *                        etc, and creates/manages instances of them automatically.
 *                        This automatic instance-management is called "Dependency
 *                        Injection" - you'll want to explain this in your report as it
 *                        underpins the whole design.
 */
@SpringBootApplication
public class DentalClinicApplication {

    public static void main(String[] args) {
        SpringApplication.run(DentalClinicApplication.class, args);
    }
}
