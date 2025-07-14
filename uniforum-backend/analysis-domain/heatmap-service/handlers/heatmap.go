package handlers

import (
	"heatmap-service/db"
	"heatmap-service/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetHeatmap(c *gin.Context) {
	query := `
		SELECT
		  date,
		  SUM(post_count) AS posts,
		  SUM(comment_count) AS comments
		FROM (
		  SELECT DATE(post_date) AS date, COUNT(*) AS post_count, 0 AS comment_count
		  FROM post
		  GROUP BY date

		  UNION ALL

		  SELECT DATE(comment_date) AS date, 0 AS post_count, COUNT(*) AS comment_count
		  FROM comment
		  GROUP BY date
		) AS combined
		GROUP BY date
		ORDER BY date;
	`

	rows, err := db.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error al consultar actividad"})
		return
	}
	defer rows.Close()

	var results []models.HeatmapEntry
	for rows.Next() {
		var entry models.HeatmapEntry
		err := rows.Scan(&entry.Date, &entry.Posts, &entry.Comments)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error al leer resultados"})
			return
		}
		results = append(results, entry)
	}

	c.JSON(http.StatusOK, results)
}
