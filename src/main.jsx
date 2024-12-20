import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import BubbleSortApp from './AlgorithmsVisualizer/BubbleSort.jsx';
import SelectionSortApp from './AlgorithmsVisualizer/SelectionSort.jsx';
import InsertionSortApp from './AlgorithmsVisualizer/InsertionSort.jsx';
import MergeSortApp from './AlgorithmsVisualizer/MergeSort.jsx';
import QuickSortApp from './AlgorithmsVisualizer/Quicksort.jsx';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "sort/bubble-sort",
    element: <BubbleSortApp />
  },
  {
    path: 'sort/selection-sort',
    element: <SelectionSortApp />
  },
  {
    path: 'sort/insertion-sort',
    element: <InsertionSortApp />
  },
  {
    path: 'sort/merge-sort',
    element: <MergeSortApp />
  },
  {
    path: 'sort/quick-sort',
    element: <QuickSortApp />
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>,
)
