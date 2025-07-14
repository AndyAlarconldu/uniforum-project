# 🛠️ Administration Domain - UniForum Project

This domain provides essential infrastructure and administrative tools to support the internal operations of the UniForum platform. It includes services for configuration management, deployment control, centralized logging, and security auditing.

## 📁 Structure


```
administration-domain/
│
├── config-service/ # Manages dynamic configuration settings across services
├── control-deploy-service/ # Oversees deployment status, health checks, and rollout control
├── log-service/ # Aggregates and manages logs from all microservices
└── security-audit-service/ # Tracks security-related events and access auditing
```
---

## 🔧 Services Overview

### ⚙️ `config-service`
- Centralizes configuration management for all backend services.
- Supports dynamic reloading of config values.
- Can be integrated with Consul or etcd for distributed systems.

### 🚀 `control-deploy-service`
- Handles version control of microservices.
- Provides APIs for checking health, status, and deployment stages.
- Useful for CI/CD pipelines and rollbacks.

### 📄 `log-service`
- Central logging system that collects logs from all domains.
- Helps in debugging, monitoring, and tracking runtime issues.
- Can be integrated with ELK Stack or Loki.

### 🛡 `security-audit-service`
- Monitors login attempts, role changes, and permission updates.
- Ensures traceability of user actions related to security.
- Useful for compliance, internal audit, and forensic analysis.

---

## 🛠 Technologies Used

- **FastAPI** (Python)
- **PostgreSQL / MongoDB**
- **RabbitMQ** (message broker)
- **JWT Authentication**
- **Docker / Docker Compose**

---

## 🔌 Integration

```plaintext
Frontend/Admin Panel → API Gateway → Administration Services
Backend Services     → Log + Config + Security Audit
CI/CD Tools          → control-deploy-service

