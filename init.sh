docker-compose -f local.yml up -d

# wait for the server to be ready
API_IS_UP=$(curl http://localhost/proxy/backend/)
while [ "$API_IS_UP" != "Server is up" ]
do
  API_IS_UP=$(curl http://localhost/proxy/backend/)
  sleep 1
done

# if the server is ready, migrate admin account
curl http://localhost/proxy/backend/user/migrate