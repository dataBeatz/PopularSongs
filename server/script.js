import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 500,
  duration: "30s",
};

export default function() {
  let randomArtist = Math.ceil((Math.random() * 1000000) + 9000000);
  let res = http.get(`http://localhost:1177/artist/${randomArtist}`);
  sleep(Math.random() * .25);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time was OK": (r) => r.timings.duration < 300
  });
};