# chaut
LIVE用チャットツール

# 本番docker起動
docker-compose up -d

# ローカルdocker起動
docker-compose -f docker-compose-redis.yml up -d

# dockerコンテナにログイン
docker ps
docker exec -it dockerimageid sh