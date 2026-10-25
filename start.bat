@echo off
chcp 65001 > nul
echo Открытие сайта в вашем браузере по умолчанию...
start "" "%~dp0index.html"
exit
