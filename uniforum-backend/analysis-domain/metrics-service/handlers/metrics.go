package handlers

import (
	"metrics-service/db"
	"metrics-service/models"
	"net/http"
	"github.com/gin-gonic/gin"
)

func GetSummary(c *gin.Context) {
	var metrics models.SummaryMetrics

	db.DB.QueryRow("SELECT COUNT(*) FROM post").Scan(&metrics.TotalPosts)
	db.DB.QueryRow("SELECT COUNT(*) FROM comment").Scan(&metrics.TotalReplies)
	db.DB.QueryRow("SELECT COUNT(*) FROM reaction").Scan(&metrics.TotalReactions)

	c.JSON(http.StatusOK, metrics)
}
