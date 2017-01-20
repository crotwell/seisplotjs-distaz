import test from 'ava';
import 'babel-core/register'
import * as distaz from '../src/distaz.js';

test("deg km convert", t => {
  t.is(distaz.kmtodeg(distaz.degtokm(45)), 45, "45 deg round trip");
});

test("basic dist south pole", t => {
    var result = distaz.distaz(0, 0, -90, 0);
    t.is(result.delta, 90, "southpole dist");
    t.is(result.az, 0, "south pole backazimuth");
    t.is(result.baz, 180, "southpole azimuth");
});

test("basic dist north pole", t => {
    var result = distaz.distaz(0, 0, 90, 0);
    t.is(result.delta, 90, "northpole dist");
    t.is(result.az, 180, "north pole backazimuth");
    t.is(result.baz, 0, "north pole azimuth");
});
