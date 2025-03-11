import { object, string, number, array, size, nonempty, refine, optional } from 'superstruct';

const nickName = refine(string(), 'NickName', v =>
  v.length >= 2 && v.length <= 10 ? true : '닉네임은 2자 이상 10자 이하로 입력해 주세요.',
);

const password = refine(string(), 'Password', v =>
  v.length >= 4 && v.length <= 16 ? true : '비밀번호는 4자 이상 16자 이하로 입력해주세요.',
);

export const CreateGroupSchema = object({
  name: size(string(), 1, 50),
  description: size(string(), 1, 255),
  photo: optional(string()),
  goalRep: number(),
  discordURL: size(string(), 1, 100),
  invitationURL: size(string(), 1, 100),
  tags: optional(array(string())),
  ownerNickname: size(string(), 2, 10),
  ownerPassword: size(string(), 4, 16),
});
