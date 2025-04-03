#!/bin/bash

# Create directories if they don't exist
mkdir -p nginx/ssl

# Generate SSL certificate and key
openssl req -x509 \
    -nodes \
    -days 365 \
    -newkey rsa:2048 \
    -keyout nginx/ssl/key.pem \
    -out nginx/ssl/cert.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

echo "SSL certificates generated successfully!"
echo "Location: nginx/ssl/"
echo "Files: cert.pem, key.pem" 