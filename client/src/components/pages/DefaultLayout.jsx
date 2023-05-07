import React from 'react'
import AppLayout from '../layout/AppLayout';
import AppContent from '../views/AppContent';
import ChatProvider from '../../context/ChatProvider';
import  ModalProvider  from '../../context/ModalProvider';

export default function DefaultLayout() {
    return (
        <ChatProvider>
            <ModalProvider>
                <AppLayout>
                    <AppContent />
                </AppLayout>
            </ModalProvider>
        </ChatProvider>
    )
}
