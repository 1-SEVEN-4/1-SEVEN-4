export const GROUP = [
  {
    id: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
    name: 'Fitness Enthusiasts',
    ownerNickname: 'john_doe',
    ownerPassword: 'securepassword123',
    description: 'A group of fitness enthusiasts who love to stay active.',
    photo: 'https://example.com/group_photo.jpg',
    // groupTags: ['fitness', 'health', 'wellness'],
    goalRep: 1000,
    discordURL: 'https://discord.gg/example',
    invitationURL: 'https://example.com/invite',
    likeCount: 50,
    memberCount: 10,
  },
];

export const MEMBER = [
  {
    id: 'b9cf8fed-bb5b-438e-b839-0c5452cf8937',
    nickName: 'john_doe',
    password: 'password123',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: 'e2981db9-2e9a-4a09-8a02-f53a89b66b9e',
    nickName: 'jane_smith',
    password: 'password456',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: '39e334d1-7dba-4795-857d-bde9e4bab7bf',
    nickName: 'member9',
    password: 'password9',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: '88ba0593-79f7-47e4-98c8-8ecc69cb76e0',
    nickName: 'member10',
    password: 'password10',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: '0f4e6c46-9493-4673-9521-b692ebea9fa1',
    nickName: 'member11',
    password: 'password11',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: '09c2a8fc-9fe0-4f60-86db-7859b8b064ae',
    nickName: 'member12',
    password: 'password12',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: 'f9430c9a-385d-48ab-b174-0196adc41b9c',
    nickName: 'member13',
    password: 'password13',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: '0ba1eb34-93e3-41c8-9a75-2158c2d5d0bd',
    nickName: 'member14',
    password: 'password14',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: 'ebfd486a-6e49-4bf2-8fdc-8f02dff3ed45',
    nickName: 'member15',
    password: 'password15',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    id: 'a952da17-77e3-4dfa-857d-d71e5367382f',
    nickName: 'member16',
    password: 'password16',
    createdAt: '2025-03-12T08:52:25.778Z',
    updatedAt: '2025-03-12T08:52:25.778Z',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
];

export const RECORD = [
  {
    sports: 'RUNNING',
    description: 'Morning jog around the park',
    time: 630, // 10분 30초 => 630초
    distance: 5000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: 'a952da17-77e3-4dfa-857d-d71e5367382f',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'CYCLING',
    description: 'Cycling on the city roads',
    time: 1810, // 30분 10초 => 1810초
    distance: 15000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: 'b9cf8fed-bb5b-438e-b839-0c5452cf8937',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'SWIMMING',
    description: 'Swimming in the community pool',
    time: 945, // 15분 45초 => 945초
    distance: 1000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: 'e2981db9-2e9a-4a09-8a02-f53a89b66b9e',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'RUNNING',
    description: 'Running a 10K race',
    time: 2730, // 45분 30초 => 2730초
    distance: 10000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: '39e334d1-7dba-4795-857d-bde9e4bab7bf',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'CYCLING',
    description: 'Cycling in the countryside',
    time: 3910, // 1시간 5분 10초 => 3910초
    distance: 25000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: '88ba0593-79f7-47e4-98c8-8ecc69cb76e0',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'SWIMMING',
    description: 'Open water swimming',
    time: 1215, // 20분 15초 => 1215초
    distance: 2000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: '0f4e6c46-9493-4673-9521-b692ebea9fa1',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'RUNNING',
    description: 'Evening run on the beach',
    time: 725, // 12분 5초 => 725초
    distance: 3000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: '09c2a8fc-9fe0-4f60-86db-7859b8b064ae',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'CYCLING',
    description: 'Mountain biking on rough trails',
    time: 3035, // 50분 35초 => 3035초
    distance: 12000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: 'f9430c9a-385d-48ab-b174-0196adc41b9c',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'SWIMMING',
    description: 'Freestyle lap training',
    time: 1105, // 18분 25초 => 1105초
    distance: 1500,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: '0ba1eb34-93e3-41c8-9a75-2158c2d5d0bd',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
  {
    sports: 'RUNNING',
    description: 'Track and field sprint training',
    time: 490, // 8분 10초 => 490초
    distance: 1000,
    photo: ['/images/records/john_doe_running.jpg'],
    memberId: 'ebfd486a-6e49-4bf2-8fdc-8f02dff3ed45',
    groupId: '0cefeff8-b2ff-4d57-a19d-e7c02e394688',
  },
];
