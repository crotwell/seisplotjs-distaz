require('../lib/distaz.js');

QUnit.test("deg km convert", function (assert) {
  assert.equal(kmtodeg(degtokm(45)), 45, "45 deg round trip");
});

QUnit.test("basic dist south pole", function (assert) {
    var result = distaz(0, 0, -90, 0);
    assert.equal(result.delta, 90, "southpole dist");
    assert.equal(result.az, 0, "south pole backazimuth");
    assert.equal(result.baz, 180, "southpole azimuth");
});

QUnit.test("basic dist north pole", function (assert) {
    var result = distaz(0, 0, 90, 0);
    assert.equal(result.delta, 90, "northpole dist");
    assert.equal(result.az, 180, "north pole backazimuth");
    assert.equal(result.baz, 0, "north pole azimuth");
});
