package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	connStr := os.Getenv("DATABASE_URL")
	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("❌ Error al conectar a la base de datos:", err)
	}
	err = DB.Ping()
	if err != nil {
		log.Fatal("❌ No se puede hacer ping a la base:", err)
	}
	fmt.Println("✅ Base de datos conectada")
}
