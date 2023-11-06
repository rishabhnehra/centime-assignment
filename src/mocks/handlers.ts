import { delay, http, HttpResponse } from "msw";

export const analytics = [
  { id: 1, source: "Salary", target: "Balance", value: 5000 },
  { id: 2, source: "Balance", target: "Bill", value: 3000 },
  { id: 3, source: "Bill", target: "Electricity", value: 1000 },
  { id: 4, source: "Bill", target: "Mobile", value: 2000 },
];

export const handlers = [
  http.get("http://localhost:5173/api/users/1/analytics", async () => {
    await delay(200);
    return HttpResponse.json(analytics, { status: 200 });
  }),
];
