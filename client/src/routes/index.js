import { lazy } from "react"

const Chats = lazy(()=>import('../components/pages/Chats'));
const Profile = lazy(()=>import('../components/pages/Profile'));

const routes = [
    {path: '/', name: 'Chat', element: Chats },
    {path: '/t/:userId', name: 'Chat', element: Chats },
    {path: '/p/:userId', name: 'Profile', element: Profile },
];

export default routes