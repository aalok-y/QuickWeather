package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
)

func main() {
	router := gin.Default()
	err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))

	router.GET("/", homeHandler)
	router.GET("/current", currentHandler)
	router.Run(":8080")
}

func homeHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"msg": "I'm alive!",
	})
}

func currentHandler(c *gin.Context) {
	apiKey := os.Getenv("API_KEY") 
	locationParam := c.DefaultQuery("location","auto:ip")
	apiURL := "http://api.weatherapi.com/v1/current.json?key=" +apiKey+"&q="+locationParam + "&aqi=yes"
	fmt.Println("Fetching for: ", apiURL)
	res, err := http.Get(apiURL) 
	if err != nil {
		log.Printf("Failed to fetch data: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch data from external API",
		})
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Printf("Failed to read response body: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to read response body",
		})
		return
	}

	var responseData map[string]interface{}

	if err := json.Unmarshal(body, &responseData); err != nil {
		log.Printf("Failed to unmarshal JSON: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to process the external API response as JSON",
		})
		return
	}

	c.JSON(http.StatusOK, responseData)
}
