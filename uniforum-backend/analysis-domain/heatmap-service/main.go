package main

import (
	"heatmap-service/db"
	"heatmap-service/handlers"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	db.InitDB()

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/activity/heatmap", handlers.GetHeatmap)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8023"
	}
	r.Run(":" + port)
}
