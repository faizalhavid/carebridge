package com.carebridge.carebridge_api.customer.controllers;


import com.carebridge.carebridge_api.customer.services.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/${env.api.version}/customer")
@AllArgsConstructor
public class CustomerController {
    final private CustomerService customerService;
}
