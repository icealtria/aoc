const day = Deno.args[0];
if (!day) {
  Deno.exit(1);
}

const command = new Deno.Command("deno", {
  args: ["run", "--watch", `./day${day}/index.ts`],
});

const process = command.spawn();
await process.status;
