import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme';
import { Theme } from './types';
import { Posts } from './components/Posts';
import { Nav } from './components/Nav';
import { Post } from './components/Post';

export const App = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => setTheme((theme) => theme === 'light' ? 'dark' : 'light');

    return (
        <Router>
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className='container'>
                        <Nav toggleTheme={toggleTheme} />
                        <Routes>
                            <Route path='/' element={<Posts type='top' />} />
                            <Route path='/new' element={<h1>New Page</h1>} />
                            <Route path='/post' element={<Post />} />
                            <Route path='/user' element={<h1>User Element</h1>} />
                            <Route path='*' element={<h1>404 page not found!!</h1>} />
                        </Routes>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}