import "dotenv
import fetch from "node-fetch";
console.log(process.env.REACT_APP_API_URL);

async function test() {
  let res = fetch(process.env.API_URL).then((res) => res.json());

  let data = res.data;
  console.log(data);
}

test();
// it("testing fetching database", async () => {
//   let res = fetch(process.env.API_URL).then(res => res.json());

//   let data = res.data;
//   console.log(data);
// });
