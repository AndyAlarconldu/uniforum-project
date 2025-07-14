package routes

import (
	"github.com/gin-gonic/gin"
	"log-service/controllers"
)

func RegisterLogRoutes(router *gin.Engine) {
	logs := router.Group("/logs")
	{
		logs.POST("/", controllers.CreateLog)
		logs.GET("/", controllers.GetLogs)
	}
}
