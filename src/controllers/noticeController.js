import { Webhook, MessageBuilder } from 'discord-webhook-node';

export default async function discordNotice(url, name, nickName) {
  const hook = new Webhook(url);
  const embed = new MessageBuilder()
    .setTitle(`${name}`)
    .setColor('#00ff00')
    .setDescription(`${nickName}님이 운동을 인증하였습니다:)`);

  hook.send(embed);
}
