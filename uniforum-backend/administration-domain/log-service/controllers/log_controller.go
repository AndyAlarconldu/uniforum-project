package controllers

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"log-service/config"
	"log-service/models"
)

func CreateLog(c *gin.Context) {
	var logEntry models.LogEntry

	if err := c.ShouldBindJSON(&logEntry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	logEntry.ID = primitive.NewObjectID()
	logEntry.Timestamp = time.Now()

	_, err := config.LogCollection.InsertOne(context.TODO(), logEntry)
	if err != nil {
		log.Println("❌ Error insertando log:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo registrar el log"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Log registrado correctamente"})
}

func GetLogs(c *gin.Context) {
	cursor, err := config.LogCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo obtener los logs"})
		return
	}
	defer cursor.Close(context.TODO())

	var logs []models.LogEntry
	if err = cursor.All(context.TODO(), &logs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al parsear logs"})
		return
	}

	c.JSON(http.StatusOK, logs)
}
