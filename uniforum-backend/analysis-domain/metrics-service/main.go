package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"metrics-service/db"
	"metrics-service/handlers"
	"os"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	db.InitDB()

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
	}))
	router.GET("/metrics/summary", handlers.GetSummary)

	port := os.Getenv("PORT")
	if port == "" {
	port = "8020"
	}
	router.Run(":" + port)
}
