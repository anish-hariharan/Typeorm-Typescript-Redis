"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entities/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
/*app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const allRecord = await userRepo.find();
    res.json(allRecord);
});
app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    await userRepo.delete(0)
    res.send("Deleted")
});*/
/*app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    let user : User = new User();
    user.firstName = "tiger";
    user.lastName = "GSD"

    const usernew = await userRepo.save(user);

    res.json(usernew);

});*/
/*app.get("/", async (req, res) => {
    let date : Date = new Date();
    let month = () => {
        if(date.getMonth() + 1 < 10) {
            return `0${date.getMonth()+1}`
        }
    }
    let userRepo = AppDataSource.getRepository(User);
    let user = await userRepo.update(13, {date : `${date.getDate()} - ${month()} - ${date.getFullYear()}`})
    res.send("user updated sucessfully")
})*/
/*app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const recd = await userRepo.findOne({where : {firstName : "Anish"}});
    res.json(recd)
})*/
/*app.get("/", async (req, res) => {
    let date : Date = new Date();
    let month = () => {
        if(date.getMonth() + 1 < 10) {
            return `0${date.getMonth()+1}`
        }
    }
    let today : string = (`${date.getDate()} - ${month()} - ${date.getFullYear()}`);
  const user = AppDataSource.getRepository(User);
  const recd = await user.insert({
    firstName: "Anish",
    lastName: "Hariharan",
    date : today,
  });
  res.json(recd);
});*/
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = AppDataSource.getRepository(user_1.User);
    const user = yield userRepo.find({
        order: {
            date: "DESC",
        },
    });
    res.send(user);
}));
app.get("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = AppDataSource.getRepository(user_1.User);
    yield userRepo.delete(0);
    res.send("Deleted");
}));
app.get("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let date = new Date();
    let month = () => {
        if (date.getMonth() + 1 < 10) {
            return `0${date.getMonth() + 1}`;
        }
    };
    let userRepo = AppDataSource.getRepository(user_1.User);
    let user = yield userRepo.update(13, {
        date: `${date.getDate()} - ${month()} - ${date.getFullYear()}`,
    });
    res.send("user updated sucessfully");
}));
app.get("/insert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let date = new Date();
    let month = () => {
        if (date.getMonth() + 1 < 10) {
            return `0${date.getMonth() + 1}`;
        }
    };
    let today = `${date.getDate()} - ${month()} - ${date.getFullYear()}`;
    const user = AppDataSource.getRepository(user_1.User);
    const recd = yield user.insert({
        firstName: "Anish",
        lastName: "Hariharan",
        date: today,
    });
    res.json(recd);
}));
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "373414",
    database: "typeorm",
    entities: ["src/entities/*{.ts,.js}"],
    synchronize: true,
    logging: true,
});
AppDataSource.initialize()
    .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
        console.log("running in port 3000 s");
    });
})
    .catch((err) => {
    console.log(err);
});
