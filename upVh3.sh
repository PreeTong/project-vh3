ECHO "Delect Old File"
ssh myadmin@192.168.5.86 rm -R /var/www/vh3/html
ECHO "Upload Build"
scp -r /Users/patcharakitphaiwan/Desktop/Project/project-vh3/build/  myadmin@192.168.5.86:/var/www/vh3/html
