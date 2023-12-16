import { db, schema } from ".";
async function main() {
  try {
    const res = await db.insert(schema.memo).values([
      {
        title: "test",
        type: "text",
        raw: "Hello World",
        content: "Hello World",
      },
    ]);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

main();
