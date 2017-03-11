module.exports = function(client) {
	var api = {};
	
	api.takeoff = function() {
		if(client) {
			client.takeoff();
			console.log("Drone is taking off");
		}
		else console.log("Client is null");
	};

	api.land = function() {
		if(client) {
			//client.stop();
			client.land();
			console.log("Drone is landing");
		}
		else console.log("Client is null");
	};

	api.moveForwardBy = function(distance, speed) {
		var ms = this.distanceToMs(distance, speed);
		client.front(speed);
		client.after(ms, function(){
			client.stop();
		});
		console.log("Move for "+ms+"ms");
	};

	api.rotateBy = function(angle, speed) {
		var ms = this.degreesToMs(angle, speed);
		if(angle > 0) {
			client.clockwise(speed);
			client.after(ms, function(){
				client.stop();	
			});
			console.log("Rotated cw by "+angle+" in "+ms+"ms");
		} else if(angle < 0) {
			client.counterClockwise(speed)
			client.after(ms, function(){
				client.stop();	
			});
			console.log("Rotated ccw by "+angle+" in "+ms+"ms");
		} else console.log("Bad rotation args: "+angle+"; "+speed);
	};

	api.stopAll = function() {
		client.stop();
	};

	api.distanceToMs = function(distance, speed) {
		return distance*speed*50;
	};

	api.degreesToMs = function(angle, speed) {
		return Math.abs(angle*speed*10);
	};

	api.parsePath = function(pathData) {
		return pathData;
	};

	return api;
};
