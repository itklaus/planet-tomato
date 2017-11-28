// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('config');

const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.forEach(handler => require('./handlers/' + handler).init(app));

const Router = require('koa-router');
const router = new Router();

router.get('/', async function(ctx, next) {
  let count = ctx.session.count || 0;
  ctx.session.count = ++count;

  ctx.body = ctx.render('./templates/index.pug', {
    user: 'You!',
    count
  });
});

app.use(router.routes());

app.listen(PORT, () => console.log(`Listening on ${ PORT  }`));
