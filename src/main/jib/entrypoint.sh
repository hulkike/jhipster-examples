#!/bin/sh

# Waiting jib 0.9.11 environment variable support
SPRING_OUTPUT_ANSI_ENABLED="${SPRING_OUTPUT_ANSI_ENABLED:-ALWAYS}"
JHIPSTER_SLEEP="${JHIPSTER_SLEEP:-0}"
JAVA_OPTS="${JAVA_OPTS:-}"

echo "The application will start in ${JHIPSTER_SLEEP}s..." && sleep ${JHIPSTER_SLEEP}
exec java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -cp /app/resources/:/app/classes/:/app/libs/* "com.mycompany.myapp.MonoApp"  "$@"
