#!/bin/bash

APP_NAME="orders-api"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

LOG_DIR="$PROJECT_DIR/logs"
PID_FILE="$LOG_DIR/app.pid"
LOG_FILE="$LOG_DIR/app.log"

mkdir -p "$LOG_DIR"

start_app() {

    if [ -f "$PID_FILE" ]; then
        echo "$APP_NAME is already running."
        return
    fi

    echo "Starting $APP_NAME..."

    cd "$PROJECT_DIR"

    nohup npm start > "$LOG_FILE" 2>&1 &

    echo $! > "$PID_FILE"

    echo "$APP_NAME started successfully."
}

stop_app() {

    if [ ! -f "$PID_FILE" ]; then
        echo "$APP_NAME is not running."
        return
    fi

    PID=$(cat "$PID_FILE")

    kill "$PID"

    rm -f "$PID_FILE"

    echo "$APP_NAME stopped successfully."
}

status_app() {

    if [ -f "$PID_FILE" ]; then
        echo "$APP_NAME is running."
    else
        echo "$APP_NAME is not running."
    fi
}

health_app() {

    curl http://localhost:3000/health
}

restart_app() {

    stop_app
    sleep 2
    start_app
}

case "$1" in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    status)
        status_app
        ;;
    health)
        health_app
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|health}"
        ;;
esac