const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const user = require('./models/user');

const indexRouter = require('./routes/index');

const app = express();
const http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('User connected!');

  user.show((data) => socket.emit('listar', data));

  socket.on('crear', function (data) {
    console.log(data);
    user.create(data, function (rpta) {
      io.emit('nuevo', rpta);
    });
  });

  socket.on('actualizar', function (data) {
    user.udpate(data, function (rpta) {
      io.emit('nuevo', rpta);
    });
  });

  socket.on('eliminar', function (data) {
    user.delete(data, function (rpta) {
      io.emit('borrado', rpta);
    });
  });

  socket.on('disconnect', function () {
    console.log('User disconnected!');
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(port, () => {
  console.log(`Servidor conectadoen *:${port}`);
});
