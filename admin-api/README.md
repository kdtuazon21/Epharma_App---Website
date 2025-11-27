# admin-api (Spring Boot)

Minimal Spring Boot service for the Delivery Platform admin API.

Features:
- JWT authentication (login/register)
- Entities: User, Merchant, Driver, Order
- CRUD controllers with role-based authorization (DELETE requires ROLE_ADMIN)
- Validation and a global exception handler

Run locally (requires Java 17 and Maven):

```powershell
cd admin-api
mvn spring-boot:run
```

By default the app expects a Postgres database at `jdbc:postgresql://localhost:5432/delivery_db` with user `postgres` and password `postgres`. You can change these in `src/main/resources/application.properties` or provide env vars.

I can also add a `docker-compose.yml` to start Postgres and the app if you want.
