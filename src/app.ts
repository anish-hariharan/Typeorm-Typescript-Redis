import express from "express";
import { DataSource, EntityRepository } from "typeorm";
import { User } from "./entities/user";
import { createClient } from "redis";

const app = express();

app.use(express.json());
const port = 3000;

app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const allRecord = await userRepo.find();
    res.json(allRecord);
});
app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    await userRepo.delete(0)
    res.send("Deleted")
});

app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    let user : User = new User();
    user.firstName = "tiger";
    user.lastName = "GSD"

    const usernew = await userRepo.save(user);

    res.json(usernew);

});

app.get("/", async (req, res) => {
    let date : Date = new Date();
    let month = () => {
        if(date.getMonth() + 1 < 10) {
            return `0${date.getMonth()+1}`
        }
    }
    let userRepo = AppDataSource.getRepository(User);
    let user = await userRepo.update(13, {date : `${date.getDate()} - ${month()} - ${date.getFullYear()}`})
    res.send("user updated sucessfully")
})

app.get("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const recd = await userRepo.findOne({where : {firstName : "Anish"}});
    res.json(recd)
})

app.get("/", async (req, res) => {
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
});

app.get("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.find({
    order: {
      date: "DESC",
    },
  });
  res.send(user);
});

app.get("/delete", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  await userRepo.delete(0);
  res.send("Deleted");
});

app.get("/update", async (req, res) => {
  let date: Date = new Date();
  let month = () => {
    if (date.getMonth() + 1 < 10) {
      return `0${date.getMonth() + 1}`;
    }
  };
  let userRepo = AppDataSource.getRepository(User);
  let user = await userRepo.update(13, {
    date: `${date.getDate()} - ${month()} - ${date.getFullYear()}`,
  });
  res.send("user updated sucessfully");
});

app.get("/insert", async (req, res) => {
  let date: Date = new Date();
  let month = () => {
    if (date.getMonth() + 1 < 10) {
      return `0${date.getMonth() + 1}`;
    }
  };
  let today: string = `${date.getDate()} - ${month()} - ${date.getFullYear()}`;
  const user = AppDataSource.getRepository(User);
  const recd = await user.insert({
    firstName: "Anish",
    lastName: "Hariharan",
    date: today,
  });
  res.json(recd);
});
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "373414",
  database: "typeorm",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
  cache  :{
    type : "redis",
    duration : 60000,
    options : {
      host : "localhost",
      port : 6379
    },
    ignoreErrors : true
  }
});
app.get("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const results = await userRepo.find({
    skip: 0,
    take: 2,
  });
  res.json(results);
});

createClient({
  url : 'redis://default:69SE7RfTy11M5LpaCw2ckdmQS2vWLrWm@awesome.redis.server:63820'
})

const client = createClient();

client.on('error', (err) => console.log('redis client error',err));

client.connect();

client.set('key', 'value');

const value = client.get('key')

console.log(client.HGETALL('firstkey'));

AppDataSource.initialize()
  .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
      console.log("running in port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
