@echo off
cd /d "%~dp0"
call npm install
set IT_KB_ROOT=%~dp0..\it-knowledge-base
if exist "%IT_KB_ROOT%\docs\glossary" (
  node packages\sync\sync-glossary.mjs
)
set IT_PORTALS_DEV=1
npm run dev:terms
