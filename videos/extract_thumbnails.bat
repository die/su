@echo off
:: Loop through each video file in the directory
for %%f in (*.mp4 *.avi *.mkv) do (
    echo Processing "%%f"
    ffmpeg -i "%%f" -vf "thumbnail" -frames:v 1 "thumbnails\%%~nf.png"
)

echo Done
pause
