package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LogEntry struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Service   string             `bson:"service" json:"service"`           // Microservicio que generó el log
	Level     string             `bson:"level" json:"level"`               // info, warn, error
	Message   string             `bson:"message" json:"message"`           // Descripción del evento
	Timestamp time.Time          `bson:"timestamp" json:"timestamp"`       // Fecha y hora
}
