package com.carebridge.carebridge_api.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/${env.api.version}/auth")
public class AuthController {
}