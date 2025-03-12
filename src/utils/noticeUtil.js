import { Webhook, MessageBuilder } from 'discord-webhook-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log(process.env.HOOK_URL);

const hook = new Webhook(process.env.HOOK_URL);

export default async function discordNotice(name, nickName) {
  const embed = new MessageBuilder()
    .setTitle(`${name}`)
    .setColor('#00ff00')
    .setDescription(`${nickName}님이 운동을 인증하였습니다:)`);

  hook.send(embed);
}
