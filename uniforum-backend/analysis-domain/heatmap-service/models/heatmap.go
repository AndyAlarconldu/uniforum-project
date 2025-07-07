package models

type HeatmapEntry struct {
	Date     string `json:"date"`
	Posts    int    `json:"posts"`
	Comments int    `json:"comments"`
}
