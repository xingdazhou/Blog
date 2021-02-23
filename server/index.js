const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const static = require("koa-static");
const koaBody = require("koa-body");
// 解析request的body的功能(post请求)
const bodyParser = require("koa-bodyparser");

app.use(static(__dirname + "/static"));
var router = require("koa-router")();

//2.引入mongodb
const { MongoClient } = require("mongodb");
const { resolve } = require("path");
//3.定义数据库的连接地址
const url = "mongodb://127.0.0.1:27017";
//4.定义要操作的数据库
const dbName = "Article";

app.use(
  koaBody({
    multipart: true, //上传文件这里要设置为true
  })
);
router.get("/getSubArticleDir", async (ctx) => {
  let query = ctx.request.query.filename;
  let skip = ctx.request.query.skip;
  console.log("指定跳的数目："+ skip)
  console.log(query);
  let p = new Promise((resolve, reject) => {
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
    client.connect((err) => {
      if (err) throw err;
      console.log("数据库连接成功getArticleDir");
      //切换数据库
      let db = client.db(dbName);

      //查找数据
      if (query !== "undefined") {
        db.collection("AllArticle")
          .find({
            tag: query,
          }).sort({_id:-1}).limit(10).skip(Number(skip))
          .toArray((err, data) => {
            // console.log(data)
            resolve(data);
            client.close();
            console.log("获取指定目录成功,数据库关闭");
          });
      } else {
        db.collection("AllArticle")
          .find().sort({_id:-1}).limit(10).skip(Number(skip))
          .toArray((err, data) => {
            // console.log(data)
            resolve(data);
            client.close();
            console.log("获取所有目录成功,数据库关闭");
          });
      }
    });
  });
  let data = await p;
  ctx.body = data;
});

// slider
router.get("/getTagNum", async (ctx) => {
  let p = new Promise((resolve, reject) => {
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
    client.connect(async (err) => {
      if (err) throw err;
      console.log("数据库连接成功getTagNum");
      let db = client.db(dbName);
      let arr = [
        "HTML",
        "HTML5",
        "JavaScript",
        "CSS",
        "CSS3",
        "ES6",
        "Vue",
        "Vue3",
        "React",
        "浏览器原理",
        "Git",
        "数据结构与算法",
        "设计模式",
        "TypeScript",
        "Node",
        "Express",
        "Koa",
        "Webpack",
        "计算机网络",
      ];
      let tagNum = {};
      arr.forEach((item, index) => {
        arr[index] = new Promise((resolve, reject) => {
          db.collection("AllArticle")
            .find({
              tag: item,
            })
            .count((err, data) => {
              // resolve({[item]:data})
              resolve({
                tag: item,
                num: data,
              });
            });
        });
      });
      // Promise.all(arr).then((data) => {
      //     console.log(data)
      //     ctx.body = data
      //     client.close()
      //     console.log('增加成功,数据库关闭')
      // })
      let data = await Promise.all(arr);
      resolve(data);
      client.close();
      console.log("数据库关闭成功");
    });
  });
  let data = await p;
  ctx.body = data;
});

// 获取文章
router.get("/getArticle", async (ctx) => {
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    if (err) throw err;
    console.log("数据库连接成功getArticleDir");
    //切换数据库
    let db = client.db(dbName);

    //查找数据
    //修改数据
    db.collection("AllArticle").updateOne(
      {
        title: ctx.request.query.filename,
      },
      {
        $set: {
          eye: parseInt(ctx.request.query.eye) + 1,
        },
      },
      (err, result) => {
        if (err) throw err;
        console.log("修改eye成功");
        client.close();
      }
    );
  });
  let data = fs.readFileSync(
    `./static/article/${ctx.request.query.filename}`,
    "utf-8"
  );
  ctx.body = data;
});

router.get("/getArticleDir", async (ctx) => {
  let p = new Promise((resolve, reject) => {
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
    client.connect((err) => {
      if (err) throw err;
      console.log("数据库连接成功getArticleDir");
      //切换数据库
      let db = client.db(dbName);

      //查找数据
      db.collection("AllArticle")
        .find()
        .toArray((err, data) => {
          // console.log(data)
          resolve(data);
          client.close();
          console.log("获取所有目录成功,数据库关闭");
        });
    });
  });

  let data = await p;
  ctx.body = data;
});

router.post("/uploadArticle", async (ctx, next) => {
  console.log(ctx.request.files);
  console.log(JSON.parse(ctx.request.body.other));
  let body = JSON.parse(ctx.request.body.other);
  let title;
  let img;
  // let fileData = fs.readFileSync(ctx.request.files.img.path)
  // fs.writeFileSync('static/img/' + ctx.request.files.img.name, fileData)

  // let fileData = fs.readFileSync(files.myfile.path)
  title = ctx.request.files.wenzhang.name;
  img = "http://localhost:3000/img/" + ctx.request.files.img.name;
  let fileDataW = fs.readFileSync(ctx.request.files.wenzhang.path);
  fs.writeFileSync(
    "static/article/" + ctx.request.files.wenzhang.name,
    fileDataW
  );
  let fileDataI = fs.readFileSync(ctx.request.files.img.path);
  fs.writeFileSync("static/img/" + ctx.request.files.img.name, fileDataI);
  let data = {
    title,
    img,
    desc: body.desc,
    time: body.time,
    year: body.year,
    eye: 1,
    tag: body.tag,
  };
  console.log(data);

  // 存库
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    if (err) throw err;
    console.log("数据库连接成功uploadArticle");
    //切换数据库
    let db = client.db(dbName);
    //增加数据
    db.collection("AllArticle").insertOne(data, (err, result) => {
      if (err) throw err;
      client.close();
      console.log("增加成功,数据库关闭");
    });
  });
  ctx.body = "请求成功";
});
// 时间线
router.get("/getTimeLine", async (ctx) => {
  let p = new Promise((resolve, reject) => {
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
    client.connect((err) => {
      if (err) throw err;
      console.log("数据库连接成功getTimeLine");
      //切换数据库
      let db = client.db(dbName);

      //查找数据
      db.collection("AllArticle")
        .find({})
        .project({ title: 1, time: 1, year: 1 })
        .toArray((err, data) => {
          // console.log(data)
          resolve(data);
          client.close();
          console.log("数据库关闭");
        });
    });
  });

  let data = await p;
  ctx.body = data;
});

// 项目
router.get("/getMyProject", async (ctx) => {
  let p1 = new Promise((resolve, reject) => {
    //5.实例化MongoClient 传入数据库连接地址,注意每次都是必须创建新实例来连接
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
    client.connect((err) => {
      if (err) throw err;
      console.log("数据库连接成功getMyProject");
      //切换数据库
      let db = client.db(dbName);

      //查找数据
      db.collection("MyProject")
        .find()
        .toArray((err, data) => {
          // console.log(data)
          resolve(data);
          reject();
          //7.操作数据库完毕之后关闭连接,这里是异步的，所以就直接在回调中关闭
          client.close();
          console.log("数据库关闭");
        });
    });
  });
  let message = await p1;
  ctx.body = message;
});
router.post("/uploadMyProject", async (ctx) => {
  console.log(ctx.request.files);
  console.log(ctx.request.body);
  let files = ctx.request.files;
  let body = ctx.request.body;
  let absoluteUrl;

  // 1. 先存图片  if else关系
  if (files) {
    await new Promise((resolve, reject) => {
      let fileData = fs.readFileSync(files.myfile.path);
      absoluteUrl = "http://localhost:3000/img/" + files.myfile.name;
      fs.writeFileSync("static/img/" + files.myfile.name, fileData);

      const client = new MongoClient(url, {
        useUnifiedTopology: true,
      });
      client.connect((err) => {
        if (err) throw err;
        console.log("数据库连接成功1");
        //切换数据库
        let db = client.db(dbName);
        //增加数据
        db.collection("MyProject").insertOne(
          {
            url: absoluteUrl,
            title: "",
            time: "",
            github: "",
          },
          (err, result) => {
            if (err) throw err;
            resolve(absoluteUrl);
            client.close();
            console.log("增加成功,数据库关闭1");
          }
        );
      });
    });
  } else {
    await new Promise((resolve, reject) => {
      const client = new MongoClient(url, {
        useUnifiedTopology: true,
      });
      client.connect((err) => {
        if (err) throw err;
        console.log("数据库连接成功2");
        //切换数据库
        let db = client.db(dbName);
        //修改数据
        db.collection("MyProject").updateOne(
          {
            url: body.absoluteUrl,
          },
          {
            $set: {
              url: body.absoluteUrl,
              title: body.title,
              time: body.time,
              github: body.github,
            },
          },
          (err, result) => {
            if (err) throw err;
            console.log("修改成功2");
            client.close();
          }
        );
      });
    });
  }

  //2. 返回请求
  if (absoluteUrl) {
    ctx.body = JSON.stringify(absoluteUrl);
  } else {
    ctx.body = "请求完成1";
  }
});
// 历程
router.get("/getLiCheng", async (ctx) => {
  let p1 = new Promise((resolve, reject) => {
    //5.实例化MongoClient 传入数据库连接地址,注意每次都是必须创建新实例来连接
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
    client.connect((err) => {
      if (err) throw err;
      console.log("数据库连接成功getLiCheng");
      //切换数据库
      let db = client.db(dbName);

      //查找数据
      db.collection("LiCheng")
        .find()
        .toArray((err, data) => {
          // console.log(data)
          resolve(data);
          reject();
          //7.操作数据库完毕之后关闭连接,这里是异步的，所以就直接在回调中关闭
          client.close();
          console.log("数据库关闭");
        });
    });
  });
  let message = await p1;
  ctx.body = message;
});
router.post("/uploadLiCheng", (ctx) => {
  // console.log(ctx.request.body)
  let data = ctx.request.body;
  // 存入数据库
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    if (err) throw err;
    console.log("数据库连接成功uploadLiCheng");
    //切换数据库
    let db = client.db(dbName);
    //增加数据
    db.collection("LiCheng").insertOne(
      {
        title: data.title,
        content: data.content,
        timestamp: data.timestamp,
        footerTime: data.footerTime,
        color: data.color,
      },
      (err, result) => {
        if (err) throw err;
        console.log("增加成功");
        // console.log(result)
        client.close();
        console.log("数据库关闭");
      }
    );
  });
  ctx.body = "请求完成";
});
//关于
router.get("/getAbout", (ctx) => {
  // console.log(ctx.request)
  let data = fs.readFileSync("./static/about/mySelf.md", "utf-8");
  ctx.body = data;
});
router.post("/uploadAbout", (ctx) => {
  console.log(ctx.request.files);
  let fileData = fs.readFileSync(ctx.request.files.myfile.path);
  fs.writeFileSync("static/about/" + ctx.request.files.myfile.name, fileData);
  ctx.body = "请求成功";
});

app.use(bodyParser());
app.use(router.routes()); /*启动路由*/
app.listen(3000, () => {
  console.log("服务启动在3000 端口");
});
