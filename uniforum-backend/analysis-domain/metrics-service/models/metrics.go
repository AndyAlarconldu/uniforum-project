package models

type SummaryMetrics struct {
	TotalPosts     int `json:"total_posts"`
	TotalReplies   int `json:"total_replies"`
	TotalReactions int `json:"total_reactions"`
}
