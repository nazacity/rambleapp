import React from 'react';
export const blog_categories = [
  {
    _id: '1',
    title_th: 'การฝึก',
    title_en: 'Training',
    image:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    _id: '2',
    title_th: 'สุขภาพ',
    title_en: 'Healthy',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    _id: '3',
    title_th: 'แฟชั่น',
    title_en: 'Trend',
    image:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    _id: '4',
    title_th: 'ท่องเที่ยว',
    title_en: 'Travel',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
];

export const blogs = [
  {
    _id: '1',
    title: 'การฝึก',
    blog_picture_url:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
    link: 'https://ramble-club.com',
    likesCount: 15,
    description: 'lorem art work needs',
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'สุขภาพ',
    blog_picture_url:
      'https://images.unsplash.com/photo-1526676317768-d9b14f15615a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    link: 'https://ramble-club.com',
    likesCount: 12,
    description:
      'lorem art work needs to be done lorem art work needs to be done',
    createdAt: new Date(),
  },
  {
    _id: '3',
    title: 'แฟชั่น',
    blog_picture_url:
      'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
    link: 'https://ramble-club.com',
    likesCount: 8,
    description: 'lorem art work needs to be done',
    createdAt: new Date(),
  },
  {
    _id: '4',
    title: 'ท่องเที่ยว',
    blog_picture_url:
      'https://images.unsplash.com/photo-1600712662084-e54770a9668e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: 'https://ramble-club.com',
    likesCount: 32,
    description:
      'lorem art work needs to be done lorem art work needs to be done',
    createdAt: new Date(),
  },
  {
    _id: '5',
    title: 'การฝึก',
    blog_picture_url:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
    link: 'https://ramble-club.com',
    likesCount: 15,
    description: 'lorem art work needs',
    createdAt: new Date(),
  },
  {
    _id: '6',
    title: 'สุขภาพ',
    blog_picture_url:
      'https://images.unsplash.com/photo-1526676317768-d9b14f15615a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    link: 'https://ramble-club.com',
    likesCount: 12,
    description:
      'lorem art work needs to be done lorem art work needs to be done',
    createdAt: new Date(),
  },
  {
    _id: '7',
    title: 'แฟชั่น',
    blog_picture_url:
      'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
    link: 'https://ramble-club.com',
    likesCount: 8,
    description: 'lorem art work needs to be done',
    createdAt: new Date(),
  },
  {
    _id: '8',
    title: 'ท่องเที่ยว',
    blog_picture_url:
      'https://images.unsplash.com/photo-1600712662084-e54770a9668e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: 'https://ramble-club.com',
    likesCount: 32,
    description:
      'lorem art work needs to be done lorem art work needs to be done',
    createdAt: new Date(),
  },
];

export const comments = [
  {
    _id: '1',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
    createdAt: new Date('2021-01-25'),
  },
  {
    _id: '2',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    createdAt: new Date('2021-02-19'),
  },
  {
    _id: '3',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
    createdAt: new Date('2021-01-31'),
  },
  {
    _id: '4',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
    createdAt: new Date('2021-02-20'),
  },
  {
    _id: '5',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
    createdAt: new Date('2021-02-19'),
  },
];
