package main

import (
	"heatmap-service/db"
	"heatmap-service/handlers"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error cargando .env")
	}

	db.InitDB()

	r := gin.Default()
	r.GET("/activity/heatmap", handlers.GetHeatmap)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8021"
	}
	r.Run(":" + port)
}
