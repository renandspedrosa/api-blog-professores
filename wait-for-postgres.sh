echo "Aguardando o banco de dados Postgres..."

while ! pg_isready -h "$DATABASE_HOST" -p "$DATABASE_PORT" -U "$DATABASE_USER"; do
  sleep 2
done

echo "Banco de dados está acessível!"
