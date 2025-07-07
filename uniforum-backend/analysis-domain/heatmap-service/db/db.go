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
		log.Fatal("❌ Error al abrir conexión:", err)
	}
	err = DB.Ping()
	if err != nil {
		log.Fatal("❌ No se puede conectar a la base de datos:", err)
	}
	fmt.Println("✅ Base de datos conectada")
}
