import { object, string, number, array, size, optional } from 'superstruct';

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

export const validationError = error => {
  if (error.message.includes('goalRep')) return '목표 횟수는 숫자여야 합니다.';
  if (error.message.includes('ownerNickname')) return '닉네임은 2자 이상 10자 이하로 입력해 주세요.';
  if (error.message.includes('ownerPassword')) return '비밀번호는 4자 이상 16자 이하로 입력해주세요.';
};
