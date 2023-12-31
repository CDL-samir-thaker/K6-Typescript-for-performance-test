import { check, group } from 'k6';
import http from 'k6/http';
import { Trend } from 'k6/metrics';

const uptimeTrendCheck = new Trend('/GET API uptime');

export let options = {
   stages: [
       { duration: '0.5m', target: 3 }, // simulate ramp-up of traffic from 0 to 3Vus
   ],
};

export default function () {
   group('API uptime check', () => {
       const response = http.get('https://aqueous-brook-60480.herokuapp.com/todos/');
       uptimeTrendCheck.add(response.timings.duration);
       check(response, {
           "status code should be 200": res => res.status === 200,
       });
   });
  }