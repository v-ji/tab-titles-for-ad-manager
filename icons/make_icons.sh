icon_sizes=( 16 32 48 64 96 128 256 )

for size in "${icon_sizes[@]}"
do
  echo ${size}x${size} …
  convert $1 -resize ${size}x icon-${size}.png 
done
echo Done!