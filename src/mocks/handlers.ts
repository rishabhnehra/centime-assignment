import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users/1/analytics", async () => {
    await delay(500);
    return HttpResponse.json(
      [
        { id: 1, source: "Salary", target: "Balance", value: 5000 },
        { id: 2, source: "Balance", target: "Bill", value: 3000 },
        { id: 3, source: "Bill", target: "Electricity", value: 1000 },
        { id: 4, source: "Bill", target: "Mobile", value: 2000 },
      ],
      { status: 200 }
    );
  }),
];
