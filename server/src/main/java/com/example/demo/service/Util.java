package com.example.demo.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class Util {
	private static MessageDigest digest;

	static {
		try {
			digest = MessageDigest.getInstance("SHA-256");	
		} catch (Exception e) {
		}
	}

	public static byte[] encrypt(String s) {
		return digest.digest(s.getBytes(StandardCharsets.UTF_8));
	}
}