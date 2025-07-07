package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"log-service/config"
	"log-service/routes"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error cargando archivo .env")
	}

	config.ConnectMongo()

	router := gin.Default()
	routes.RegisterLogRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8030"
	}

	log.Printf("🚀 Servidor activo en http://localhost:%s", port)
	err = router.Run(":" + port)
	if err != nil {
		log.Fatal("❌ Error iniciando servidor:", err)
	}
}
