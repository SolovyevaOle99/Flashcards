import express from "express"
import modulRoutes from "./routes/modules.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cardsRoutes from "./routes/cards.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser"

const app = express()


//анализирует входящие запросы JSON и помещает проанализированные данные в файлы req.body
app.use(express.json())
app.use(cookieParser())
app.use("/backend/modules", modulRoutes)
app.use("/backend/auth", authRoutes)
app.use("/backend/users", userRoutes)
app.use("/backend/cards", cardsRoutes)
app.use("/backend/users", usersRoutes)


app.listen(8880, ()=> {
    console.log("Connected to database")
})