# chaut
LIVE用チャットツール

# 本番docker起動
docker-compose up -d

# ローカルredis用docker起動
docker-compose -f docker-compose-redis.yml up -d

# ローカルwebappのdocker起動(app.tsのライブラリ読み込みのコメントアウトの修正する)
docker-compose -f docker-compose.local.yml up

# dockerコンテナにログイン
docker ps
docker exec -it dockerimageid sh

# redis cli起動
redis-cli

# xread
実行例)
# chaut : キー名
# 0-0 : ID指定(指定ID以降の全てのデータを取得)
xread streams chaut 0-0
