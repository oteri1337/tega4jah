FROM php:8.4.8-cli-alpine3.20

# Install system packages and PHP extensions
RUN apk add --no-cache \
    git \
    curl \
    unzip \
    libzip-dev \
    postgresql-dev \
    mariadb-dev \
    && docker-php-ext-install zip pdo_pgsql pgsql pdo_mysql mysqli

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy composer file and install dependencies (no vendor from host)
COPY composer.json composer.json
RUN composer install --no-interaction --prefer-dist --no-dev

# Copy application code and env file
COPY .env .env
COPY server/ server/
COPY public_html/ public_html/

# Expose PHP built-in web server port
EXPOSE 8000

# Run the app
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public_html"]
