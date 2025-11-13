import { celebrityAvatars } from './avatarGenerator';

export const defaultPosts = [
  {
    _id: 'default-1',
    user: {
      _id: 'user-virat',
      username: 'virat.kohli',
      fullName: 'Virat Kohli',
      avatar: celebrityAvatars['Virat Kohli']
    },
    content: "What a match! 🏏 The energy from the crowd was absolutely electric. Thank you for all the love and support. We play for moments like these! 💪🇮🇳 #TeamIndia #Cricket",
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop',
    likes: ['user-1', 'user-2', 'user-3'],
    comments: [],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-2',
    user: {
      _id: 'user-srk',
      username: 'iamsrk',
      fullName: 'Shah Rukh Khan',
      avatar: celebrityAvatars['Shah Rukh Khan']
    },
    content: "Life is a celebration of being alive. Spread love, spread kindness, and keep smiling! 😊✨ Remember, success is not just about what you accomplish in your life, but what you inspire others to do. #MondayMotivation #SpreadLove",
    image: '',
    likes: ['user-1', 'user-4', 'user-5'],
    comments: [],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-3',
    user: {
      _id: 'user-rohit',
      username: 'rohitsharma45',
      fullName: 'Rohit Sharma',
      avatar: celebrityAvatars['Rohit Sharma']
    },
    content: "Training session done! 💪 The grind never stops. Every drop of sweat today is a step towards victory tomorrow. Let's keep pushing! 🏏🔥 #NeverGiveUp #CricketLife",
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop',
    likes: ['user-2', 'user-3'],
    comments: [],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-4',
    user: {
      _id: 'user-deepika',
      username: 'deepikapadukone',
      fullName: 'Deepika Padukone',
      avatar: celebrityAvatars['Deepika Padukone']
    },
    content: "Mental health matters! 💚 Taking time for self-care isn't selfish, it's essential. Remember to check in with yourself and your loved ones. You are not alone. Seeking help is a sign of strength. #MentalHealthAwareness #SelfCare",
    image: '',
    likes: ['user-1', 'user-2', 'user-4', 'user-5'],
    comments: [],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-5',
    user: {
      _id: 'user-ranveer',
      username: 'ranveersingh',
      fullName: 'Ranveer Singh',
      avatar: celebrityAvatars['Ranveer Singh']
    },
    content: "ENERGY! ⚡️🔥 When you love what you do, every day is a celebration! Living life king size with gratitude and passion. Stay wild, stay free! 🎉✨ #PositiveVibesOnly #LiveYourBestLife",
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop',
    likes: ['user-3', 'user-4'],
    comments: [],
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-6',
    user: {
      _id: 'user-dhoni',
      username: 'mahi7781',
      fullName: 'MS Dhoni',
      avatar: celebrityAvatars['MS Dhoni']
    },
    content: "Back to the basics. 🏏 Sometimes the simplest approach is the most effective. Stay calm, trust the process, and let your actions speak. #CricketWisdom #StayGrounded",
    image: '',
    likes: ['user-1', 'user-2', 'user-3', 'user-5'],
    comments: [],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-7',
    user: {
      _id: 'user-alia',
      username: 'aliaabhatt',
      fullName: 'Alia Bhatt',
      avatar: celebrityAvatars['Alia Bhatt']
    },
    content: "Grateful for every sunrise and the opportunities each day brings. 🌅 Working on new projects that challenge and inspire me. Can't wait to share what's coming! 🎬💫 #Grateful #ExcitingTimesAhead",
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
    likes: ['user-2', 'user-4', 'user-5'],
    comments: [],
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-8',
    user: {
      _id: 'user-sachin',
      username: 'sachin_rt',
      fullName: 'Sachin Tendulkar',
      avatar: celebrityAvatars['Sachin Tendulkar']
    },
    content: "Cricket taught me that every match is a new opportunity. In life, too, every day is a fresh start. Chase your dreams with the same passion you had on day one! 🏏💙 #CricketLessons #ChaseYourDreams",
    image: '',
    likes: ['user-1', 'user-3', 'user-4'],
    comments: [],
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-9',
    user: {
      _id: 'user-priyanka',
      username: 'priyankachopra',
      fullName: 'Priyanka Chopra',
      avatar: celebrityAvatars['Priyanka Chopra']
    },
    content: "Representation matters. Breaking barriers and creating opportunities for the next generation. Dream big, work hard, and never let anyone tell you what you can't achieve! 🌟💪 #Empowerment #DreamBig",
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
    likes: ['user-2', 'user-3', 'user-5'],
    comments: [],
    createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'default-10',
    user: {
      _id: 'user-amitabh',
      username: 'amitabhbachchan',
      fullName: 'Amitabh Bachchan',
      avatar: celebrityAvatars['Amitabh Bachchan']
    },
    content: "T 4892 - With each passing day, the gratitude for the love and affection of well wishers grows immensely. Your blessings are my strength. 🙏✨ Thank you for everything. #Gratitude #Blessed",
    image: '',
    likes: ['user-1', 'user-2', 'user-4'],
    comments: [],
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
  }
];

export default defaultPosts;
