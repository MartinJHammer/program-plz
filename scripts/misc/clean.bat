@echo off

rem This bat file removes auto-generated files/folders in the whole project: node_modules, lib, dist, package-lock.json

rem @     | turns off echo for one line.
rem echo  | print line
rem del   | remve file
rem RD    | remove directory
rem mkdir | make directory
rem %~dp0 | current folder path
rem ""    | escapes whitespace
rem pause | prevents console from closing
rem /s    | delete all files contained in the directory subfolders.
rem /q    | "quiet mode" meaning you won’t be prompted Yes/No

rem === ROOT ===
RD /s /q "%~dp0\..\..\node_modules";
echo Deleted root node_modules;
del /s /q "%~dp0\..\..\package-lock.json";

rem === NPM PACKAGES ===
rem area
RD /s /q "%~dp0\..\..\packages\area\lib";
mkdir "%~dp0\..\..\packages\area\lib";
echo Deleted area\lib;
RD /s /q "%~dp0\..\..\packages\area\node_modules";
echo Deleted area\node_modules;
del /s /q "%~dp0\..\..\packages\area\package-lock.json";