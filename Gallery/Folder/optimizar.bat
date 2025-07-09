@echo off
echo Optimizando casa.glb con gltfpack...
gltfpack -cc -tc 0.25 -i casa.glb -o casa_optimizada.glb
echo Listo. El archivo optimizado se llama casa_optimizada.glb
pause
