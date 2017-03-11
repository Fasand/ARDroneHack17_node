module.exports = function(app, api) {

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/test', function(req, res, next) {
    res.render('index', { title: 'Test' });
  });

  // Drone handling
  app.get('/takeoff', function(req, res, next) {
    api.takeoff();
    res.send("Taking off.");
  });

  app.get('/land', function(req, res, next) {
    api.land();
    res.send("Landing.");
  });

  app.get('/moveforward', function(req, res, next) {
    var distance = req.query.d;
    var speed = req.query.s;
    if(distance > 0 && speed > 0) {
      api.moveForwardBy(distance, speed);
      res.send("Moved a distance and logged.");
    } else console.log("Distance should be in ?d=X&s=Y");
  });

  app.get('/rotate', function(req, res, next) {
    var angle = req.query.a;
    var speed = req.query.s;
    if(speed > 0 && angle !== 0) {
      api.rotateBy(angle, speed);
    } else console.log("Speed is less than or equal to zero");
    res.send("Rotated by an angle and logged.");
  });

  app.post('/path', function(req, res, next) {
    console.log(req.body);
    res.send(req.body.path);
  });

  app.get('/control', function(req, res, next) {
    res.render("control", {title:"Control panel"});
  });

  app.get('/stop', function(req, res, next){
    api.stopAll();
    res.send("Stopped all.");
  });

};
