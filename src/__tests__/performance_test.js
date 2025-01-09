
/*
* API COINGECO PERFORMANCE TESTS
* to run tests install k6
* LINUX: brew install k6
* WINDOWS: https://grafana.com/docs/k6/latest/set-up/install-k6/
* k6 run performance_test.js
* */



import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 },  // Przez 30 sekund zwiększaj liczbę użytkowników do 20
        { duration: '1m', target: 50 },   // Przez 1 minutę utrzymuj 50 użytkowników
        { duration: '30s', target: 0 },   // Przez 30 sekund zmniejszaj liczbę użytkowników do 0
    ],
};

export default function () {
    const res = http.get('https://api.coingecko.com/api/v3/coins/bitcoin');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 500ms': (r) => r.timings.duration < 500,
    });
    sleep(1); // Czekaj 1 sekundę między żądaniami
}