import {
  object,
  string,
  number,
  array,
  size,
  nonempty,
  refine,
} from 'superstruct';

const nickName = refine(string(), 'NickName', v =>
  v.length >= 2 && v.length <= 10
    ? true
    : '닉네임은 2자 이상 10자 이하로 입력해 주세요.',
);

const password = refine(string(), 'Password', v =>
  v.length >= 4 && v.length <= 16
    ? true
    : '비밀번호는 4자 이상 16자 이하로 입력해주세요.',
);

export const CreateGroupSchema = object({
  name: size(string(), 1, 255),
  description: string(),
  photo: string(),
  goalRep: nonempty(number()),
  discordURL: nonempty(string()),
  invitationURL: nonempty(string()),
  tags: array(string()),
  ownerNickName: nickName,
  ownerPassword: password,
});
