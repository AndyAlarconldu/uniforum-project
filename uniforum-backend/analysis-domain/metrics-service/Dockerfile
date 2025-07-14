FROM golang:1.24.4

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 8020

CMD ["./main"]
