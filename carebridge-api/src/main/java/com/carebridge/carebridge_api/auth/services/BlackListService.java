package com.carebridge.carebridge_api.auth.services;

import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class BlackListService {
    private final RedisTemplate<String, Object> redisTemplate;
    private static final long BLACKLIST_TTL = 3600 * 1000;

    // blacklist token
    public void blacklistToken(String token) {
        redisTemplate.opsForValue().set(token, "", BLACKLIST_TTL);
    }
    public boolean isTokenBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(token));
    }

}
