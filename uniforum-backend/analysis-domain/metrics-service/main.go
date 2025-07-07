package main

import (
	"github.com/gin-gonic/gin"
	"metrics-service/db"
	"metrics-service/handlers"
	"os"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	db.InitDB()

	router := gin.Default()
	router.GET("/metrics/summary", handlers.GetSummary)

	port := os.Getenv("PORT")
	router.Run(":" + port)
}
