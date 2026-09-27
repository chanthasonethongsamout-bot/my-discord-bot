const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const TOKEN = process.env.DISCORD_TOKEN;

// ใส่ ID จริงของคุณ
const CLIENT_ID = "1553605501814702180";
const GUILD_ID = "1469963380126384160";

// คำสั่งทั้งหมด
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ทดสอบบอท"),

  new SlashCommandBuilder()
    .setName("hello")
    .setDescription("ทักทาย")
].map(command => command.toJSON());

// ลงทะเบียนคำสั่ง
const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("ลงทะเบียนคำสั่งเรียบร้อย");
  } catch (error) {
    console.error(error);
  }
})();

// สร้างบอท
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// เมื่อบอทออนไลน์
client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

// เมื่อมีการใช้คำสั่ง
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong! 🏓");
  }

  if (interaction.commandName === "hello") {
    await interaction.reply("ສະບາຍດີງັບ");
  }
});

// Login
client.login(TOKEN);
