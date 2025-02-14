package com.carebridge.carebridge_api.customer.services;

import com.carebridge.carebridge_api.customer.dto.responses.CustomerBiodataResponse;
import com.carebridge.carebridge_api.customer.models.CustomerMember;
import com.carebridge.carebridge_api.customer.repositories.CustomerMemberRepository;
import com.carebridge.carebridge_api.customer.repositories.CustomerRelationRepository;
import com.carebridge.carebridge_api.customer.repositories.CustomerRepository;
import com.carebridge.carebridge_api.user.dto.projections.BiodataProjection;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.BiodataRepository;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomerService {

    final private ModelMapper modelMapper;
    final private CustomerRepository customerRepository;
    final private BiodataRepository biodataRepository;
    final private UserRepository userRepository;
    private final CustomerMemberRepository customerMemberRepository;


    public CustomerBiodataResponse getCustomerBiodata(Long customerId) {
        User user = userRepository.findById(customerId).orElseThrow(() -> new RuntimeException("User not found"));
        Biodata biodata = biodataRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("Biodata not found"));
        BiodataProjection biodataProjection = modelMapper.map(biodata, BiodataProjection.class);
        CustomerMember customerMember = customerMemberRepository.findById(customerId).orElseThrow(() -> new RuntimeException("CustomerMember not found"));
        return null;


    }

    public BiodataProjection updateCustomerBiodata(String customerEmail) {
        return null;
    }
}
