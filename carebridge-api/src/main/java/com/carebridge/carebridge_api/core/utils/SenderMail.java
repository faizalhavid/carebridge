package com.carebridge.carebridge_api.core.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@AllArgsConstructor
public class SenderMail {
    private JavaMailSenderImpl mailSender;

    public void sendMail(String email, Map<String, String> mailContext) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("CareBridge@gmail.com", "CareBridge Customer Service");
        String username = email.toLowerCase().split("@")[0];
        helper.setTo(email);

        helper.setSubject(mailContext.get("subject"));
        String content = new String(
                Files.readAllBytes(Paths.get("src/main/resources/templates/email_template.html")));
        content = content.replace("{username}", username);
        content = content.replace("{title}", mailContext.get("subject"));
        content = content.replace("{message}", mailContext.get("message"));
        content = content.replace("{additional_comment}", mailContext.get("additional_comment"));
        helper.setText(content, true);

        mailSender.send(message);
    }
}