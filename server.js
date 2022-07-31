const mongoose = require('mongoose');

require('dotenv').config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // 处理弃用警告
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection sucessful!');
  });

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
