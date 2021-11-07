docker run -d --rm \
	--name dbproj-postgres \
	-e POSTGRES_PASSWORD=p@ssW0rd \
	-v ${PWD}/postgres-data/:/var/lib/postgresql/data \
	-v ${PWD}/sql_scripts/:/home/sql_scripts \
        -p 5432:5432 \
        postgres
