@echo off
chcp 65001 > nul
echo Проверка наличия Python для запуска локального веб-сервера...

where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Python найден! Запуск локального сервера на http://localhost:8000 ...
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo Python не найден, открываем index.html напрямую в браузере...
    start "" "%~dp0index.html"
)
pause
