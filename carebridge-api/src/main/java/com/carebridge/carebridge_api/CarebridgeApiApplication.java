package com.carebridge.carebridge_api;

import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CarebridgeApiApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(CarebridgeApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		updateUserPassword("nurfaizal966@gmail.com", "Barakadut123@");
	}

	public void updateUserPassword(String email, String newPassword) {
		User user = userRepository.findByEmailAndIsDeletedFalse(email)
				.orElseThrow(() -> new RuntimeException("User not found"));
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
	}
}
