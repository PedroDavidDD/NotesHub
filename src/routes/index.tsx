import React from 'react'
import { Layout } from '../layouts/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import NotesHub from '../NotesHub';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <NotesHub />,
      },
      {
        path: 'schedule',
        element: <NotesHub />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}